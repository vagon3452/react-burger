import React, { ChangeEvent, useState } from "react";
import { registerUserAction } from "../../services/actions/user";
import styles from "./register.module.css";
import { useDispatch } from "react-redux";
import { TUser } from "../../services/types/user";
import {
  EmailInput,
  PasswordInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";

export const RegisterPage = (): JSX.Element => {
  const dispatch = useDispatch();
  const [value, setValue] = useState<TUser>({
    email: "",
    password: "",
    name: "",
  });

  function onClick(e: React.SyntheticEvent) {
    e.preventDefault();
    //@ts-ignore
    dispatch(registerUserAction(value));
  }
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue({ ...value, [e.target.name]: e.target.value });
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
        <h1>Регистрация</h1>
        <Input
          type={"text"}
          placeholder="Имя"
          onChange={onChange}
          value={value.name}
          name={"name"}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
          extraClass={styles.input}
        />
        <EmailInput
          onChange={onChange}
          value={value.email}
          name={"email"}
          isIcon={false}
          placeholder="E-mail"
          extraClass={styles.input}
        />
        <PasswordInput
          onChange={onChange}
          value={value.password}
          name={"password"}
          extraClass={styles.input}
          placeholder="Пароль"
        />
        <Button htmlType="submit" type="primary" size="medium">
          Зарегистрироваться
        </Button>
      </form>
      <div className={styles.actions}>
        <p>
          Уже зарегестрированы? <Link to="/login">Войти</Link>
        </p>
      </div>
    </div>
  );
};
