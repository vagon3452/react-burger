import React, { useCallback, useState } from "react";
import { Navigate, Link, useNavigate, useLocation } from "react-router-dom";
import { forgotPasswordRequest } from "../services/burger-api";
import styles from "./login.module.css";
import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

export function ForgotPass() {
  const navigate = useNavigate();
  const location = useLocation();
  const onClick = async (e) => {
    const data = await forgotPasswordRequest(form);
    if (data?.success) {
      navigate("/reset-password", { state: { reset: location } });
    }
    e.preventDefault();
  };
  const { hasError, setError } = useState(false);
  const [form, setValue] = useState({ email: "" });

  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className={styles.content}>
      <div className={styles.edit}>
        <h1>Восстановление пароля</h1>
        <EmailInput
          onChange={onChange}
          value={form.email}
          name={"email"}
          isIcon={false}
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
        {hasError && <p>что-то пошло не так</p>}
      </div>
    </div>
  );
}
