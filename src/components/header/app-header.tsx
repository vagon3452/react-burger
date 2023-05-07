import React, { useEffect } from "react";
import styles from "./app-header.module.css";
import Person from "./header-component/person";
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import Create from "./header-component/create";
import Order from "./header-component/order-feed";
import { ACCESS_TOKEN_KEY } from "../../services/constants";
import { connect as connect123 } from "../../services/actions/web-socked";
import { useDispatch, useSelector } from "../../services/store";

export const AppHeader = (): JSX.Element => {
  const dispatch = useDispatch();
  const url = "wss://norma.nomoreparties.space/orders/all"
  dispatch<any>(connect123(url))
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
  // const test = () => {
  //   const url = "wss://norma.nomoreparties.space/orders/all";
  //   dispatch(connect123(url))

  //   console.log("test-connect");
  // };
  // const test2 = () => {
  //   console.log(table);
  // };
  // const table = useSelector((store) => store.feed.table);
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
