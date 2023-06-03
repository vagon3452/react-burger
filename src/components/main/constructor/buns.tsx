import React, { FC } from "react";
import { useDrop } from "react-dnd";
import styles from "./buns.module.css";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import {
  TIngredient,
  ingredientType,
} from "../../../services/ingredients/types";

type TBunProps = {
  bun: TIngredient | null;
  handleDrag: (items: TIngredient) => void;
  pos: string;
  type: "top" | "bottom";
};

export const Bun: FC<TBunProps> = ({
  bun,
  handleDrag,
  pos,
  type,
}): JSX.Element => {
  const { type_bun } = ingredientType;
  const [, dropTarget] = useDrop<TIngredient>({
    accept: "items",
    drop(items) {
      items.type === type_bun && handleDrag(items);
    },
  });
  return (
    <div
      className={styles.ingredient}
      ref={dropTarget}
      data-test="bun-container"
    >
      {bun ? (
        <ConstructorElement
          type={type}
          isLocked={true}
          text={`${bun.name} ${pos}`}
          price={bun.price}
          thumbnail={bun.image}
        />
      ) : (
        <div className={styles.ingredient_background}>Выберите булку</div>
      )}
    </div>
  );
};

export default Bun;
