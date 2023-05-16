import React, { useState, useCallback } from "react";
import { v1 as uuid } from "uuid";
import styles from "./burger-constructor.module.css";
import { useDrop } from "react-dnd";
import { postItems } from "../../../services/actions/checkout";
import Modal from "../../modal/modal";
import { totalPriceSelector } from "../../../common/total-price";
import image from "../../../images/done.png";
import { CLEAR_ORDER } from "../../../services/constants/index";
import { ingredientType } from "../../../services/types/data";
import { Loader } from "./loading/loader";
import {
  TContructorIngredient,
  TIngredient,
} from "../../../services/types/data";
import {
  ADD_BUN,
  ADD_INGREDIENTS,
  REPLACE,
} from "../../../services/constants/index";
import { Bun } from "./buns";
import { Ingredients } from "./ingredients";

import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { OrderDetails } from "./order-details";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "../../../services/store";

export const BurgerConstructor = (): JSX.Element => {
  const { type_bun } = ingredientType;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const total = useSelector(totalPriceSelector);

  const handleDrag = (bun: TIngredient) => {
    dispatch({ type: ADD_BUN, payload: { ...bun, uuid: uuid() } });
  };

  const ingredientDrag = useCallback(
    (ingredient: TIngredient) => {
      dispatch({
        type: ADD_INGREDIENTS,
        payload: { ...ingredient, uuid: uuid() },
      });
    },
    [dispatch]
  );

  const { bun, ingredients, order, isLoading, hasError, user } = useSelector(
    (state) => ({
      bun: state.create.bun,
      user: state.user.user,
      ingredients: state.create.ingredients,
      order: state.checkout.order,
      isLoading: state.checkout.isLoading,
      hasError: state.checkout.hasError,
    })
  );

  const moveCard = (dragIndex: number, hoverIndex: number): void => {
    const dragCard = ingredients[dragIndex];
    const newCards = [...ingredients];

    newCards.splice(dragIndex, 1);

    newCards.splice(hoverIndex, 0, dragCard);

    dispatch({ type: REPLACE, payload: newCards });
  };

  const [openModal, setOpenModal] = useState(false);
  const closeModal = () => {
    setOpenModal(false);
    dispatch({ type: CLEAR_ORDER });
  };

  const modal = () => {
    if (!!total.ingredients) {
      if (!user) {
        navigate("/login");
      }
      dispatch(postItems({ ingredients: total.ingredients }));
      setOpenModal(true);
    }
  };

  const [, drop] = useDrop<TIngredient>({
    accept: "items",
    drop(items) {
      items.type !== type_bun && ingredientDrag(items);
    },
  });

  return (
    <section className={styles.container}>
      <div className={styles.burgerComponents} ref={drop}>
        <Bun bun={bun} handleDrag={handleDrag} pos={"(верх)"} type={"top"} />

        {ingredients.length ? (
          ingredients.map((item: TContructorIngredient, index: number) => (
            <Ingredients
              key={item.uuid}
              moveCard={moveCard}
              index={index}
              data={item}
            />
          ))
        ) : (
          <div className={styles.modal} style={{ paddingLeft: "24px" }}>
            Выберите начинку
          </div>
        )}

        <Bun bun={bun} handleDrag={handleDrag} pos={"(низ)"} type={"bottom"} />
      </div>

      <div className={styles.info}>
        <p className="text text_type_main-medium">{total.totalPrice}</p>
        <CurrencyIcon type="primary" />
        <Button htmlType="button" type="primary" size="large" onClick={modal}>
          Оформить заказ
        </Button>
      </div>
      {openModal && isLoading && (
        <Modal onClose={closeModal}>
          <Loader />
        </Modal>
      )}
      {openModal && hasError && "что-то пошло не так"}
      {openModal && !isLoading && !hasError && order?.number && (
        <Modal onClose={closeModal}>
          <OrderDetails image={image} number={order.number} />
        </Modal>
      )}
    </section>
  );
};
