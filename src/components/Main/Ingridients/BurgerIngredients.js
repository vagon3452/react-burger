import React from "react";
import styles from "./BurgerIngredients.module.css";
import Item1 from "./Items/Item1";
import Item2 from "./Items/Item2";
import Item3 from "./Items/Item3";
import Item4 from "./Items/Item4";
import Item5 from "./Items/Item5";
import Item6 from "./Items/Item6";
import Item7 from "./Items/Item7";
import Item8 from "./Items/Item8";
import Item9 from "./Items/Item9";
import Item10 from "./Items/Item10";
import Item11 from "./Items/Item11";
import Item12 from "./Items/Item12";
import Item13 from "./Items/Item13";
import Item14 from "./Items/Item14";


export default function BurgerIngredients() {
  const url = "https://norma.nomoreparties.space/api/ingredients";

  const [state, setState] = React.useState({
    isLoading: false,
    hasError: false,
    data: [],
  });

  React.useEffect(() => {
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
    <div className={styles.container}>
      {isLoading && "Loading..."}
      {hasError && "error"}
      {!isLoading && !hasError && data.length && (
        <>
          <div className={styles.title}>
            <h2>Соберите бургер</h2>
          </div>
          <div className={styles.tabs}>
            <div className={styles.tab}>Булки</div>
            <div className={styles.tab}>Соусы</div>
            <div className={styles.tab}>Начинки</div>
          </div>
          <div className={styles.ingridients}>
            <div className={styles.headline}>
              <h2>Булки</h2>
            </div>
            <div className={styles.columnsPuns}>
              <div className={styles.columns}>
                <Item1 data={data[0]} />
              </div>
              <div className={styles.columns}>
                <Item2 data={data[1]} />
              </div>
            </div>
            <div className={styles.headline}>
              <h2>Соусы</h2>
            </div>
            <div className={styles.columnsSaus}>
              <div className={styles.columns}>
                <div className={styles.item}>
                  <Item3 data={data[6]} />
                </div>
                <div className={styles.item}>
                  <Item5 data={data[7]} />
                </div>
              </div>
              <div className={styles.columns}>
                <div className={styles.item}>
                  <Item4 data={data[8]} />
                </div>
                <div className={styles.item}>
                  <Item6 data={data[9]} />
                </div>
              </div>
            </div>
            <div className={styles.headline}>
              <h2>Начинка</h2>
            </div>
            <div className={styles.columnsContent}>
              <div className={styles.columns}>
                <div className={styles.item}>
                  <Item7 data={data[2]} />
                </div>
                <div className={styles.item}>
                  <Item8 data={data[3]} />
                </div>
              </div>
              <div className={styles.columns}>
                <div className={styles.item}>
                  <Item9 data={data[4]} />
                </div>
                <div className={styles.item}>
                  <Item10 data={data[5]} />
                </div>
              </div>
              <div className={styles.columns}>
                <div className={styles.item}>
                  <Item11 data={data[11]} />
                </div>
                <div className={styles.item}>
                  <Item12 data={data[12]} />
                </div>
              </div>
              <div className={styles.columns}>
                <div className={styles.item}>
                  <Item13 data={data[10]} />
                </div>
                <div className={styles.item}>
                  <Item14 data={data[13]} />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
