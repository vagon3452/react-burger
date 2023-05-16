import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./modal-data-api.module.css";
import { useLocation, useMatch, useParams } from "react-router";
import { useSelector } from "../../services/store";
import { getOrderRequest } from "../../services/burger-api";
import { useEffect, useMemo, useRef, useState } from "react";
import { ISocketOrders } from "../../services/actions/feed";
import { THttpOrder } from "../../services/types/order";

export const ModalFromDataApi = () => {
  const { publicFeed } = useSelector((store) => ({
    publicFeed: store.feed.publicFeed,
  }));
  const { items } = useSelector((store) => ({ items: store.cart.items }));
  const { privateFeed } = useSelector((state) => ({
    privateFeed: state.profileFeed.privateFeed,
  }));

  const location = useLocation().pathname;

  const isFeedPathname = /^\/feed\/\d+$/.test(location);
  const isProfileOrdersPathname = /^\/profile\/orders\/\d+$/.test(location);

  const state = isFeedPathname
    ? publicFeed
    : isProfileOrdersPathname
    ? privateFeed
    : false;

  const { id } = useParams();
  const totalPriceRef = useRef(0);
  type TState = THttpOrder | ISocketOrders | undefined;
  const [data, setData] = useState<TState>(() => {
    if (state) {
      return state.orders.find((el) => el.number.toString() === id);
    }
  });

  useEffect(() => {
    if (data || !id) {
      return;
    }
    const getData = async () => {
      try {
        const result = await getOrderRequest(id);
        const orderResponse = result.orders.find(
          (el) => el.number.toString() === id
        );
        setData(orderResponse);
      } catch (error) {
        console.error(`Failed to fetching order data: ${error}`);
      }
    };

    getData();
  }, []);

  const ingredientMapper = useMemo(
    () => (ingredientsIds: string[]) => {
      const count: Map<string, number> = new Map();
      const images: Map<string, string> = new Map();
      const price: Map<string, number> = new Map();
      const ingredientName: Map<string, string> = new Map();

      totalPriceRef.current = 0;

      ingredientsIds.forEach((id) => {
        const ingredient = items.find((item) => item._id === id);

        if (ingredient) {
          count.set(ingredient._id, (count.get(ingredient._id) || 0) + 1);
          images.set(ingredient._id, ingredient.image);
          price.set(ingredient._id, ingredient.price);
          ingredientName.set(ingredient._id, ingredient.name);
          totalPriceRef.current += ingredient.price;
        }
      });

      return { count, images, price, ingredientName };
    },
    []
  );

  if (!data) {
    return null;
  }

  const { number, name, ingredients, createdAt } = data;

  const { count, images, price, ingredientName } =
    ingredientMapper(ingredients);

  return (
    <div className={styles.modal}>
      <div className={styles.number}>
        <p className="text text_type_digits-default">#{number}</p>
      </div>
      <div className={styles.info}>
        <div className={styles.title}>{name}</div>
        <div className={styles.status}>status</div>
      </div>
      <div className={styles.ingregients}>
        <div className={styles.title}>Состав:</div>
        <div className={styles.scroll_area}>
          {Array.from(count).map(([id, amount]) => (
            <div className={styles.item} key={id}>
              <picture className={styles.preview}>
                <source srcSet={images.get(id)} />
                <img src={images.get(id)} alt={"alt"} width="112" height="56" />
              </picture>
              <div className={styles.text}>{ingredientName.get(id)}</div>
              <div className={styles.price}>
                {amount} X {price.get(id)} <CurrencyIcon type="primary" />
              </div>
            </div>
          ))}
        </div>
        <div className={styles.timestamp}>
          <FormattedDate date={new Date(createdAt)} />
          <div>
            {totalPriceRef.current} <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </div>
  );
};
