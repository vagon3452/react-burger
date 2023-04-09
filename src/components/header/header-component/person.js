import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";

function Person() {
  return (
    <>
      <ProfileIcon type="primary" />
      <div className="text text_type_main-default text_color_inactive">
        <NavLink to="/profile">
          <p>Личный кабинет</p>
        </NavLink>
      </div>
    </>
  );
}

export default Person;
