import React, { useState } from "react";

import { reversUserAction } from "../../services/actions/user";
import styles from "./profile.module.css";
import { useSelector } from "react-redux";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";

export const IndexPage = () => {
  const { user } = useSelector((store) => ({ user: store.user.user }));

  const [form, setValue] = useState({ ...user, password: "" });

  const cancellation = () => {
    setValue({ ...user, password: "" });
  };

  const isUser =
    JSON.stringify({ ...user, password: "" }) === JSON.stringify(form);

  const saveNewUser = (e) => {
    e.preventDefault();
    reversUserAction(form);
  };

  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };
  return (
    <div className={styles.content}>
      <form
        onSubmit={saveNewUser}
        className={styles.form}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            saveNewUser(e);
          }
        }}
      >
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
        <div className={`${styles.button} ${isUser && styles.hiden}`}>
          <Button
            htmlType="button"
            type="secondary"
            size="medium"
            onClick={cancellation}
          >
            Отмена
          </Button>
          <Button htmlType="submit" type="primary" size="medium">
            Сохранить
          </Button>
        </div>
      </form>
    </div>
  );
};
