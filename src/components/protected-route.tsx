import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import React, { FC, ReactElement } from "react";

type ProtectedRouteProps = {
  component: ReactElement;
  onlyUnAuth?: boolean;
};

const Protected = ({
  onlyUnAuth = false,
  component,
}: ProtectedRouteProps): JSX.Element => {
  //@ts-ignore
  const user = useSelector((state) => state.user.user);
  //@ts-ignore
  const isAuthChecked = useSelector((state) => state.user.isAuthChecked);

  const location = useLocation();

  if (!isAuthChecked) {
    return <div>loading</div>;
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
export const OnlyUnAuth = (props: ProtectedRouteProps) => (
  <Protected onlyUnAuth={true} {...props} />
);
