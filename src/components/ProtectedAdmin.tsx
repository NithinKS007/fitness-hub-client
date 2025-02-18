import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../redux/store";

const ProtectedAdmin: React.FC = () => {
  const admin = useSelector((state: RootState) => state?.auth?.user)

  return !admin ? (
    <Navigate to="/" />
  ) : admin.role !== "admin" ? (
    <Navigate to="/" />
  ) : (
    <Outlet />
  );
};

export default ProtectedAdmin;
