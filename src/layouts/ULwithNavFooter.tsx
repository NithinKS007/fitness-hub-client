import React from "react";
import TopNavBar from "../components/TopNavBar";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

const ULwithNavFooter: React.FC = () => {
  const user = useSelector((state: RootState) => state?.auth?.user);
  const trainer = useSelector((state: RootState) => state?.auth?.trainer);
  const admin = useSelector((state: RootState) => state?.auth?.admin);

  const getAuthPerson = () => {
    if (user) {
      return user;
    } 
    if (trainer) {
      return trainer;
    }
    if (admin) {
      return admin
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <TopNavBar authPerson={getAuthPerson()} />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default ULwithNavFooter;
