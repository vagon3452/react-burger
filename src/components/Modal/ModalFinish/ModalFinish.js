import React from "react";
import styles from "./ModalFinish.module.css";
import ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const modalRoot = document.getElementById("react-modals");

function Modal({closeModal }) {
  
  function close() {
    closeModal(false);
  }

  return ReactDOM.createPortal(
    <div className={styles.modalBackground} onClick={close}>
      <div className={styles.content} onClick={e=>e.stopPropagation()}>
        <div className={styles.title}>
        <p className="text text_type_digits-large">034536</p>
          <div>
            <CloseIcon type="primary" onClick={close} />
          </div>
        </div>
        <img  className={styles.image} />
        <div className={styles.frame}>
          <p className="text text_type_main-medium"></p>
        </div>
        <div className={styles.nutrition}>
          <div className={styles.value}>
            <p className="text text_type_main-default">Калории,ккал</p>
            <p className="text text_type_digits-default pl-9">
              
            </p>
          </div>
          <div className={styles.value}>
            <p className="text text_type_main-default pl-4">Белки, г </p>
            <p className="text text_type_digits-default pl-9">
              
            </p>
          </div>
          <div className={styles.value}>
            <p className="text text_type_main-default pl-4">Жиры, г</p>
            <p className="text text_type_digits-default pl-9"></p>
          </div>
          <div className={styles.value}>
            <p className="text text_type_main-default">Углеводы, г</p>
            <p className="text text_type_digits-default pl-9">
              
            </p>
          </div>
        </div>
      </div>
    </div>,
    modalRoot
  );
}

export default Modal;
