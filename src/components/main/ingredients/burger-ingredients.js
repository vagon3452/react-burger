import React, { useMemo, useEffect, useRef } from "react";
import styles from "./burger-ingredients.module.css";
import Item from "./item";
import { getItems } from "../../../services/actions/cart";
import { useSelector, useDispatch } from "react-redux";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

const type_bun = "bun";
const type_sauce = "sauce";
const type_main = "main";

export default function BurgerIngredients() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getItems());
  }, [dispatch]);

  const { items, isLoading, hasError} = useSelector((state) => ({
    items: state.cart.items,
    isLoading: state.cart.isLoading,
    hasError: state.cart.hasError,
  }));

  const bunsRef = useRef(null);
  const sausRef = useRef(null);
  const mainRef = useRef(null);

  const bun = useMemo(
    () => items.filter((item) => item.type === type_bun),
    [items]
  );
  const saus = useMemo(
    () => items.filter((item) => item.type === type_sauce),
    [items]
  );
  const main = useMemo(
    () => items.filter((item) => item.type === type_main),
    [items]
  );
  const [current, setCurrent] = React.useState(type_bun);

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h2>Соберите бургер</h2>
      </div>
      <div style={{ display: "flex" }}>
        <Tab
          value={type_bun}
          active={current === type_bun}
          onClick={() => (bunsRef.current.scrollIntoView(), setCurrent(type_bun))}
        >
          Булки
        </Tab>
        <Tab
          value={type_sauce}
          active={current === type_sauce}
          onClick={() => (sausRef.current.scrollIntoView(), setCurrent(type_sauce))}
        >
          Соусы
        </Tab>
        <Tab
          value={type_main}
          active={current === type_main}
          onClick={() => (mainRef.current.scrollIntoView(), setCurrent(type_main))}
        >
          Начинки
        </Tab>
      </div>
      <div className={styles.ingridients}>
        {isLoading && "Загрузка..."}
        {hasError && "что-то пошло не так"}
        {!isLoading && !hasError && items && (
          <>
            <div className={styles.headline} ref={bunsRef}>
              <h2>Булки</h2>
            </div>
            <div className={styles.columns}>
              {bun.map((item) => (
                <Item key={item._id} data={item} />
              ))}
            </div>
            <div className={styles.headline} ref={sausRef}>
              <h2>Соусы</h2>
            </div>
            <div className={styles.columns}>
              {saus.map((item) => (
                <Item key={item._id} data={item} />
              ))}
            </div>
            <div className={styles.headline} ref={mainRef}>
              <h2>Начинка</h2>
            </div>
            <div className={styles.columns}>
              {main.map((item) => (
                <Item key={item._id} data={item} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
