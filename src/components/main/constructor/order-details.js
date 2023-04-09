import styles from "./burger-constructor.module.css";
import PropTypes from "prop-types";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

export const OrderDetails = ({ image, closeModal, number }) => {
  return (
    <>
      <div className={styles.title}>
        <p className="text text_type_digits-large">{number}</p>
        <div className={styles.close}>
          <CloseIcon onClick={() => closeModal(false)} />
        </div>
      </div>
      <div className={styles.text}>
        <p className="text text_type_main-large">идинтификатор заказа</p>
      </div>
      <img src={image} alt="OK" className={styles.image} />
      <div className={styles.text}>
        <p className="text text_type_main-default">ваш заказ начали готовить</p>
        <p className="text text_type_main-default text_color_inactive">
          дождитесь готовности на орбитальной станции
        </p>
      </div>
    </>
  );
};
