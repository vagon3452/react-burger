import React, { useState, ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { forgotPasswordRequest } from "../../services/burger-api";
import styles from "./forgot-password.module.css";
import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

export function ForgotPass(): JSX.Element {
  const navigate = useNavigate();
  const onClick = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    forgotPasswordRequest(form)
      .then(() => {
        localStorage.setItem("reset-password", "true");
        navigate("/reset-password");
      })
      .catch((e) => {
        throw new Error(`error ${e}`);
      });
  };

  const [form, setValue] = useState({ email: "" });

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
        <EmailInput
          onChange={onChange}
          value={form.email}
          name={"email"}
          isIcon={false}
          placeholder="Укажите E-mail"
          extraClass={styles.input}
        />
        <Button htmlType="submit" type="primary" size="medium">
          Восстановить
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
