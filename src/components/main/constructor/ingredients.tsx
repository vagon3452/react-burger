import React, { useRef, FC } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import styles from "./burger-constructor.module.css";
import { DELETE_ITEM } from "../../../services/actions/create-burger";
import { TContructorIngredient } from "../../../services/types/data";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

type TIngredientsProps = {
  data: TContructorIngredient;
  index: number;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
};
type TDragElement = {
  uuid: string;
  index: number;
};
type TDragCollected = {
  isDragging: boolean;
};

export const Ingredients: FC<TIngredientsProps> = ({
  data,
  index,
  moveCard,
}): JSX.Element => {
  const { name, price, image, uuid } = data;

  const ref = useRef<HTMLDivElement | null>(null);

  const dispatch = useDispatch();

  const deleteItem = () => {
    dispatch({ type: DELETE_ITEM, uuid });
  };
  const [{ isDragging }, drag] = useDrag<TDragElement, unknown, TDragCollected>(
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

  const [, drop] = useDrop<TDragElement>({
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
      const hoverBoundingRect = ref.current.getBoundingClientRect();

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();
      if (!clientOffset) {
        return;
      }
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
        <DragIcon type={"secondary"} />
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

export default Ingredients;
