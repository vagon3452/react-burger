import React from "react";
import { NavLink, useMatch } from "react-router-dom";
import { ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";

function Person() {
  const linkStyle = {
    textDecoration: "none",
    color: "inherit",
    fontSize: "inherit",
    fontWeight: "inherit",
  };

  const matchPattern = useMatch("/profile");

  return (
    <>
      <ProfileIcon type={matchPattern ? "primary" : "secondary"} />
      <NavLink to="/profile" style={linkStyle}>
        <p
          className={
            matchPattern
              ? "text text_type_main-default"
              : "text text_type_main-default text_color_inactive"
          }
        >
          Личный кабинет
        </p>
      </NavLink>
    </>
  );
}

export default Person;
