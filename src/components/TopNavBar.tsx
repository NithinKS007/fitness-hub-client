import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

const TopNavBar: React.FC = () => {
  return (
    <nav className="bg-black bg-opacity-30 backdrop-blur-sm text-white w-full p-6 shadow-md fixed top-0 left-0 z-10">
      <div className="flex justify-end items-center w-full">
        <div className="flex space-x-6 mr-4">
          <Link
            to="/"
            className="hover:bg-gray-800 px-4 py-2 rounded transition duration-300"
          >
            Home
          </Link>
          <Link
            to="/findTrainers"
            className="hover:bg-gray-800 px-4 py-2 rounded transition duration-300"
          >
            Find Trainers
          </Link>
          <Link
            to="/enrollAsCoach"
            className="hover:bg-gray-800 px-4 py-2 rounded transition duration-300"
          >
            Enroll As a Coach
          </Link>
          <Link
            to="/about"
            className="hover:bg-gray-800 px-4 py-2 rounded transition duration-300"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="hover:bg-gray-800 px-4 py-2 rounded transition duration-300"
          >
            Contact us
          </Link>
        </div>
        <Link to="/profile">
          <FaUserCircle size={32} />
        </Link>
      </div>
    </nav>
  );
};

export default TopNavBar;
