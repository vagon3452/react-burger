import React, { useEffect } from "react";
import styles from "./orders.module.css";
import { useDispatch, useSelector } from "../../services/store";
import { CardList } from "../../components/order-card/ws-card-list";
import {
  profileFeedConnect,
  profileFeedWsDisconnect,
} from "../../services/profile-orders/actions";
import { Link, useLocation } from "react-router-dom";
import { ACCESS_TOKEN_KEY } from "../../services/auth/constants";
import { ISocketOrders } from "../../services/feed/types";

export function OrdersPage(): JSX.Element {
  const location = useLocation();
  const linkStyle = {
    textDecoration: "none",
    color: "inherit",
    fontSize: "inherit",
    fontWeight: "inherit",
  };
  const token = localStorage.getItem(ACCESS_TOKEN_KEY)?.split(" ")[1];
  const url = `wss://norma.nomoreparties.space/orders`;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(profileFeedConnect(`${url}?token=${token}`));

    return () => {
      dispatch(profileFeedWsDisconnect());
    };
  }, [token]);

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
  const { privateFeed } = useSelector((state) => ({
    privateFeed: state.profileFeed.privateFeed,
  }));

  if (!privateFeed) {
    return (
      <section className={styles.content}>
        <div className={styles.no_order}>
          <h1>Заказов пока нету</h1>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.content}>
      <div className={styles.list}>
        {privateFeed &&
          [...privateFeed.orders].reverse().map((order) =>
            checkOrders(order) ? (
              <Link
                to={`/profile/orders/${order.number}`}
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
    </section>
  );
}
