import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./modal-data-api.module.css";
import { useLocation, useParams } from "react-router";
import { useSelector } from "../../../services/store";
import { getOrderRequest } from "../../../services/burger-api";
import { useEffect, useMemo, useRef, useState } from "react";
import { ISocketOrders } from "../../../services/feed/types";
import { THttpOrder } from "../../../services/order/types";
import { cart_getItems } from "../../../services/ingredients/selectors";
import { feed_publicFeed } from "../../../services/feed/selectors";
import { profile_privateFeed } from "../../../services/profile-orders/selectors";

export const OrderIngredients = () => {
  const publicFeed = useSelector(feed_publicFeed);
  const items = useSelector(cart_getItems);
  const privateFeed = useSelector(profile_privateFeed);

  const location = useLocation();

  const isFeedPathname = /^\/feed\/\d+$/.test(location.pathname);
  const isProfileOrdersPathname = /^\/profile\/orders\/\d+$/.test(
    location.pathname
  );

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

  const { number, name, ingredients, createdAt, status } = data;

  const { count, images, price, ingredientName } =
    ingredientMapper(ingredients);

  const currentStatus = {
    created: "Создан",
    pending: "Готовится",
    done: "Выполнен",
  }[status];

  const shouldAddMarginTop = location.state === null;
  const classNameModal = `${styles.modal} ${
    shouldAddMarginTop ? styles.with_margin : ""
  }`;
  return (
    <div className={classNameModal}>
      <div className={styles.number}>
        <p className="text text_type_digits-default">#{number}</p>
      </div>
      <div className={styles.info}>
        <div className={styles.title}>{name}</div>
        <div
          className={`${styles.status} ${
            status === "done" ? styles.status_done : ""
          }
          `}
        >
          {currentStatus}
        </div>
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
          <div className={styles.total}>
            {totalPriceRef.current} <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </div>
  );
};