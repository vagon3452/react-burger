import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "../../../services/store";

function Person(): JSX.Element {
  const linkStyle = {
    textDecoration: "none",
    color: "inherit",
    fontSize: "inherit",
    fontWeight: "inherit",
  };
  const location = useLocation();
  const isProfile = /^\/profile$/.test(location.pathname);
  const isProfileOrders = /^\/profile\/orders$/.test(location.pathname);
  const isLogin = /^\/login$/.test(location.pathname);
  const isProfilePage = isProfile || isProfileOrders || isLogin;

  const user = useSelector((store) => store.user.user);

  return (
    <>
      <ProfileIcon type={isProfilePage ? "primary" : "secondary"} />
      <NavLink to="/profile" style={linkStyle}>
        <p
          className={
            isProfilePage
              ? "text text_type_main-default"
              : "text text_type_main-default text_color_inactive"
          }
        >
          {user?.name || "Личный кабинет"}
        </p>
      </NavLink>
    </>
  );
}

export default Person;