import React, { useCallback, useEffect } from "react";
import styles from "./Modal.module.css";
import ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const modalRoot = document.getElementById("react-modals");

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
          <div className={styles.value}>
            <p className="text text_type_main-default">Калории,ккал</p>
            <p className="text text_type_digits-default">{data.calories}</p>
          </div>
          <div className={styles.value}>
            <p className="text text_type_main-default">Белки, г </p>
            <p className="text text_type_digits-default">{data.proteins}</p>
          </div>
          <div className={styles.value}>
            <p className="text text_type_main-default">Жиры, г</p>
            <p className="text text_type_digits-default ">{data.fat}</p>
          </div>
          <div className={styles.value}>
            <p className="text text_type_main-default">Углеводы, г</p>
            <p className="text text_type_digits-default">
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
