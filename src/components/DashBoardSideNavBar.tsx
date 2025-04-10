import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Tooltip } from "@mui/material";

interface NavItem {
  icon: JSX.Element;
  text: string;
  path: string;
}

interface SideNavbarProps {
  navItems: NavItem[];
}

const SideNavbar: React.FC<SideNavbarProps> = ({ navItems }) => {
  const location = useLocation();

  return (
    <nav className="fixed bg-white w-18 h-screen shadow-md flex flex-col justify-between mt-2">
      <div className="px-2 py-10">
        <div className="p-3 border-e-gray-700 flex justify-center items-center"></div>
        <ul>
          {navItems && navItems.length > 0 ? (
            navItems.map((item, index) => (
              <Link key={index} to={item?.path}>
                <Tooltip title={item?.text} placement="right" >
                <li
                  className={`px-4 py-3 flex items-center space-x-3 cursor-pointer mt-2 ${
                    location?.pathname === item?.path
                      ? "bg-[#1f2937] text-white rounded-md"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <span className="text-xl">{item?.icon}</span>
                </li>
                </Tooltip>
              </Link>
            ))
          ) : (
            <p>No items available</p>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default SideNavbar;
