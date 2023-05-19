import React, { useEffect } from "react";

import styles from "./feed.module.css";
import { useDispatch, useSelector } from "../../services/store";

import {
  connect,
  disconnect,
  ISocketOrders,
} from "../../services/actions/feed";
import { Link, useLocation } from "react-router-dom";
import { CardList } from "../../components/order-card/ws-card-list";

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

  if (
    publicFeed === null ||
    publicFeed === undefined ||
    publicFeed.orders.length === 0
  ) {
    return <div>заказов нету</div>;
  }

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
    <div className={styles.content}>
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
      <div className={styles.status}>
        <div className={styles.orders_board}>
          <div className={styles.done}>
            <p>готовы:</p>
            <ul className={styles.done_numbers}>
              {publicFeed.orders.map((list) => (
                <li className="text text_type_digits-small" key={list.number}>
                  {list.status === "done" && list.number}
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.done}>
            <p>в работе:</p>
            <ul className={styles.done_numbers}>
              {publicFeed.orders.map((list) => (
                <li className="text text_type_digits-small" key={list.number}>
                  {list.status !== "done" && list.number}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className={styles.complited}>
          <p className={styles.text}>Выполнено за все время:</p>
          <p className="text text_type_digits-large">{publicFeed.total}</p>
        </div>
        <div className={styles.complited}>
          <p className={styles.text}>Выполнено за сегодня:</p>
          <p className="text text_type_digits-large">{publicFeed.totalToday}</p>
        </div>
      </div>
    </div>
  );
}
