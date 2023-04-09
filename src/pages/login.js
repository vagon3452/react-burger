import React, { useCallback, useEffect, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { getUserAction } from "../services/actions/user";
import { signInAction } from "../services/actions/user";

import { AppHeader } from "../components/header/app-header";
import styles from "./login.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

export function LoginPage() {
  const dispatch = useDispatch();
  const onClick = (e) => {
    dispatch(signInAction(form));
    e.preventDefault();
  };
  useEffect(()=>{
    dispatch(getUserAction())
  },[])
  const { user } = useSelector((store) => ({ user: store.user.user }));
  
  const [form, setValue] = useState({ email: "", password: "" });

  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  if (user) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className={styles.container}>
      <AppHeader />
      <div className={styles.content}>
        <div className={styles.edit}>
          <h1>Вход</h1>
          <EmailInput
            onChange={onChange}
            value={form.email}
            name={"email"}
            isIcon={false}
          />
          <PasswordInput
            onChange={onChange}
            value={form.password}
            name={"password"}
            extraClass="mb-2"
          />
          <Button
            htmlType="button"
            type="primary"
            size="medium"
            onClick={onClick}
          >
            Войти
          </Button>
        </div>
        <div className={styles.actions}>
          <p>
            Вы - новый пользователь?{" "}
            <Link to="/register">Зарегистрироваться</Link>
          </p>
          <p>
            Забыли пароль? <Link to="/forgot-password">Восстановить пароль</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
