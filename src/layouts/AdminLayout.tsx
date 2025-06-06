import React from "react";
import { Outlet } from "react-router-dom";
import { Dashboard, People, Mail } from "@mui/icons-material";
import { SiTrainerroad } from "react-icons/si";
import SideNavBar from "../components/dashboard/DashBoardSideNavBar";
import TopNavbar from "../components/dashboard/DashBoardTopBar";
import { FaMoneyBillWave } from "react-icons/fa";

const AdminLayout: React.FC = () => {
  const adminNavItems = [
    {
      icon: <Dashboard />,
      text: "DASHBOARD",
      path: ["/admin/dashboard"],
    },
    {
      icon: <People />,
      text: "USERS",
      path: ["/admin/users", "/admin/user-details"],
    },
    {
      icon: <SiTrainerroad size={24} />,
      text: "TRAINERS",
      path: [
        "/admin/trainers",
        "/admin/trainer-details",
        "/admin/trainer-subscriptions",
      ],
    },
    {
      icon: <Mail />,
      text: "INBOX",
      path: ["/admin/inbox"],
    },
    {
      icon: <FaMoneyBillWave size={24} />,
      text: "COMMISSION",
      path: ["/admin/commission"],
    },
  ];

  return (
    <div className="flex flex-col min-h-screen w-full">
      <TopNavbar />
      <div className="flex flex-1 w-full">
        <div className="w-24 hidden md:block md:w-24">
          <SideNavBar navItems={adminNavItems} />
        </div>
        <div className="flex-1 pl-5 pr-5 pt-20 overflow-auto ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
