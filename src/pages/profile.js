import React, { useState, useCallback } from "react";

import { signOutAction, reversUserAction } from "../services/actions/user";
import styles from "./profile.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

export function ProfilePage() {
  const [form, setValue] = useState({ name: "", email: "", password: "" });
  const dispatch = useDispatch();

  const signOut = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(signOutAction());
    },
    [dispatch]
  );
  const { user } = useSelector((store) => ({ user: store.user.user }));
  const test = () => {
    console.log(user);
  };
  const saveNewUser = useCallback(
    (e) => {
      e.preventDefault();
      reversUserAction(form);
    },
    [form, user]
  );

  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className={styles.navigation}>
        <div className={styles.frame}>
          <div className={styles.text} onClick={test}>
            Профиль
          </div>
        </div>
        <div className={styles.frame}>
          <div className={styles.text}>История заказов</div>
        </div>
        <div className={styles.frame}>
          <div className={styles.text} onClick={signOut}>
            Выход
          </div>
        </div>
      </div>
      <div className={styles.caption}>
        <p>Здесь вы можете изменять свои персональные данные</p>
      </div>
      <div className={styles.content}>
        <div className={styles.edit}>
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
          />{" "}
          <PasswordInput
            onChange={onChange}
            value={form.password}
            name={"password"}
            extraClass={styles.input}
            placeholder="Пароль"
            icon="EditIcon"
          />
          <div className={styles.button}>
            <div className={styles.back}>Отмена</div>
            <Button
              htmlType="button"
              type="primary"
              size="medium"
              onClick={saveNewUser}
            >
              Сохранить
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
