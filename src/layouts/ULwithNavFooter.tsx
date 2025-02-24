import React from "react";
import TopNavBar from "../components/TopNavBar";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

const ULwithNavFooter: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <TopNavBar user={user} />
      <main className="flex-1">
        <Outlet /> 
      </main>
      <Footer />
    </div>
  );
};

export default ULwithNavFooter;
