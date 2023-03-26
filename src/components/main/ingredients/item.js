import React, { useState } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { burgerPropTypes } from "../../../utils/prop-types";
import { totalPriceSelector } from "../../../common/total-price";
import { useDrag } from "react-dnd";
import Modal from "../../modal/modal";
import styles from "./item.module.css";

import {
  CurrencyIcon,
  Counter,
  CloseIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

function Item({ data }) {
  const { image, name, price, _id, calories, carbohydrates, fat, proteins } =
    data;
  const total = useSelector(totalPriceSelector);
  const currentCount = total[_id] || 0;

  const [openModal, setOpenModal] = useState(false);

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
  const modal = () => {
    setOpenModal((prev) => !prev);
  };

  return (
    <section className={styles.block} style={{ opacity }} ref={ref}>
      {currentCount > 0 && <Counter count={currentCount} size="default" />}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <img src={image} alt={name} onClick={modal} />
        <div className={styles.price}>
          <p className="text text_type_digits-default mr-4">{price}</p>{" "}
          <CurrencyIcon type="primary" />
        </div>
        <div style={{ height: "48px" }}>
          <p style={{ textAlign: "center" }}>{name}</p>
        </div>
      </div>
      {openModal && (
        <Modal closeModal={setOpenModal}>
          <>
            <div className={styles.title}>
              <p className="text text_type_main-large">Детали ингридиента</p>
              <div>
                <CloseIcon type="primary" onClick={modal} />
              </div>
            </div>
            <img src={image} alt={name} className={styles.image} />
            <div className={styles.frame}>
              <p className="text text_type_main-medium">{name}</p>
            </div>
            <div className={styles.nutrition}>
              <Nutritions data={calories}>Калории,ккал</Nutritions>
              <Nutritions data={proteins}>Белки, г</Nutritions>
              <Nutritions data={fat}>Жиры, г</Nutritions>
              <Nutritions data={carbohydrates}>Углеводы, г</Nutritions>
            </div>
          </>
        </Modal>
      )}
    </section>
  );
}

function Nutritions({ data, children }) {
  return (
    <div className={styles.value}>
      <p className="text text_type_main-default">{children}</p>
      <p className="text text_type_digits-default">{data}</p>
    </div>
  );
}

Nutritions.propTypes = {
  data: PropTypes.number.isRequired,
  children: PropTypes.string.isRequired,
};

Item.propTypes = {
  data: burgerPropTypes.isRequired,
};

export default Item;
