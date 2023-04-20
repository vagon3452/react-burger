import React, { useMemo, useRef } from "react";
import styles from "./burger-ingredients.module.css";
import Item from "./item";
import { useSelector } from "react-redux";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { TIngredient } from "../../../services/types/data";
type TSelector = {
  items: TIngredient[];
  isLoading: boolean;
  hasError: boolean;
};
const type_bun = "bun";
const type_sauce = "sauce";
const type_main = "main";

export const BurgerIngredients = (): JSX.Element => {
  const { items, isLoading, hasError }: TSelector = useSelector((state) => ({
    //@ts-ignore
    items: state.cart.items,
    //@ts-ignore
    isLoading: state.cart.isLoading,
    //@ts-ignore
    hasError: state.cart.hasError,
  }));
  const location = useLocation();
  const bunsRef = useRef<HTMLDivElement | null>(null);
  const sausRef = useRef<HTMLDivElement | null>(null);
  const mainRef = useRef<HTMLDivElement | null>(null);
  const linkStyle = {
    textDecoration: "none",
    color: "inherit",
    fontSize: "inherit",
    fontWeight: "inherit",
  };
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
          onClick={() => (
            bunsRef.current?.scrollIntoView(), setCurrent(type_bun)
          )}
        >
          Булки
        </Tab>
        <Tab
          value={type_sauce}
          active={current === type_sauce}
          onClick={() => (
            sausRef.current?.scrollIntoView(), setCurrent(type_sauce)
          )}
        >
          Соусы
        </Tab>
        <Tab
          value={type_main}
          active={current === type_main}
          onClick={() => (
            mainRef.current?.scrollIntoView(), setCurrent(type_main)
          )}
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
                <Link
                  to={`/ingredients/${item._id}`}
                  state={{ background: location }}
                  key={item._id}
                  style={linkStyle}
                >
                  <Item data={item} />
                </Link>
              ))}
            </div>
            <div className={styles.headline} ref={sausRef}>
              <h2>Соусы</h2>
            </div>
            <div className={styles.columns}>
              {saus.map((item) => (
                <Link
                  to={`/ingredients/${item._id}`}
                  state={{ background: location }}
                  key={item._id}
                  style={linkStyle}
                >
                  <Item data={item} />
                </Link>
              ))}
            </div>
            <div className={styles.headline} ref={mainRef}>
              <h2>Начинка</h2>
            </div>
            <div className={styles.columns}>
              {main.map((item) => (
                <Link
                  to={`/ingredients/${item._id}`}
                  state={{ background: location }}
                  key={item._id}
                  style={linkStyle}
                >
                  <Item data={item} />
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
