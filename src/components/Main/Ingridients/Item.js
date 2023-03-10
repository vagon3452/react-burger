import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";

const burgerPropTypes = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  calories: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  image_mobile: PropTypes.string.isRequired,
  image_large: PropTypes.string.isRequired,
  __v: PropTypes.number.isRequired,
}).isRequired;

function Item({ data }) {

  return (
    <div style={{ position: "relative", flexGrow: 0, width: "272px", height: "208px" }}>
      <Counter count={0} size="default" />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <img src={data.image} />
        <div style={{ height: "24px", alignSelf: "center" }}>
          {data.price} <CurrencyIcon type="primary" />
        </div>
        <div style={{ height: "48px" }}>
          <p style={{ textAlign: "center" }}>{data.name}</p>
        </div>
      </div>
    </div>
  );
}
Item.propTypes = {
  data: burgerPropTypes,
};

export default Item;
