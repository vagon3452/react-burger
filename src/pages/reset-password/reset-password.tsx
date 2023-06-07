import React, { useState, ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { resetPasswordRequest } from "../../services/burger-api";
import styles from "./reset-password.module.css";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

export function ResetPassword(): JSX.Element {
  const navigate = useNavigate();

  if (!localStorage.getItem("reset-password")) {
    navigate("/");
  }

  const onClick = (e: React.SyntheticEvent) => {
    e.preventDefault();
    resetPasswordRequest(form).then(() => {
      localStorage.removeItem("reset-password");
      navigate("/login");
    });
  };

  const [form, setValue] = useState({ password: "", token: "" });

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className={styles.content}>
      <form
        onSubmit={onClick}
        className={styles.form}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onClick(e);
          }
        }}
      >
        <h1>Восстановление пароля</h1>
        <PasswordInput
          onChange={onChange}
          value={form.password}
          name={"password"}
          extraClass={styles.input}
          placeholder="Введите новый пароль"
        />
        <Input
          onChange={onChange}
          value={form.token}
          name={"token"}
          extraClass={styles.input}
          placeholder="Введите код из письма"
        />
        <Button htmlType="submit" type="primary" size="medium">
          Сохранить
        </Button>
      </form>
      <div className={styles.actions}>
        <p>
          Вспомнили пароль? <Link to="/login">Войти</Link>
        </p>
      </div>
    </div>
  );
}