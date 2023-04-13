import React from "react";

import { signOutAction } from "../../services/actions/user";
import styles from "./profile.module.css";
import { useDispatch } from "react-redux";

import { Link, Outlet, useLocation } from "react-router-dom";

const linkStyle = {
  textDecoration: "none",
  color: "inherit",
  fontSize: "inherit",
  fontWeight: "inherit",
};

export function ProfilePage() {
  const location = useLocation();

  const isActive = (link) => location.pathname === link;

  const dispatch = useDispatch();

  const signOut = (e) => {
    e.preventDefault();
    dispatch(signOutAction());
  };

  return (
    <>
      <div className={styles.navigation}>
        <div className={styles.frame}>
          <Link to="/profile" style={linkStyle}>
            <p
              className={`text text_type_main-medium ${
                isActive("/profile")
                  ? "text_color_primary"
                  : "text_color_inactive"
              }
                
                
              `}
            >
              Профиль
            </p>
          </Link>
        </div>
        <div className={styles.frame}>
          <Link to="/profile/orders" style={linkStyle}>
            <p
              className={`text text_type_main-medium ${
                isActive("/profile/orders")
                  ? "text_color_primary"
                  : "text_color_inactive"
              }

              `}
            >
              История заказов
            </p>
          </Link>
        </div>
        <div className={styles.frame}>
          <Link to="/" style={linkStyle}>
            <p
              className={`text text_type_main-medium ${
                isActive("/") ? "text_color_primary" : "text_color_inactive"
              }

              `}
              onClick={signOut}
            >
              Выход
            </p>
          </Link>
        </div>
      </div>
      <div className={styles.caption}>
        <p>Здесь вы можете изменять свои персональные данные</p>
      </div>
      <Outlet />
    </>
  );
}
