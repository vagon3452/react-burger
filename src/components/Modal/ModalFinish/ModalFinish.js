import React, {useCallback, useEffect} from "react";
import PropTypes from "prop-types";
import styles from "./ModalFinish.module.css";
import ReactDOM from "react-dom";
import image from "../../../images/done.png";
import {
  CloseIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";


const modalRoot = document.getElementById("react-modals");

function Modal({ closeModal }) {
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
          <p className="text text_type_digits-large">034536</p>
          <div className={styles.close}>
            <CloseIcon onClick={close}/>
          </div>
        </div>
        <div className={styles.text}>
          <p className="text text_type_main-large">идинтификатор заказа</p>
        </div>
          <img src={image} alt="OK" className={styles.image}/>
        <div className={styles.text}>
          <p className="text text_type_main-default">
            ваш заказ начали готовить
          </p>
          <p className="text text_type_main-default text_color_inactive">
            дождитесь готовности на орбитальной станции
          </p>
        </div>
      </div>
    </div>,
    modalRoot
  );
}

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
}

export default Modal;
