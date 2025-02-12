import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useState, useEffect } from "react";

const TopNavBar: React.FC = () => {
  // State to track the scroll position and apply the shadow and blur
  const [hasScrolled, setHasScrolled] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setHasScrolled(true);
    } else {
      setHasScrolled(false);
    }
  };

  // Set up the event listener on component mount
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`${
        hasScrolled ? "shadow-lg backdrop-blur-lg" : "backdrop-blur-none"
      } bg-white bg-opacity-50 text-black w-full p-4 fixed top-0 left-0 z-10 transition-all duration-300`}
    >
      <div className="flex justify-end items-center w-full">
        <div className="flex space-x-6 mr-4">
          <Link
            to="/"
            className="hover:text-gray-800 font-bold px-4 py-2 rounded transition duration-300"
          >
            Home
          </Link>
          <Link
            to="/findTrainers"
            className="hover:text-gray-800 font-bold px-4 py-2 rounded transition duration-300"
          >
            Find Trainers
          </Link>
          <Link
            to="/trainer-entrollment"
            className="hover:text-gray-800 font-bold px-4 py-2 rounded transition duration-300"
          >
            Enroll As a Coach
          </Link>
          <Link
            to="/about"
            className="hover:text-gray-800 font-bold px-4 py-2 rounded transition duration-300"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="hover:text-gray-800 font-bold px-4 py-2 rounded transition duration-300"
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
