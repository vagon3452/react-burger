import React, { useState, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { signInAction } from "../../services/auth/actions";

import styles from "./login.module.css";
import { useDispatch } from "../../services/store";
import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

export function LoginPage(): JSX.Element {
  const dispatch = useDispatch();
  const [form, setValue] = useState({ email: "", password: "" });

  const onClick = (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch(signInAction(form));
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className={styles.content}>
      <form
        className={styles.form}
        onSubmit={onClick}
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
          data-test="login"
        />
        <PasswordInput
          onChange={onChange}
          value={form.password}
          name={"password"}
          extraClass={styles.input}
          placeholder="Пароль"
          data-test="pass"
        />
        <Button htmlType="submit" type="primary" size="medium">
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