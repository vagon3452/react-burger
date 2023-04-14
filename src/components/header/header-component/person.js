import React from "react";
import { NavLink, useMatch, useResolvedPath } from "react-router-dom";
import { ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";

function Person() {
  const linkStyle = {
    textDecoration: "none",
    color: "inherit",
    fontSize: "inherit",
    fontWeight: "inherit",
  };

  const matchPattern = useResolvedPath().pathname;
  const isProfile = ["/profile", "/profile/orders", "/login"].find(
    (route) => route === matchPattern
  );

  return (
    <>
      <ProfileIcon type={isProfile ? "primary" : "secondary"} />
      <NavLink to="/profile" style={linkStyle}>
        <p
          className={
            isProfile
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
