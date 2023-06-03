import React, { useState, ChangeEvent } from "react";
import { TUser } from "../../services/auth/types";
import { updateUserAction } from "../../services/auth/actions";
import styles from "./profile.module.css";

import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "../../services/store";

export const IndexPage = (): JSX.Element => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => ({ user: store.user.user }));

  const [form, setValue] = useState<TUser>({ ...user!, password: "" });

  const cancellation = (): void => {
    setValue({ ...user!, password: "" });
  };

  const isUser: boolean =
    Object.entries({ ...user, password: "" }).toString() ===
    Object.entries(form).toString();

  const saveNewUser = (e: React.SyntheticEvent): void => {
    e.preventDefault();

    dispatch(updateUserAction(form));
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
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
