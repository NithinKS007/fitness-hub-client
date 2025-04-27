import React from "react";
import { FaUser, FaArrowLeft } from "react-icons/fa";
import AccountDropDown from "../AccountDropDown";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import useSignOut from "../../hooks/useSignOut";
import { Link } from "react-router-dom";

const TopNavbar: React.FC = () => {
  const { user, trainer, admin } = useSelector(
    (state: RootState) => state.auth
  );
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

  const navigate = useNavigate();
  const redirectToLogin = () => {
    navigate("/sign-in");
  };
  const handleSignOut = useSignOut();

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-sm px-6 py-3 z-10">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center space-x-52 w-2/3">
          <Link to="/find-trainer" >
            <div className="flex items-center justify-center w-10 h-8 rounded-full bg-gray-200">
              <FaArrowLeft className="text-xl text-gray-700" />
            </div>
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <div className="w-10 h-7 rounded-full  flex items-center justify-center">
            <FaUser className="text-white" />
            <AccountDropDown
              authPerson={getAuthPerson()}
              redirectToLogin={redirectToLogin}
              signout={handleSignOut}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopNavbar;
