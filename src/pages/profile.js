import React, { useState } from "react";

import { signOutAction } from "../services/actions/user";
import styles from "./profile.module.css";
import { useDispatch } from "react-redux";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";

export function ProfilePage() {
  const dispatch = useDispatch();
  const onClick = (e) => {
    dispatch(signOutAction());
    e.preventDefault();
  };

  const [form, setValue] = useState({ name: "", email: "", password: "" });

  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  return (
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
          extraClass={styles.input}
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
          extraClass={styles.input}
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
          extraClass={styles.input}
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
    </div>
  );
}
