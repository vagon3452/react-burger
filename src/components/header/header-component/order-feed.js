import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "../app-header.module.css";
import { ListIcon } from "@ya.praktikum/react-developer-burger-ui-components";

function Order() {
  return (
    <NavLink to="/order">
      <div className={styles.nav1}>
        <ListIcon type="primary" />
        <div
          className="text text_type_main-default text_color_inactive"
        >
          Лента заказов
        </div>
      </div>
    </NavLink>
  );
}

export default Order;
