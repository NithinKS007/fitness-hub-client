import React from "react";
import TopNavBar from "../components/TopNavBar";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Footer from "../components/Footer";

interface ULwithNavFooterProps {
  children: React.ReactNode; 
}
const ULwithNavFooter: React.FC<ULwithNavFooterProps> = ({ children }) => {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <div className="bg-gray-50 min-h-screen">
      <TopNavBar user={user} />
      {children}
      <Footer/>
    </div>
  );
};

export default ULwithNavFooter;
