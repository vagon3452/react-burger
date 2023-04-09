import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Protected = ({ onlyUnAuth = false, component }) => {
  const { user, isAuthChecked } = useSelector((store) => ({
    user: store.user.user,
    isAuthChecked: store.user.isAuthChecked,
  }));

  const location = useLocation();

  if (!isAuthChecked) {
    return null;
  }
  if (onlyUnAuth && user) {
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} />;
  }
  if (!onlyUnAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return component;
};

export const OnlyAuth = Protected;
export const OnlyUnAuth = (props) => <Protected onlyUnAuth={true} {...props} />;
