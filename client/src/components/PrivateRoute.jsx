import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { currentUser } = useSelector((state) => state.user);

  return currentUser ? children || <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
