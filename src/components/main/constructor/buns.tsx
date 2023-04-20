import React from "react";
import PropTypes from "prop-types";
import { useDrop } from "react-dnd";
import styles from "./burger-constructor.module.css";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { TIngredient } from "../../../services/types/data";
type Props = {
  bun: TIngredient;
  handleDrag: (items: TIngredient) => void;
  pos: string;
  type: "top" | "bottom";
};

export const Bun = ({ bun, handleDrag, pos, type }: Props): JSX.Element => {
  const [, dropTarget] = useDrop<TIngredient>({
    accept: "items",
    drop(items) {
      items.type === "bun" && handleDrag(items);
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
