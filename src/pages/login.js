import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUserAction } from "../services/actions/user";
import { signInAction } from "../services/actions/user";

import styles from "./login.module.css";
import { useDispatch } from "react-redux";
import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

export function LoginPage() {
  const dispatch = useDispatch();
  const [form, setValue] = useState({ email: "", password: "" });

  const onClick = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(signInAction(form));
    },
    [dispatch, form]
  );

  useEffect(() => {
    dispatch(getUserAction());
  }, [dispatch]);
  // const { user } = useSelector((store) => ({ user: store.user.user }));

  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className={styles.content}>
      <form
        className={styles.edit}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onClick(e);
          }
        }}
      >
        <h1>Вход</h1>
        <EmailInput
          onChange={onChange}
          value={form.email}
          name={"email"}
          isIcon={false}
          extraClass={styles.input}
          placeholder="E-mail"
        />
        <PasswordInput
          onChange={onChange}
          value={form.password}
          name={"password"}
          extraClass={styles.input}
          placeholder="Пароль"
        />
        <Button
          htmlType="button"
          type="primary"
          size="medium"
          onClick={onClick}
        >
          Войти
        </Button>
      </form>
      <div className={styles.actions}>
        <div>
          Вы - новый пользователь?
          <Link to="/register"> Зарегистрироваться</Link>
        </div>
        <div>
          Забыли пароль? <Link to="/forgot-password"> Восстановить пароль</Link>
        </div>
      </div>
    </div>
  );
}
