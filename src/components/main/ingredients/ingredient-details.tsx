import React, { ReactElement } from "react";
import styles from "./ingredient-details.module.css";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { TIngredient } from "../../../services/types/data";

type TNutritionProps = {
  children: string;
  data: number | string;
};
type init = keyof TIngredient;

export const IngredientsDetails = (): JSX.Element => {
  //@ts-ignore
  const items: TIngredient[] = useSelector((store) => store.cart.items);
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
  return (
    <div>
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

function Nutritions({ data, children }: TNutritionProps): JSX.Element {
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
