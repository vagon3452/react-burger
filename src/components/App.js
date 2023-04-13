import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { OnlyAuth, OnlyUnAuth } from "./protected-route";
import { checkUserAuth } from "../services/actions/user";
import { getItems } from "../services/actions/cart";
import { AppHeader } from "./header/app-header";
import {
  Main,
  LoginPage,
  ProfilePage,
  RegisterPage,
  ForgotPass,
  ResetPassword,
  NotMatch404,
  FeedPage,
  OrdersPage,
  IndexPage,
} from "../pages";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { IngredientsDetails } from "./main/ingredients/ingredient-details";
import Modal from "./modal/modal";

function App() {
  const { isLoading, hasError } = useSelector((state) => ({
    isLoading: state.cart.isLoading,
    hasError: state.cart.hasError,
  }));
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
  return isLoading ? (
    <>"Загрузка..."</>
  ) : hasError ? (
    <> "что-то пошло не так" </>
  ) : (
    <>
      <AppHeader />
      <Routes location={background || location}>
        <Route path="/" element={<Main />} />
        <Route path="*" element={<NotMatch404 />} />
        <Route
          path="/ingredients/:ingredientId"
          element={<IngredientsDetails />}
        />

        <Route
          path="/login"
          element={<OnlyUnAuth component={<LoginPage />} />}
        />
        <Route path="/feed" element={<OnlyAuth component={<FeedPage />} />} />
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
        >
          <Route path="" element={<OnlyAuth component={<IndexPage />} />} />
          <Route
            path="orders"
            element={<OnlyAuth component={<OrdersPage />} />}
          />
        </Route>
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
