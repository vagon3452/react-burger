import React, { useEffect, useRef } from "react";
import styles from "./orders.module.css";
import { useDispatch, useSelector } from "../../services/store";
import { CardList } from "../../components/order-card/ws-card-list";
import {
  ISocketOrders,
  profileFeedConnect,
  profileFeedWsDisconnect,
} from "../../services/actions/profile-feed";
import { Link, useLocation } from "react-router-dom";

export function OrdersPage(): JSX.Element {
  const location = useLocation();
  const linkStyle = {
    textDecoration: "none",
    color: "inherit",
    fontSize: "inherit",
    fontWeight: "inherit",
  };

  const url = `wss://norma.nomoreparties.space/orders`;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(profileFeedConnect(url));

    return () => {
      dispatch(profileFeedWsDisconnect());
    };
  }, []);

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
  return (
    <section className={styles.content}>
      <div className={styles.list}>
        {privateFeed &&
          privateFeed.orders?.map((order) =>
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
