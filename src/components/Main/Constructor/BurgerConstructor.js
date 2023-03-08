import React from "react";
import styles from "./BurgerConstructor.module.css";
import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import CreateBurger1 from "./CreateComponents/CreateBurger1";
import CreateBurger2 from "./CreateComponents/CreateBurger2";
import CreateBurger3 from "./CreateComponents/CreateBurger3";
import CreateBurger4 from "./CreateComponents/CreateBurger4";
import CreateBurger5 from "./CreateComponents/CreateBurger5";
import CreateBurger6 from "./CreateComponents/CreateBurger6";
import CreateBurger7 from "./CreateComponents/CreateBurger7";

export default function BurgerConstructor() {
  const url = "https://norma.nomoreparties.space/api/ingredients";

  const [state, setState] = React.useState({
    isLoading: false,
    hasError: false,
    data: [],
  });

  React.useEffect(() => {
    setState({ ...state, isLoading: true, hasError: false });
    fetch(url)
      .then((res) => res.json())
      .then((json) =>
        setState({
          ...state,
          isLoading: false,
          hasError: false,
          data: json.data,
        })
      )
      .catch((err) => setState({ ...state, isLoading: false, hasError: true }));
  }, []);
  const { data, isLoading, hasError } = state;
  return (
    <div className={styles.container}>
      {isLoading && "Loading..."}
      {hasError && "error"}
      {!isLoading && !hasError && data.length && (
        <>
      <div className={styles.burgerComponents}>
        <CreateBurger1 data={data[0]} />
        <CreateBurger2 data={data[5]} />
        <CreateBurger3 data={data[4]} />
        <CreateBurger4 data={data[7]} />
        <CreateBurger5 data={data[10]} />
        <CreateBurger6 data={data[10]} />
        <CreateBurger7 data={data[0]} />
      </div>
      </>
      )}
      <div className={styles.info}>
        <p className="text text_type_main-medium">610</p>
        <CurrencyIcon type="primary" />
        <Button htmlType="button" type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
     
    </div>
  );
}
