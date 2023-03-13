import React, { useMemo, useContext } from "react";
import styles from "./BurgerIngredients.module.css";
import Item from "./item/Item";
import PropTypes from "prop-types";
import { BurgerContext } from "../../Services/BurgerContext";

const burgerPropTypes = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  calories: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  image_mobile: PropTypes.string.isRequired,
  image_large: PropTypes.string.isRequired,
  __v: PropTypes.number.isRequired,
}).isRequired;

const type_bun = "bun";
const type_sauce = "sauce";
const type_main = "main";

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(burgerPropTypes).isRequired,
};

export default function BurgerIngredients() {
  const {data} = useContext(BurgerContext)
  
  const bun = useMemo(
    () => data.filter((item) => item.type === type_bun),
    [data]
  );
  const saus = useMemo(
    () => data.filter((item) => item.type === type_sauce),
    [data]
  );
  const main = useMemo(
    () => data.filter((item) => item.type === type_main),
    [data]
  );

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h2>Соберите бургер</h2>
      </div>
      <div className={styles.tabs}>
        <div className={styles.tab}>Булки</div>
        <div className={styles.tab}>Соусы</div>
        <div className={styles.tab}>Начинки</div>
      </div>
      <div className={styles.ingridients}>
        <div className={styles.headline}>
          <h2>Булки</h2>
        </div>
        <div className={styles.columnsPuns}>
          {bun.map((item) => (
            <Item key={item._id} data={item} />
          ))}
        </div>
        <div className={styles.headline}>
          <h2>Соусы</h2>
        </div>
        <div className={styles.columnsSaus}>
          {saus.map((item) => (
            <Item key={item._id} data={item} />
          ))}
        </div>
        <div className={styles.headline}>
          <h2>Начинка</h2>
        </div>
        <div className={styles.columnsContent}>
          {main.map((item) => (
            <Item key={item._id} data={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
