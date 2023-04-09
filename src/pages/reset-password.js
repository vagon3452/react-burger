import React, { useCallback, useState } from "react";
import { Navigate, Link, useNavigate, useLocation } from "react-router-dom";
import { resetPasswordRequest } from "../services/burger-api";
import { AppHeader } from "../components/header/app-header";
import styles from "./login.module.css";
import { useDispatch } from "react-redux";
import {
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

export function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  console.log(location)
  const onClick = async (e) => {
    const data = await resetPasswordRequest(form);
    if (data.success) {
    }
    e.preventDefault();
  };

  const [form, setValue] = useState({ password: "", code: "" });

  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className={styles.container}>
      <AppHeader />
      <div className={styles.content}>
        <div className={styles.edit}>
          <h1>Восстановление пароля</h1>
          <PasswordInput
            onChange={onChange}
            value={form.password}
            name={"password"}
            extraClass="mb-2"
          />
          <PasswordInput
            onChange={onChange}
            value={form.password}
            name={"code"}
            extraClass="mb-2"
          />
          <Button
            htmlType="button"
            type="primary"
            size="medium"
            onClick={onClick}
          >
            Восстановить
          </Button>
        </div>
        <div className={styles.actions}>
          <p>
            Вспомнили пароль? <Link to="/login">Войти</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
