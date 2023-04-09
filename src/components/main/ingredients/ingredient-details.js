import styles from "./item.module.css";
import PropTypes from "prop-types";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

export const IngredientsDetails = ({ data, modal }) => {
  const { name, image, calories, proteins, fat, carbohydrates } = data;

  return (
    <>
      <div className={styles.title}>
        <p className="text text_type_main-large">Детали ингридиента</p>
        <div>
          <CloseIcon type="primary" onClick={modal} />
        </div>
      </div>
      <img src={image} alt={name} className={styles.image} />
      <div className={styles.frame}>
        <p className="text text_type_main-medium">{name}</p>
      </div>
      <div className={styles.nutrition}>
        <Nutritions data={calories}>Калории,ккал</Nutritions>
        <Nutritions data={proteins}>Белки, г</Nutritions>
        <Nutritions data={fat}>Жиры, г</Nutritions>
        <Nutritions data={carbohydrates}>Углеводы, г</Nutritions>
      </div>
    </>
  );
};

function Nutritions({ data, children }) {
  return (
    <div className={styles.value}>
      <p className="text text_type_main-default">{children}</p>
      <p className="text text_type_digits-default">{data}</p>
    </div>
  );
}

Nutritions.propTypes = {
  data: PropTypes.number.isRequired,
  children: PropTypes.string.isRequired,
};
