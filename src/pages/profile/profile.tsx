import React from "react";
import { REFRESH_TOKEN_KEY } from "../../services/auth/constants";
import { setUserAction, signOutAction } from "../../services/auth/actions";
import styles from "./profile.module.css";

import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "../../services/store";

const linkStyle = {
  textDecoration: "none",
  color: "inherit",
  fontSize: "inherit",
  fontWeight: "inherit",
};

export function ProfilePage(): JSX.Element {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (link: string): boolean => location.pathname === link;

  const dispatch = useDispatch();
  const links = [
    { path: "/profile", name: "Профиль" },
    { path: "/profile/orders", name: "История заказов" },
    { path: "/", name: "Выход", signOut: true },
  ];
  const handlerSignOut = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
    if (refreshToken) {
      dispatch(signOutAction({ token: refreshToken }));
    } else {
      navigate("/login");
      dispatch(setUserAction(null));
    }
  };

  return (
    <>
      <div className={styles.navigation}>
        {links.map(({ path, name, signOut }) => {
          return (
            <div className={styles.frame}>
              <Link to={path} style={linkStyle}>
                {signOut ? (
                  <p
                    onClick={handlerSignOut}
                    className={`text text_type_main-medium ${
                      isActive(path)
                        ? "text_color_primary"
                        : "text_color_inactive"
                    }`}
                  >
                    {name}
                  </p>
                ) : (
                  <p
                    className={`text text_type_main-medium ${
                      isActive(path)
                        ? "text_color_primary"
                        : "text_color_inactive"
                    }`}
                  >
                    {name}
                  </p>
                )}
              </Link>
            </div>
          );
        })}
      </div>
      <div className={styles.caption}>
        <p>Здесь вы можете изменять свои персональные данные</p>
      </div>
      <Outlet />
    </>
  );
}

{
  /* {frameLink("/", "Выход")} */
}
