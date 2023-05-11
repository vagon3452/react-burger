import React, { useEffect } from "react";
import styles from "./orders.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "../../services/store";
import { profileFeedConnect, profileFeedWsDisconnect } from "../../services/actions/profile-feed";
import { ACCESS_TOKEN_KEY } from "../../services/constants";

export function OrdersPage(): JSX.Element {
  const dispatch = useDispatch()
  useEffect(()=>{
    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY)?.split(" ")[1]
    const url = `wss://norma.nomoreparties.space/orders?token=${accessToken}`
    dispatch(profileFeedConnect(url))

    return () => {
      dispatch(profileFeedWsDisconnect())
    }
  },[])
const {something} = useSelector(state => ({something:state.profileFeed.something}))
console.log(something)
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
    </section>
  );
}
