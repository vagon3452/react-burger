import React from "react";
import { BurgerConstructor } from "../../components/main/constructor/burger-constructor";
import { BurgerIngredients } from "../../components/main/ingredients/burger-ingredients";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

export const Main = (): JSX.Element => {
  return (
    <DndProvider backend={HTML5Backend}>
      <BurgerConstructor />
      <BurgerIngredients />
    </DndProvider>
  );
};
