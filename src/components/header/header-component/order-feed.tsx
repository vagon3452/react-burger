import React from "react";
import { NavLink, useMatch } from "react-router-dom";
import styles from "../app-header.module.css";
import { ListIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "../../../services/store";
import { feed_error, feed_status } from "../../../services/feed/selectors";

function Order(): JSX.Element {
  const status = useSelector(feed_status);
  const error = useSelector(feed_error);

  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  console.log(status);
  const color = { color: getRandomColor() };

  const linkStyle = {
    textDecoration: "none",
    color: "inherit",
    fontSize: "inherit",
    fontWeight: "inherit",
  };
  const matchPattern = useMatch("/feed");
  return (
    <>
      <NavLink to="/feed" style={linkStyle}>
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
      <span style={color}>{status}</span>
    </>
  );
}

export default Order;
