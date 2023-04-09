import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { OnlyAuth, OnlyUnAuth } from "./protected-route";
import { checkUserAuth } from "../services/actions/user";
import { getItems } from "../services/actions/cart";
import {
  Main,
  LoginPage,
  ProfilePage,
  RegisterPage,
  ForgotPass,
  ResetPassword,
} from "../pages";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { IngredientsDetails } from "./main/ingredients/ingredient-details";
import Modal from "./modal/modal";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;
  const handleModalClose = () => {
    navigate(-1);
  };
  useEffect(() => {
    dispatch(getItems());
  }, [dispatch]);

  useEffect(() => {
    dispatch(checkUserAuth());
  }, []);
  return (
    <>
      <Routes location={background || location}>
        <Route path="/" element={<Main />} />
        <Route
          path="/ingredients/:ingredientId"
          element={<IngredientsDetails />}
        />
        <Route
          path="/login"
          element={<OnlyUnAuth component={<LoginPage />} />}
        />
        <Route
          path="/register"
          element={<OnlyUnAuth component={<RegisterPage />} />}
        />
        <Route
          path="/forgot-password"
          element={<OnlyUnAuth component={<ForgotPass />} />}
        />
        <Route
          path="/reset-password"
          element={<OnlyUnAuth component={<ResetPassword />} />}
        />
        <Route
          path="/profile"
          element={<OnlyAuth component={<ProfilePage />} />}
        />
        <Route path="*" element={<h1>404</h1>} />
      </Routes>
      {background && (
        <Routes>
          <Route
            path="/ingredients/:ingredientId"
            element={
              <Modal onClose={handleModalClose}>
                <IngredientsDetails />
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  );
}

export default App;
