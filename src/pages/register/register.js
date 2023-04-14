import React from "react";
import { registerUserAction } from "../../services/actions/user";
import styles from "./register.module.css";
import { useDispatch } from "react-redux";
import {
  EmailInput,
  PasswordInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";

export const RegisterPage = () => {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState({
    email: "",
    password: "",
    name: "",
  });

  function onClick() {
    dispatch(registerUserAction(value));
  }
  const onChange = (e) => {
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
