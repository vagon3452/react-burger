import React, { FC } from "react";
import { useSelector } from "react-redux";
import { totalPriceSelector } from "../../../services/constructor/selectors";
import { useDrag } from "react-dnd";
import styles from "./item.module.css";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { TIngredient } from "../../../services/ingredients/types";

type TItemProps = {
  data: TIngredient;
};

export const Item: FC<TItemProps> = ({ data }): JSX.Element => {
  const { image, name, price, _id } = data;
  const total = useSelector(totalPriceSelector);

  const currentCount = total.count.get(_id) || 0;

  const [{ opacity }, ref] = useDrag(
    {
      type: "items",
      item: data,
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.1 : 1,
      }),
    },
    [data]
  );

  return (
    <section className={styles.block} style={{ opacity }} ref={ref}>
      {currentCount > 0 && <Counter count={currentCount} size="default" />}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <img src={image} alt={name} />
        <div className={styles.price}>
          <p className="text text_type_digits-default mr-4">{price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <div style={{ height: "48px" }}>
          <p style={{ textAlign: "center" }}>{name}</p>
        </div>
      </div>
    </section>
  );
};