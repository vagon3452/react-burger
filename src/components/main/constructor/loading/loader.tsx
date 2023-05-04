import styles from "./loader.module.css"

export const Loader = () => {
  return (
    <div className={styles.text}>
      <p className="text text_type_main-large">Создание заказа...</p>
    </div>
  );
};
