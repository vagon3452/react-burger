import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { burgerPropTypes } from "../../../utils/prop-types";
import { totalPriceSelector } from "../../../common/total-price";
import { useDrag } from "react-dnd";
import Modal from "../../modal/modal";
import styles from "./item.module.css";
import { IngredientsDetails } from "./ingredient-details";

import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Item({ data }) {
  const { image, name, price, _id } = data;
  const total = useSelector(totalPriceSelector);
  const currentCount = total[_id] || 0;
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const location = useLocation();
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
    dispatch({type: "SET_MODAL", payload: data})
    // navigate("", { state: { background: location } });
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
          <IngredientsDetails data={data} modal={modal} />
        </Modal>
      )}
    </section>
  );
}

Item.propTypes = {
  data: burgerPropTypes.isRequired,
};
