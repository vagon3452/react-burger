import React, { useEffect } from "react";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import styles from "../app-header.module.css";
import { BurgerIcon } from "@ya.praktikum/react-developer-burger-ui-components";

function Create() {
 
  return (
    <NavLink to="/">
      <div className={styles.nav2}>
        <BurgerIcon type="primary" />
        <div className="text text_type_main-default">Конструктор</div>
      </div>
    </NavLink>
  );
}

export default Create;
