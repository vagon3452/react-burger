import React from "react";
import styles from "./Modal.module.css";
import ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const modalRoot = document.getElementById("react-modals");

function Modal({ data, closeModal }) {
  console.log(data);
  
  function close(e) {
    e.stopPropagation()
    closeModal(false);
  }

  return ReactDOM.createPortal(
    <div className={styles.modalBackground} onClick={close}>
      <div className={styles.content} onClick={e=>e.stopPropagation()}>
        <div className={styles.title}>
          <p className="text text_type_main-large">Детали ингридиента</p>
          <div>
            <CloseIcon type="primary" onClick={close} />
          </div>
        </div>
        <img src={data.image}  className={styles.image} />
        <div className={styles.frame}>
          <p className="text text_type_main-medium">{data.name}</p>
        </div>
        <div className={styles.nutrition}>
          <div className={styles.value}>
            <p className="text text_type_main-default">Калории,ккал</p>
            <p className="text text_type_digits-default pl-9">
              {data.calories}
            </p>
          </div>
          <div className={styles.value}>
            <p className="text text_type_main-default pl-4">Белки, г </p>
            <p className="text text_type_digits-default pl-9">
              {data.proteins}
            </p>
          </div>
          <div className={styles.value}>
            <p className="text text_type_main-default pl-4">Жиры, г</p>
            <p className="text text_type_digits-default pl-9">{data.fat}</p>
          </div>
          <div className={styles.value}>
            <p className="text text_type_main-default">Углеводы, г</p>
            <p className="text text_type_digits-default pl-9">
              {data.carbohydrates}
            </p>
          </div>
        </div>
      </div>
    </div>,
    modalRoot
  );
}

export default Modal;
