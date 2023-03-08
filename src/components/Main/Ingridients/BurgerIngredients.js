import React from "react";
import styles from "./BurgerIngredients.module.css";
import Item from "./Items/Item";
import PropTypes from "prop-types";

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

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(burgerPropTypes).isRequired
};
export default function BurgerIngredients({ data }) {
  const bun = data.filter((item) => item.type === "bun");
  const saus = data.filter((item) => item.type === "sauce");
  const main = data.filter((item) => item.type === "main");

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
            <Item key={item._id} data={item}/>
          ))}
        </div>
        <div className={styles.headline}>
          <h2>Соусы</h2>
        </div>
        <div className={styles.columnsSaus}>
        {saus.map((item) => (
            <Item key={item._id} data={item}/>
          ))}
        </div>
        <div className={styles.headline}>
          <h2>Начинка</h2>
        </div>
        <div className={styles.columnsContent}>
        {main.map((item) => (
            <Item key={item._id} data={item}/>
          ))}
            
            </div>
      </div>
    </div>
  );
}
