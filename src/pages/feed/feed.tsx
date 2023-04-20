import React from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./feed.module.css";

export function FeedPage(): JSX.Element {
  return (
    <section className={styles.content}>
      <div className={styles.list}>
        <div className={styles.card}>
          <div className={styles.order_id}>
            <p className="text text_type_digits-default">#04234</p>
            <p className="text text_type_main-default text_color_inactive">
              сегодня 12:30
            </p>
          </div>
          <p className="text text_type_main-medium">В разработке</p>
          <div className={styles.ingred_price}>
            <div className={styles.ingredients}>
              <div className={styles.preview}>
                <div className={styles.illustration}>
                  <img className={styles.img} />
                </div>
              </div>
            </div>
            <div className={styles.price}>
              <p className="text text_type_digits-default">1234567890</p>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.order_id}>
            <p className="text text_type_digits-default">#04234</p>
            <p className="text text_type_main-default text_color_inactive">
              сегодня 12:30
            </p>
          </div>
          <p className="text text_type_main-medium">В разработке</p>
          <div className={styles.ingred_price}>
            <div className={styles.ingredients}>
              <div className={styles.preview}>
                <div className={styles.illustration}>
                  <img className={styles.img} />
                </div>
              </div>
            </div>
            <div className={styles.price}>
              <p className="text text_type_digits-default">1234567890</p>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.order_id}>
            <p className="text text_type_digits-default">#04234</p>
            <p className="text text_type_main-default text_color_inactive">
              сегодня 12:30
            </p>
          </div>
          <p className="text text_type_main-medium">В разработке</p>
          <div className={styles.ingred_price}>
            <div className={styles.ingredients}>
              <div className={styles.preview}>
                <div className={styles.illustration}>
                  <img className={styles.img} />
                </div>
              </div>
            </div>
            <div className={styles.price}>
              <p className="text text_type_digits-default">1234567890</p>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.stats}>
        <div className={styles.orders_board}>
          <div className={styles.done}>
            <p>готовы:</p>
          </div>
          <div className={styles.done}>
            <p>в работе:</p>
          </div>
        </div>
        <div className={styles.complited}>
          <p className={styles.text}>Выполнено за все время:</p>
          <p className="text text_type_digits-large">28 752</p>
        </div>
        <div className={styles.complited}>
          <p className={styles.text}>Выполнено за сегодня:</p>
          <p className="text text_type_digits-large">138</p>
        </div>
      </div>
    </section>
  );
}
