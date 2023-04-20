import React from "react";
import { NavLink, useMatch } from "react-router-dom";
import styles from "../app-header.module.css";
import { BurgerIcon } from "@ya.praktikum/react-developer-burger-ui-components";

function Create(): JSX.Element {
  const linkStyle = {
    textDecoration: "none",
    color: "inherit",
    fontSize: "inherit",
    fontWeight: "inherit",
  };
  const matchPattern = useMatch("/");

  return (
    <NavLink to="/" style={linkStyle}>
      <div className={styles.nav2}>
        <BurgerIcon type={matchPattern ? "primary" : "secondary"} />
        <p
          className={
            matchPattern
              ? "text text_type_main-default"
              : "text text_type_main-default text_color_inactive"
          }
        >
          Конструктор
        </p>
      </div>
    </NavLink>
  );
}

export default Create;
