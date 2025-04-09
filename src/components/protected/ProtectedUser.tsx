import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedUser: React.FC = () => {
  const user = useSelector((state: RootState) => state?.auth?.user);

  return !user ? (
    <Navigate to="/" />
  ) : user.role !== "user" ? (
    <Navigate to="/" />
  ) : (
    <Outlet />
  );
};

export default ProtectedUser;
