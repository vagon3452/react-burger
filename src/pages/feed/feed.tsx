import React, { memo, useEffect } from "react";
import clsx from "clsx";
import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./feed.module.css";
import { useDispatch, useSelector } from "../../services/store";

import {
  connect,
  disconnect,
  ISocketOrders,
} from "../../services/actions/feed";
import { Link, useLocation } from "react-router-dom";

const linkStyle = {
  textDecoration: "none",
  color: "inherit",
  fontSize: "inherit",
  fontWeight: "inherit",
};

export function FeedPage(): JSX.Element {
  const location = useLocation();

  const dispatch = useDispatch();

  useEffect(() => {
    const url = "wss://norma.nomoreparties.space/orders/all";
    dispatch(connect(url));
    return () => {
      dispatch(disconnect());
    };
  }, []);
  const { publicFeed } = useSelector((state) => ({
    publicFeed: state.feed.publicFeed,
  }));

  const checkOrders = (order: ISocketOrders): boolean => {
    return (
      order !== undefined &&
      order !== null &&
      Object.keys(order).length > 0 &&
      order.ingredients !== undefined &&
      order.ingredients !== null &&
      order.ingredients.length > 0
    );
  };

  return (
    <section className={styles.content}>
      <div className={styles.list}>
        {publicFeed &&
          publicFeed.orders.map((order) =>
            checkOrders(order) ? (
              <Link
                to={`/feed/${order.number}`}
                style={linkStyle}
                key={order.number}
                state={{ background: location }}
              >
                <CardList key={order.number} order={order} />
              </Link>
            ) : (
              <h1>ошибка</h1>
            )
          )}
      </div>
      <div className={styles.stats}>
        <div className={styles.orders_board}>
          <div className={styles.done}>
            <p>готовы:</p>
            <ul className={styles.done_numbers}>
              {publicFeed?.orders.map((list) => (
                <li className="text text_type_digits-small" key={list.number}>
                  {list.status === "done" && list.number}
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.done}>
            <p>в работе:</p>
            <ul className={styles.done_numbers}>
              {publicFeed?.orders.map((list) => (
                <li className="text text_type_digits-small">
                  {list.status !== "done" && list.number}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className={styles.complited}>
          <p className={styles.text}>Выполнено за все время:</p>
          <p className="text text_type_digits-large">{publicFeed?.total}</p>
        </div>
        <div className={styles.complited}>
          <p className={styles.text}>Выполнено за сегодня:</p>
          <p className="text text_type_digits-large">{publicFeed?.totalToday}</p>
        </div>
      </div>
    </section>
  );
}
type TCardListProps = {
  order: ISocketOrders;
};

export const CardList = memo(({ order }: TCardListProps): JSX.Element => {
  const { items } = useSelector((store) => ({ items: store.cart.items }));

  const dataForApiArray = (arrayId: string[]) => {
    return arrayId.map((id) => items.find((item) => item._id === id));
  };

  const { number, name, ingredients, createdAt } = order;

  const state = dataForApiArray(ingredients);

  const price = state.reduce((acc, item) => {
    return acc + (item?.price ?? 0);
  }, 0);

  return (
    <>
      <div className={styles.card}>
        <div className={styles.order_id}>
          <p className="text text_type_digits-default">#{number}</p>
          <p className="text text_type_main-default text_color_inactive">
          <FormattedDate date={new Date(createdAt)} />
          </p>
        </div>
        <p className="text text_type_main-medium">{name}</p>
        <div className={styles.ingred_price}>
          <div className={styles.ingredients}>
            {state.map(
              (el, idx, arr) =>
                el?.image && (
                  <IngredientIcon
                    key={idx}
                    src={el.image}
                    srcSet={el.image}
                    overflow={arr.length <= 6 ? 0 : arr.length - 6}
                  />
                )
            )}
          </div>
          <div className={styles.price}>
            <p className="text text_type_digits-default">{price}</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </>
  );
});

interface IngredientIconProps {
  srcSet: string;
  src: string;
  alt?: string;
  overflow?: number;
  extraClass?: string;
}

// export const IngredientIcon = ({
//   srcSet,
//   src,
//   alt = "ingredient",
//   overflow = 0,
//   extraClass,
// }: IngredientIconProps) => {
//   return (
//     <div className={clsx(styles.container, extraClass)}>
//       <div>
//         <picture className={styles.picture}>
//           <source srcSet={srcSet} />
//           <img src={src} alt={alt} width="112" height="56" />
//         </picture>
//         {overflow > 0 && (
//           <div
//             className={clsx(styles.container, styles.picture, styles.overflow)}
//           >
//             <div className={clsx(styles.picture, "text text_type_main-small")}>
//               +{overflow}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

export const IngredientIcon: React.FC<IngredientIconProps> = ({
  srcSet,
  src,
  alt = "ingredient",
  overflow = 0,
  extraClass,
}) => {
  const containerClasses = `${styles.container} ${extraClass}`;
  const imgContainerClasses = `${styles.container} ${styles.picture}`;
  console.log(overflow);
  const pictureElement = (
    <picture className={styles.picture}>
      <source srcSet={srcSet} />
      <img src={src} alt={alt} width="112" height="56" />
    </picture>
  );
  const overflowElement =
    overflow > 0 ? (
      <div className={`${imgContainerClasses} ${styles.overflow}`}>
        <div className={`${styles.picture} text text_type_main-small`}>
          +{overflow}
        </div>
      </div>
    ) : null;

  return (
    <div className={containerClasses}>
      <div>
        {pictureElement}
        {overflowElement}
      </div>
    </div>
  );
};
