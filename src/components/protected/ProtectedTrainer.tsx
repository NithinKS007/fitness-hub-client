import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedTrainer: React.FC = () => {
  const { trainer, isAuthenticated } = useSelector(
    (state: RootState) => state?.auth
  );

  return !trainer || !isAuthenticated ? (
    <Navigate to="/" />
  ) : trainer.role !== "trainer" ? (
    <Navigate to="/" />
  ) : (
    <Outlet />
  );
};

export default ProtectedTrainer;
