import React from "react";
import PropTypes from "prop-types";
import { useDrop } from "react-dnd";
import styles from "./burger-constructor.module.css";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { burgerPropTypes } from "../../../utils/prop-types";


export const Bun = ({ bun, handleDrag, pos, type }) => {
  
  const [, dropTarget] = useDrop({
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

Bun.propTypes = {
  bun: burgerPropTypes,
  handleDrag: PropTypes.func.isRequired,
  pos: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default Bun;
