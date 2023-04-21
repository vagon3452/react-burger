import React, { FC } from "react";
import { useDrop } from "react-dnd";
import styles from "./burger-constructor.module.css";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { TIngredient } from "../../../services/types/data";
import { ingredientType } from "../../../services/types/data";

type TBunProps = {
  bun: TIngredient;
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
      className={`${styles.ingridient} `}
      style={{ paddingLeft: "24px" }}
      ref={dropTarget}
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
        <div className={styles.modal}>Выберите булку</div>
      )}
    </div>
  );
};

export default Bun;
