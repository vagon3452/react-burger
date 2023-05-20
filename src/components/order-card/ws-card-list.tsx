import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "../../services/store";
import { memo } from "react";
import { ISocketOrders } from "../../services/actions/feed";
import styles from "./card-list.module.css";
import { IngredientIcon } from "./images-card/images";
import { useLocation } from "react-router-dom";

type TCardListProps = {
  order: ISocketOrders;
};

export const CardList = memo(({ order }: TCardListProps): JSX.Element => {
  const location = useLocation();

  const isProfileOrdersPathname = /^\/profile\/orders$/.test(location.pathname);

  const { items } = useSelector((store) => ({ items: store.cart.items }));

  const getIngredientsFromStore = (arrayId: string[]) => {
    return arrayId.map((id) =>
      items.find((ingredient) => ingredient._id === id)
    );
  };

  const { number, name, ingredients, createdAt, status } = order;
  const currentStatus = {
    created: "Создан",
    pending: "Готовится",
    done: "Выполнен",
  }[status];

  const state = getIngredientsFromStore(ingredients);

  const price = state.reduce((acc, item) => {
    return acc + (item?.price ?? 0);
  }, 0);
  const stylesStatus = `${styles.status} ${
    status === "done" ? styles.status_done : ""
  }`;
  const firstSixIngredients = state.slice(0, 6);

  return (
    <section className={styles.card}>
      <div className={styles.order_id}>
        <span className="text text_type_digits-default">#{number}</span>
        <span className="text text_type_main-default text_color_inactive">
          <FormattedDate date={new Date(createdAt)} />
        </span>
      </div>
      <p className={`text text_type_main-medium ${styles.text}`}>{name}</p>
      {isProfileOrdersPathname && (
        <span className={stylesStatus}>{currentStatus}</span>
      )}
      <div className={styles.ingred_price}>
        <div className={styles.ingredients}>
          {firstSixIngredients.map(
            (el, idx) =>
              el?.image && (
                <IngredientIcon
                  key={idx}
                  src={el.image}
                  alt={el.name}
                  srcSet={el.image}
                  overflow={idx <= 4 ? 0 : state.length - idx}
                  extraClass={styles.items_picture}
                />
              )
          )}
        </div>
        <div className={styles.price}>
          <span className="text text_type_digits-default">{price}</span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </section>
  );
});
