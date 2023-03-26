import React from "react";
import styles from "./app-header.module.css";
import Person from "./header-component/person";
import {
  BurgerIcon,
  ProfileIcon,
  ListIcon,
  Logo,
} from "@ya.praktikum/react-developer-burger-ui-components";

export default class AppHeader extends React.Component {
  
  
 
  render() {
    return (
      <header className={styles.navbar}>
        <div className={styles.content}>
          <div className={styles.dblbl}>
            <div className={styles.nav1}>
              <ListIcon type="primary" />
              <p className="text text_type_main-default text_color_inactive">
                Лента заказов
              </p>
            </div>
            <div className={styles.nav2}>
              <BurgerIcon type="primary" />
              <div className="text text_type_main-default">Конструктор</div>
            </div>
          </div>
          <div className={styles.logo}>
            <Logo />
          </div>
          <div className={styles.account}>
            <ProfileIcon type="primary" />
            <div className="text text_type_main-default text_color_inactive">
              <Person />
            </div>
          </div>
        </div>
      </header>
    );
  }
}
