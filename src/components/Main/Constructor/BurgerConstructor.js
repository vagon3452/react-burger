import React from "react";
import styles from "./BurgerConstructor.module.css";
import PropTypes from "prop-types";
import ModalFinish from "../../Modal/ModalFinish/ModalFinish"
import {
  CurrencyIcon,
  Button,
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

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

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(burgerPropTypes).isRequired
};

function BurgerConstructor({ data }) {
  const [openModal, setOpenModal] = React.useState(false)
  const bun = data.filter((item) => item.type === "bun");
  const ingridients = data.filter((item) => item.type !== "bun");

  function modal() {
    setOpenModal(true)
  }
  return (
    <div className={styles.container}>
      <div className={styles.burgerComponents}>
        <div className={styles.ingridient} style={{ paddingLeft: "24px" }}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${bun[0].name} (верх)`}
            price={bun[0].price}
            thumbnail={bun[0].image}
          />
        </div>
        {ingridients.map(item => (
          <div className={styles.ingridient} key={item._id}>
            <div style={{ alignSelf: "center" }} >
              <DragIcon type="primary"/>
            </div>
            <ConstructorElement
              type={item.type}
              text={item.name}
              price={item.price}
              thumbnail={item.image}
              
            />
          </div>
        ))}
        <div className={styles.ingridient} style={{ paddingLeft: "24px" }}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${bun[0].name} (низ)`}
            price={bun[0].price}
            thumbnail={bun[0].image}
          />
        </div>
      </div>

      <div className={styles.info}>
        <p className="text text_type_main-medium">610</p>
        <CurrencyIcon type="primary" />
        <Button htmlType="button" type="primary" size="large" onClick={modal}>
          Оформить заказ
        </Button>
      </div>
      {openModal && <ModalFinish closeModal={setOpenModal}/>}
    </div>
  );
}

export default BurgerConstructor