import React, { useEffect } from "react";
import styles from "./app-header.module.css";
import Person from "./header-component/person";
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import Create from "./header-component/create";
import Order from "./header-component/order-feed";
// import { useSocket } from "../../services/useSocket";
import { ACCESS_TOKEN_KEY } from "../../services/constants";

export const AppHeader = (): JSX.Element => {
  useEffect(() => {
    // const token = localStorage.getItem(ACCESS_TOKEN_KEY)?.split(" ")[1];
    // const url = "wss://norma.nomoreparties.space/orders/all";
    // const ws = new WebSocket(`${url}?token=${token}`);
    // ws.onopen = (event) => {
    //   console.log(event);
    // };
    // ws.onmessage = ({ data }: { data: string }) => {
    //   console.log(data)
    //   const message = JSON.parse(data);
    //   console.log(message);
    // };
  }, []);

  return (
    <header className={styles.navbar}>
      <div className={styles.content}>
        <div className={styles.dblbl}>
          <Create />
          <Order />
        </div>
        <div className={styles.logo}>
          <Logo />
        </div>
        <div className={styles.account}>
          <Person />
        </div>
      </div>
    </header>
  );
};
