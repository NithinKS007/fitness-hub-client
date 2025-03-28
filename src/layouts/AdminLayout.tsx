import React, {} from "react";
import { Outlet} from "react-router-dom";
import { Dashboard, People, Mail } from "@mui/icons-material";
import { SiTrainerroad } from "react-icons/si";
import SideNavBar from "../components/DashBoardSideNavBar";
import TopNavbar from "../components/DashBoardTopBar";

const AdminLayout: React.FC = () => {
  const adminNavItems = [
    { icon: <Dashboard />, text: "DASHBOARD", path: "/admin/dashboard" },
    { icon: <People />, text: "USERS", path: "/admin/users" },
    {
      icon: <SiTrainerroad size={24} />,
      text: "TRAINERS",
      path: "/admin/trainers",
    },
    { icon: <Mail />, text: "INBOX", path: "/admin/inbox" },
  ];

  return (
    <div className="flex flex-col min-h-screen w-full">
      <TopNavbar />
      <div className="flex flex-1 w-full">
        <div className="w-18">
          <SideNavBar navItems={adminNavItems} />
        </div>
        <div className="flex-1 pl-5 pr-5 pt-20  overflow-auto ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
