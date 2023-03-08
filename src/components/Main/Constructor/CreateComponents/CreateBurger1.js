import React, { useState } from "react";
import PropTypes from "prop-types";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";

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

function CreateBurger1({ data }) {
  const [state, setState] = useState({...data });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: "568px",
        height: "80px",
      }}
    >
      <div style={{ width: "536px", paddingLeft: "24px" }}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text="Краторная булка N-200i (верх)"
          price={state.price}
          thumbnail={state.image}
        />
      </div>
    </div>
  );
}
CreateBurger1.propTypes = {
  data: burgerPropTypes,
};

export default CreateBurger1;
