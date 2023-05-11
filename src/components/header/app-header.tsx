import React from "react";
import styles from "./app-header.module.css";
import Person from "./header-component/person";
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import Create from "./header-component/create";
import Order from "./header-component/order-feed";

export const AppHeader = (): JSX.Element => {


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
