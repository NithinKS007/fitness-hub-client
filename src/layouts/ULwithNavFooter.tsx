import React, { useEffect } from "react";
import TopNavBar from "../components/TopNavBar";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Footer from "../components/Footer";
import { Outlet, useLocation } from "react-router-dom";

const ULwithNavFooter: React.FC = () => {
  const user = useSelector((state: RootState) => state?.auth?.user);
  const trainer = useSelector((state: RootState) => state?.auth?.trainer);
  const admin = useSelector((state: RootState) => state?.auth?.admin);

  const location = useLocation();

  const getAuthPerson = () => {
    if (user) {
      return user;
    }

    if (trainer) {
      return trainer;
    }
    if (admin) {
      return admin;
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="bg-white min-h-screen flex flex-col w-full">
      <TopNavBar authPerson={getAuthPerson()} />
      <main className="pt-18 overflow-auto w-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default ULwithNavFooter;
