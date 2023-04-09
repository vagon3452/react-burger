import React from "react";
import BurgerConstructor from "../components/main/constructor/burger-constructor";
import BurgerIngredients from "../components/main/ingredients/burger-ingredients";
import { AppHeader } from "../components/header/app-header";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

export const Main = () => {
  const styles = {
    position: "relative",
    width: "2000px",
    height: "1080px",
    background: "#131316",
  };
  return (
    <section style={styles}>
      {/* <AppHeader /> */}
      <DndProvider backend={HTML5Backend}>
        <BurgerConstructor />
        <BurgerIngredients />
      </DndProvider>
    </section>
  );
};
