import React, { memo, useEffect } from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./feed.module.css";
import { useDispatch, useSelector } from "../../services/store";

import {
  connect,
  disconnect,
  ISocketOrders,
} from "../../services/actions/feed";
import {
  Link,
  useLocation,
  useNavigationType,
  useParams,
} from "react-router-dom";

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
  const { table } = useSelector((state) => ({
    table: state.feed.table,
  }));

 
  return (
    <section className={styles.content}>
      <div className={styles.list}>
        {table &&
          table.orders.map((order) => (
            <Link
              to={`/feed/${order.number}`}
              style={linkStyle}
              key={order.number}
              state={{ background: location }}
            >
              <CardList order={order}/>
            </Link>
          ))}
      </div>
      <div className={styles.stats}>
        <div className={styles.orders_board}>
          <div className={styles.done}>
            <p>готовы:</p>
            <ul className={styles.done_numbers}>
              {table?.orders.map((list) => (
                <li className="text text_type_digits-small">
                  {list.status === "done" && list.number}
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.done}>
            <p>в работе:</p>
            <ul className={styles.done_numbers}>
              {table?.orders.map((list) => (
                <li className="text text_type_digits-small">
                  {list.status !== "done" && list.number}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className={styles.complited}>
          <p className={styles.text}>Выполнено за все время:</p>
          <p className="text text_type_digits-large">{table?.total}</p>
        </div>
        <div className={styles.complited}>
          <p className={styles.text}>Выполнено за сегодня:</p>
          <p className="text text_type_digits-large">{table?.totalToday}</p>
        </div>
      </div>
    </section>
  );
}
type TCardListProps = {
  order: ISocketOrders;
};

export const CardList = memo(({order}:TCardListProps): JSX.Element => {
  const navigationType = useNavigationType();

  const { table } = useSelector((store) => ({ table: store.feed.table }));
  const { items } = useSelector((store) => ({ items: store.cart.items }));
  const { id } = useParams();
  const data = table?.orders.find((el) => el.number.toString() === id);
  console.log(data, table, id);
  const dataForApiArray = (arrayId: string[]) => {
    return arrayId.map((id) => items.find((item) => item._id === id));
  };

  const { number, name, ingredients, createdAt } = order

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
            {createdAt}
          </p>
        </div>
        <p className="text text_type_main-medium">{name}</p>
        <div className={styles.ingred_price}>
          <div className={styles.ingredients}>
            {/* <div className={styles.preview}>
            <div className={styles.illustration}> */}
            {state.length &&
              state.map(
                (img) =>
                  img?.image && (
                    <img src={img.image} className={styles.preview} />
                  )
              )}
            {/* </div>
          </div> */}
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

// const url = "GET https://norma.nomoreparties.space/api/orders/{номер заказа}";
