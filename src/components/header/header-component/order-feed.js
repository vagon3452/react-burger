import React from "react";
import { NavLink, useMatch, useResolvedPath } from "react-router-dom";
import styles from "../app-header.module.css";
import { ListIcon } from "@ya.praktikum/react-developer-burger-ui-components";

function Order() {
  const linkStyle = {
    textDecoration: "none",
    color: "inherit",
    fontSize: "inherit",
    fontWeight: "inherit",
  };
  const matchPattern = useMatch("/order");
  return (
    <NavLink to="/order" style={linkStyle}>
      <div className={styles.nav1}>
        <ListIcon type={matchPattern ? "primary" : "secondary"} />
        <p
          className={
            matchPattern
              ? "text text_type_main-default"
              : "text text_type_main-default text_color_inactive"
          }
        >
          Лента заказов
        </p>
      </div>
    </NavLink>
  );
}

export default Order;
