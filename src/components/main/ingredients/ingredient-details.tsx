import React, { FC } from "react";
import styles from "./ingredient-details.module.css";

import { useLocation, useParams } from "react-router-dom";
import { useSelector } from "../../../services/store";
import { cart_getItems } from "../../../services/ingredients/selectors";

type TNutritionProps = {
  children: string;
  data: number | string;
};

export const IngredientsDetails = (): JSX.Element => {
  const location = useLocation();

  const items = useSelector(cart_getItems);

  const { ingredientId } = useParams();

  const data = items.find((el) => el._id === ingredientId);

  const { name, image, calories, proteins, fat, carbohydrates } = data || {
    name: "",
    image: "",
    calories: "",
    proteins: "",
    fat: "",
    carbohydrates: "",
  };

  const shouldAddMarginTop = location.state === null;
  const classNameModal = `${styles.modal} ${
    shouldAddMarginTop ? styles.with_margin : ""
  }`;
  return (
    <div className={classNameModal}>
      <div className={styles.title}>
        <p className="text text_type_main-large">Детали ингридиента</p>
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
    </div>
  );
};

const Nutritions: FC<TNutritionProps> = ({ data, children }): JSX.Element => {
  return (
    <div className={styles.value}>
      <p className="text text_type_main-default">{children}</p>
      <p className="text text_type_digits-default">{data}</p>
    </div>
  );
};
