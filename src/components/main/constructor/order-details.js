import styles from "./burger-constructor.module.css";

export const OrderDetails = ({ image, number, onClose }) => {
  return (
    <>
      <div className={styles.title}>
        <p className="text text_type_digits-large">{number}</p>
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
