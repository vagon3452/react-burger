import React, { useState } from "react";
import {
  addBunToConstructor,
  addToConstructor,
  replaceIndex,
} from "../../../services/constructor/actions";
import styles from "./burger-constructor.module.css";
import { useDrop } from "react-dnd";
import { postItems } from "../../../services/order/actions";
import Modal from "../../modal/modal";
import { totalPriceSelector } from "../../../services/constructor/selectors";
import image from "../../../images/done.png";
import { CLEAR_ORDER } from "../../../services/order/constants";
import { Loader } from "./loading/loader";
import { Bun } from "./buns";
import { Ingredients } from "./ingredients";
import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { OrderDetails } from "./order-details";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "../../../services/store";
import {
  TIngredient,
  ingredientType,
} from "../../../services/ingredients/types";
import {
  create_getBun,
  create_getIngredients,
} from "../../../services/constructor/selectors";
import {
  orders_getOrder,
  orders_isLoading,
  orders_hasError,
} from "../../../services/order/selectors";
import { ACCESS_TOKEN_KEY } from "../../../services/auth/constants";

export const BurgerConstructor = (): JSX.Element => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const bun = useSelector(create_getBun);
  const ingredients = useSelector(create_getIngredients);
  const order = useSelector(orders_getOrder);
  const isLoading = useSelector(orders_isLoading);
  const hasError = useSelector(orders_hasError);
  const total = useSelector(totalPriceSelector);

  const handleDrag = (bun: TIngredient) => {
    dispatch(addBunToConstructor(bun));
  };

  const ingredientDrag = (ingredient: TIngredient) => {
    dispatch(addToConstructor(ingredient));
  };

  const moveCard = (dragIndex: number, hoverIndex: number): void => {
    const dragCard = ingredients[dragIndex];
    const newCards = [...ingredients];

    newCards.splice(dragIndex, 1);

    newCards.splice(hoverIndex, 0, dragCard);

    dispatch(replaceIndex(newCards));
  };

  const [openModal, setOpenModal] = useState(false);

  const closeModal = () => {
    setOpenModal(false);
    dispatch({ type: CLEAR_ORDER });
  };
  const modal = () => {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);

    if (total.ingredients.length) {
      if (!token) {
        navigate("/login");
      }
      dispatch(postItems({ ingredients: total.ingredients }));
      setOpenModal(true);
    }
  };

  const [, drop] = useDrop<TIngredient>({
    accept: "items",
    drop(items) {
      items.type !== ingredientType.type_bun && ingredientDrag(items);
    },
  });

  return (
    <section className={styles.container}>
      <div className={styles.burgerComponents}>
        <Bun bun={bun} handleDrag={handleDrag} pos={"(верх)"} type={"top"} />

        <div
          className={styles.ingredients}
          ref={drop}
          data-test="ingredients-area"
        >
          {ingredients.length ? (
            ingredients.map((item, index) => (
              <Ingredients
                key={item.uuid}
                moveCard={moveCard}
                index={index}
                data={item}
              />
            ))
          ) : (
            <div className={styles.ingredient_background}>Выберите начинку</div>
          )}
        </div>
        <Bun bun={bun} handleDrag={handleDrag} pos={"(низ)"} type={"bottom"} />
      </div>

      <div className={styles.info} data-test="button-order">
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
