import React from "react";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import AppHeader from "./header/app-header";
import BurgerConstructor from "./main/constructor/burger-constructor";
import BurgerIngredients from "./main/ingredients/burger-ingredients";
import styles from "./App.module.css";

function App() {
  return (
    <div className={styles.app}>
      <AppHeader />
      <DndProvider backend={HTML5Backend}>
        <BurgerConstructor />
        <BurgerIngredients />
      </DndProvider>
    </div>
  );
}

export default App;
