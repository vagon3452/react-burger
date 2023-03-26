import React, { useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./modal.module.css";
import ReactDOM from "react-dom";

const modalRoot = document.getElementById("react-modals");

function Modal({ closeModal, children }) {
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
        {children}
      </div>
    </div>,
    modalRoot
  );
}

Modal.propTypes = {
  children: PropTypes.object.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default Modal;
