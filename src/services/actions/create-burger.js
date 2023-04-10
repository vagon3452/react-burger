export const ADD_INGREDIENTS = "ADD_INGREDIENTS";
export const ADD_BUN = "ADD_BUN";
export const DELETE_ITEM = "DELETE_ITEM";
export const REPLACE = "REPLACE";

export const moveCard = (dragIndex, hoverIndex) => {
  return function (dispatch) {
    dispatch({ type: "INDEX", dragIndex: dragIndex });
    dispatch({ type: "INDEX2", hoverIndex: hoverIndex });
    dispatch({ type: REPLACE });
  };
};
