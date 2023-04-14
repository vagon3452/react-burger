import React, { useRef } from "react";
import PropTypes from "prop-types";
import { useDrag, useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import styles from "./burger-constructor.module.css";
import { DELETE_ITEM } from "../../../services/actions/create-burger";
import { uuidBurgerPropTypes } from "../../../utils/prop-types";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

export const Ingredients = ({ data, index, moveCard }) => {
  const { name, price, image, uuid } = data;

  const ref = useRef(null);

  const dispatch = useDispatch();

  const deleteItem = () => {
    dispatch({ type: DELETE_ITEM, uuid });
  };
  const [{ isDragging }, drag] = useDrag(
    {
      type: "ingredient",

      item: () => {
        return { uuid, index };
      },

      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    },
    [data, index]
  );

  const opacity = isDragging ? 0 : 1;

  const [, drop] = useDrop({
    accept: "ingredient",

    hover: (item, monitor) => {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();

      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveCard(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
  });

  drag(drop(ref));

  return (
    <section className={`${styles.ingridient}`} style={{ opacity }} ref={ref}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <DragIcon />
      </div>

      <ConstructorElement
        text={name}
        price={price}
        handleClose={deleteItem}
        thumbnail={image}
      />
    </section>
  );
};

Ingredients.propTypes = {
  data: uuidBurgerPropTypes.isRequired,
  index: PropTypes.number.isRequired,
  moveCard: PropTypes.func.isRequired,
};

export default Ingredients;
