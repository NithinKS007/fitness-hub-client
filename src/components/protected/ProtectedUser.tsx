import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedUser: React.FC = () => {
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state?.auth
  );

  return !user || !isAuthenticated ? (
    <Navigate to="/" />
  ) : user.role !== "user" ? (
    <Navigate to="/" />
  ) : (
    <Outlet />
  );
};

export default ProtectedUser;
