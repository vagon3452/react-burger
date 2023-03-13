import React, { useEffect, useState } from "react";

import AppHeader from "./Header/AppHeader";
import BurgerConstructor from "./Main/Constructor/BurgerConstructor";
import BurgerIngredients from "./Main/Ingridients/BurgerIngredients";
import {BurgerContext} from "./Services/BurgerContext";
import styles from "./App.module.css";

function App() {
  const url = "https://norma.nomoreparties.space/api/ingredients";

  const [state, setState] = useState({
    isLoading: false,
    hasError: false,
    data: [],
  });

  useEffect(() => {
    setState({ ...state, isLoading: true, hasError: false });
    fetch(url)
      .then((res) => res.json())
      .then((json) =>
        setState({
          ...state,
          isLoading: false,
          hasError: false,
          data: json.data,
        })
      )
      .catch((err) => setState({ ...state, isLoading: false, hasError: true }));
  }, []);
  const { data, isLoading, hasError } = state;
  return (
    <div className={styles.app}>
      <AppHeader />
      {isLoading && "Loading..."}
      {hasError && "error"}
      {!isLoading && !hasError && data.length && (
        <>
          <BurgerContext.Provider value={{data}}>
            <BurgerConstructor />
            <BurgerIngredients  />
          </BurgerContext.Provider>
        </>
      )}
    </div>
  );
}

export default App;
