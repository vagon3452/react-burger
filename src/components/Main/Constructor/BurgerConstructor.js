import React, { useMemo, useState } from "react";
import styles from "./BurgerConstructor.module.css";
import PropTypes from "prop-types";
import ModalFinish from "../../Modal/ModalFinish/ModalFinish";
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

const type_bun = "bun"

function BurgerConstructor({ data }) {
  const [openModal, setOpenModal] = useState(false);
  const [state, setState] = useState([]);
  
  const bun = useMemo(
    () => data.find((item) => item.type === type_bun),
    [data]);

  const ingridients = useMemo(
    () => data.filter((item) => item.type !== type_bun),
    [data]
  );

  useMemo(() => {
    setState([...ingridients, bun, bun]);
  }, [ingridients, bun]);

  const result = useMemo(
    () => state.reduce((acc, item) => (acc += item.price), 0),
    [state]
  );

  function modal() {
    setOpenModal(true);
  }
  return (
    <div className={styles.container}>
      <div className={styles.burgerComponents}>
        <div className={styles.ingridient} style={{ paddingLeft: "24px" }}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${bun.name} (верх)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>
        {ingridients.map((item) => (
          <div className={styles.ingridient} key={item._id}>
            <div style={{ alignSelf: "center" }}>
              <DragIcon type="primary" />
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
            text={`${bun.name} (низ)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>
      </div>

      <div className={styles.info}>
        <p className="text text_type_main-medium">{result}</p>
        <CurrencyIcon type="primary" />
        <Button htmlType="button" type="primary" size="large" onClick={modal}>
          Оформить заказ
        </Button>
      </div>
      {openModal && <ModalFinish closeModal={setOpenModal} />}
    </div>
  );
}

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(burgerPropTypes).isRequired,
};

export default BurgerConstructor;
