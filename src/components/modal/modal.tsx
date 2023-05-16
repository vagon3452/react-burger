import React, { FC, useCallback, useEffect } from "react";
import styles from "./modal.module.css";
import ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const modalRoot = document.getElementById("react-modals");

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

const Modal: FC<ModalProps> = ({ children, onClose }): React.ReactPortal => {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.code === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown, false);

    return () => {
      document.removeEventListener("keydown", handleKeyDown, false);
    };
  }, [handleKeyDown]);

  return ReactDOM.createPortal(
    <div className={styles.modalBackground} onClick={onClose}>
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        <div className={styles.closeIcon}>
          <CloseIcon type="primary" onClick={onClose} />
        </div>
        {children}
      </div>
    </div>,
    modalRoot!
  );
};

export default Modal;
