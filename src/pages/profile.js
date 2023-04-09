import React, { useCallback, useState } from "react";
import { Navigate, Link } from "react-router-dom";

import { signOutAction } from "../services/actions/user";

import { AppHeader } from "../components/header/app-header";
import styles from "./login.module.css";
import { useDispatch} from "react-redux";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";

export function ProfilePage() {
  const dispatch = useDispatch();
  const onClick = () => {
    dispatch(signOutAction());
  };

  const [form, setValue] = useState({ name: "", email: "", password: "" });

  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className={styles.container}>
      <AppHeader />
      <div className={styles.content}>
        <div className={styles.edit}>
          <h1>страница профиля</h1>
          <Input
            type={"text"}
            placeholder={"Имя"}
            onChange={onChange}
            icon="EditIcon"
            value={form.name}
            name={"name"}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
            extraClass="ml-1"
          />
          <Input
            type={"text"}
            placeholder={"Логин"}
            onChange={onChange}
            icon="EditIcon"
            value={form.email}
            name={"email"}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
            extraClass="ml-1"
          />
          <Input
            type={"text"}
            placeholder={"Пароль"}
            onChange={onChange}
            icon="EditIcon"
            value={form.password}
            name={"password"}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
            extraClass="ml-1"
          />

          <Button
            htmlType="button"
            type="primary"
            size="medium"
            onClick={onClick}
          >
            Выйти
          </Button>
        </div>
        <div className={styles.actions}>
        </div>
      </div>
    </div>
  );
}
