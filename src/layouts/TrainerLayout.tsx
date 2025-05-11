import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Dashboard from "@mui/icons-material/Dashboard";
import People from "@mui/icons-material/People";
import Chat from "@mui/icons-material/Chat";
import Event from "@mui/icons-material/Event";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { PostAddRounded, SubscriptionsRounded } from "@mui/icons-material";
import SideNavBar from "../components/dashboard/DashBoardSideNavBar";
import TopNavbar from "../components/dashboard/DashBoardTopBar";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { socket } from "../config/socket";

const TrainerLayout: React.FC = () => {

  const trainer = useSelector((state:RootState)=>state.auth.trainer)
  
  const trainerNavItems = [
    {
      icon: <Dashboard />,
      text: "DASHBOARD",
      path: ["/trainer/dashboard"],
    },
    {
      icon: <People />,
      text: "SUBSCRIBERS",
      path: ["/trainer/subscribers"],
    },
    {
      icon: <Chat />,
      text: "CHATS",
      path: ["/trainer/chat"],
    },
    {
      icon: <Event />,
      text: "APPOINTMENTS",
      path: ["/trainer/appointments"],
    },
    {
      icon: <AccountCircle />,
      text: "PROFILE",
      path: ["/trainer/profile"],
    },
    {
      icon: <SubscriptionsRounded />,
      text: "SUBSCRIPTION",
      path: ["/trainer/subscriptions"],
    },
    {
      icon: <PostAddRounded />,
      text: "ADD CONTENTS",
      path: ["/trainer/add-contents"],
    },
  ];
  

  useEffect(() => {
    if (!trainer?._id) {
      console.log("No trainer ID, skipping socket setup");
      return;
    }

    console.log("Registering trainer with socket:", trainer._id);
    socket.emit("register", trainer._id);

    socket.on("connect", () => {
      console.log("Socket connected in SessionSchedulesPage:", socket.id);
      socket.emit("register", trainer._id); 
    });

    return () => {
      socket.off("connect");
    };
  }, [trainer?._id]);
  return (
    <div className="flex flex-col min-h-screen w-full">
      <TopNavbar />
      <div className="flex flex-1 w-full">
        <div className="w-24 hidden md:block md:w-24">
          <SideNavBar navItems={trainerNavItems} />
        </div>
        <div className="flex-1 pl-5 pr-5 pt-17 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default TrainerLayout;
