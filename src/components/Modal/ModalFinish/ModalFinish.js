import React from "react";
import styles from "./ModalFinish.module.css";
import ReactDOM from "react-dom";
import image from "../../../images/done.png";
import {
  CloseIcon,
  CheckMarkIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

const modalRoot = document.getElementById("react-modals");

function Modal({ closeModal }) {
  function close() {
    closeModal(false);
  }

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
          <img src={image} className={styles.image}/>
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

export default Modal;
