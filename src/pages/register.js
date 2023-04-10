import React from "react";
import { registerUserAction } from "../services/actions/user";
import styles from "./login.module.css";
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
  //ToPsEcReT3452

  function onClick() {
    dispatch(registerUserAction(value));
  }
  const onChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };
  return (
    <div className={styles.content}>
      <div className={styles.edit}>
        <h1>Регистрация</h1>
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={onChange}
          value={value.name}
          name={"name"}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
          extraClass="ml-1"
        />
        <EmailInput
          onChange={onChange}
          value={value.email}
          name={"email"}
          isIcon={false}
        />
        <PasswordInput
          onChange={onChange}
          value={value.password}
          name={"password"}
          extraClass="mb-2"
        />
        <Button
          htmlType="button"
          type="primary"
          size="medium"
          onClick={onClick}
        >
          Зарегистрироваться
        </Button>
      </div>
      <div className={styles.actions}>
        <p>
          Уже зарегестрированы? <Link to="/login">Войти</Link>
        </p>
      </div>
    </div>
  );
};
