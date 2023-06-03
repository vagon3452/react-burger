import React, { useRef, FC, memo } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import styles from "./ingredients.module.css";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { TContructorIngredient } from "../../../services/ingredients/types";
import { deleteIngredient } from "../../../services/constructor/actions";

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

export const Ingredients: FC<TIngredientsProps> = memo(
  ({ data, index, moveCard }): JSX.Element => {
    const { name, price, image, uuid } = data;

    const ref = useRef<HTMLDivElement | null>(null);

    const dispatch = useDispatch();

    const deleteItem = () => {
      dispatch(deleteIngredient(uuid));
    };
    const [{ isDragging }, drag] = useDrag<
      TDragElement,
      unknown,
      TDragCollected
    >(
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
      <section className={styles.ingredient} style={{ opacity }} ref={ref}>
        <div className={styles.icon}>
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
  }
);

export default Ingredients;
