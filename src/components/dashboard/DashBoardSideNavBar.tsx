import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Tooltip } from "@mui/material";

interface NavItem {
  icon: JSX.Element;
  text: string;
  path: string[];
}

interface SideNavbarProps {
  navItems: NavItem[];
}

const SideNavbar: React.FC<SideNavbarProps> = ({ navItems }) => {
  const location = useLocation();
  const isPathMatch = (currentPath: string, paths: string[]) => {
    return paths.some((path) => currentPath.startsWith(path));
  };

  return (
    <>
      <nav className="hidden md:flex fixed bg-white w-24 h-screen shadow-md  flex-col justify-between mt-2">
        <div className="flex flex-col items-center justify-center flex-grow">
          <ul className="flex flex-col items-center border border-gray-300 rounded-lg p-4">
            {navItems && navItems.length > 0 ? (
              navItems.map((item, index) => {
                const isActive = isPathMatch(location.pathname, item.path);
                return (
                  <Link key={index} to={item.path[0]}>
                    <Tooltip title={item.text} placement="right">
                      <li
                        className={`px-4 py-3 flex items-center space-x-3 cursor-pointer mt-2 ${
                          isActive
                            ? "bg-[#1f2937] text-white rounded-full w-12 h-12 flex justify-center items-center"
                            : "text-gray-600 hover:bg-gray-100 rounded-full w-12 h-12 justify-center items-center"
                        }`}
                      >
                        <span className="text-xl">{item.icon}</span>
                      </li>
                    </Tooltip>
                  </Link>
                );
              })
            ) : (
              <p>No items available</p>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default SideNavbar;
