import React, { useMemo, useRef, useState } from "react";
import styles from "./burger-ingredients.module.css";
import { Item } from "./item";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useSelector } from "../../../services/store";
import { ingredientType } from "../../../services/ingredients/types";
import { cart_getItems } from "../../../services/ingredients/selectors";

export const BurgerIngredients = (): JSX.Element => {
  const items = useSelector(cart_getItems);
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
    () => items.filter((item) => item.type === ingredientType.type_bun),
    [items]
  );
  const saus = useMemo(
    () => items.filter((item) => item.type === ingredientType.type_sauce),
    [items]
  );
  const main = useMemo(
    () => items.filter((item) => item.type === ingredientType.type_main),
    [items]
  );
  const [current, setCurrent] = useState(ingredientType.type_bun);

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h2>Соберите бургер</h2>
      </div>
      <div style={{ display: "flex" }}>
        <Tab
          value={ingredientType.type_bun}
          active={current === ingredientType.type_bun}
          onClick={() => (
            bunsRef.current?.scrollIntoView(),
            setCurrent(ingredientType.type_bun)
          )}
        >
          Булки
        </Tab>
        <Tab
          value={ingredientType.type_sauce}
          active={current === ingredientType.type_sauce}
          onClick={() => (
            sausRef.current?.scrollIntoView(),
            setCurrent(ingredientType.type_sauce)
          )}
        >
          Соусы
        </Tab>
        <Tab
          value={ingredientType.type_main}
          active={current === ingredientType.type_main}
          onClick={() => (
            mainRef.current?.scrollIntoView(),
            setCurrent(ingredientType.type_main)
          )}
        >
          Начинки
        </Tab>
      </div>
      <div className={styles.ingridients} data-test="ingredients">
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
      </div>
    </div>
  );
};
