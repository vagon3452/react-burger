import React, { useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./Modal.module.css";
import ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const modalRoot = document.getElementById("react-modals");

const burgerPropTypes = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  calories: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  image_mobile: PropTypes.string.isRequired,
  image_large: PropTypes.string.isRequired,
  __v: PropTypes.number.isRequired,
}).isRequired;

function Modal({ data, closeModal }) {

  const close = useCallback(
    (e) => {
      (e.keyCode === 27 || e.type === "click") && closeModal(false);
    },
    [closeModal]
  );

  useEffect(() => {
    document.addEventListener("keydown", close);

    return () => {
      document.removeEventListener("keydown", close);
    };
  }, [close]);

  return ReactDOM.createPortal(
    <div className={styles.modalBackground} onClick={close}>
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        <div className={styles.title}>
          <p className="text text_type_main-large">Детали ингридиента</p>
          <div>
            <CloseIcon type="primary" onClick={close} />
          </div>
        </div>
        <img src={data.image} alt={data.name} className={styles.image} />
        <div className={styles.frame}>
          <p className="text text_type_main-medium">{data.name}</p>
        </div>
        <div className={styles.nutrition}>
          <Nutritions data={data.calories}>Калории,ккал</Nutritions>
          <Nutritions data={data.proteins}>Белки, г</Nutritions>
          <Nutritions data={data.fat}>Жиры, г</Nutritions>
          <Nutritions data={data.carbohydrates}>Углеводы, г</Nutritions>
        </div>
      </div>
    </div>,
    modalRoot
  );
}

function Nutritions(props) {
  return (
    <div className={styles.value}>
      <p className="text text_type_main-default">{props.children}</p>
      <p className="text text_type_digits-default">{props.data}</p>
    </div>
  );
}

Nutritions.propTypes = {
  data: PropTypes.number.isRequired,
  children: PropTypes.string.isRequired,
}

Modal.propTypes = {
  data: burgerPropTypes,
  closeModal: PropTypes.func.isRequired,
};

export default Modal;
