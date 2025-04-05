import React from "react";
import { Outlet } from "react-router-dom";
import Dashboard from "@mui/icons-material/Dashboard";
import People from "@mui/icons-material/People";
import Chat from "@mui/icons-material/Chat";
import Event from "@mui/icons-material/Event";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { PostAddRounded, SubscriptionsRounded } from "@mui/icons-material";
import SideNavBar from "../components/DashBoardSideNavBar";
import TopNavbar from "../components/DashBoardTopBar";

const TrainerLayout: React.FC = () => {
  const trainerNavItems = [
    {
      icon: <Dashboard />,
      text: "DASHBOARD",
      path: "/trainer/dashboard",
    },
    {
      icon: <People />,
      text: "SUBSCRIBERS",
      path: "/trainer/subscribers",
    },
    {
      icon: <Chat />,
      text: "CHATS",
      path: "/trainer/chat",
    },
    {
      icon: <Event />,
      text: "APPOINTMENTS",
      path: "/trainer/appointments",
    },
    {
      icon: <AccountCircle />,
      text: "PROFILE",
      path: "/trainer/profile",
    },
    {
      icon: <SubscriptionsRounded />,
      text: "SUBSCRIPTION",
      path: "/trainer/subscriptions",
    },
    {
      icon: <PostAddRounded />,
      text: "ADD CONTENTS",
      path: "/trainer/add-contents",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen w-full">
      <TopNavbar />
      <div className="flex flex-1 w-full">
        <div className="w-18">
          <SideNavBar navItems={trainerNavItems} />
        </div>
        <div className="flex-1 pl-5 pr-5 pt-15 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default TrainerLayout;
