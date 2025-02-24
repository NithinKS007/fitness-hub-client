import React, { useState } from "react";
import SideNavBar from "../components/SideNavBar/SideNavBar";
import { Outlet, useLocation } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import Dashboard from "@mui/icons-material/Dashboard";
import People from "@mui/icons-material/People";
import Chat from "@mui/icons-material/Chat";
import Event from "@mui/icons-material/Event";
import AccountCircle from "@mui/icons-material/AccountCircle";
import useSignOut from "../hooks/useSignOut";

const TrainerLayout: React.FC = () => {
  const [open, setOpen] = useState(false);
  const handleSignout = useSignOut()
  const trainerNavItems = [
    {
      icon: <Dashboard  />,
      text: "DASHBOARD",
      path: "/trainer/dashboard",
    },
    {
      icon: <People />,
      text: "CLIENTS",
      path: "/trainer/clients",
    },
    {
      icon: <Chat />,
      text: "CHAT",
      path: "/trainer/chat",
    },
    {
      icon: <Event />,
      text: "SESSIONS",
      path: "/trainer/session-schedules",
    },
    {
      icon: <AccountCircle />,
      text: "PROFILE",
      path: "/trainer/profile",
    },
    
  ];

  const navItemsFooter = [
    {
      icon: <SettingsApplicationsIcon />,
      text: "Settings",
      path: "/trainer/settings",
    },
    {
      icon: <ExitToAppIcon />,
      text: "Signout",
      path: "/signout",
    },
  ];
  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const theme = useTheme();
  const location = useLocation();

  return (
    <div style={{ display: "flex", height: "100%" ,}}>
      <SideNavBar
        navItems={trainerNavItems}
        navItemsFooter={navItemsFooter} 
        open={open}
        onDrawerToggle={handleDrawerToggle}
        onLogoutClick={handleSignout}
        theme={theme}
        location={location}
      />
      <main
        style={{
          flexGrow: 1,
          transition: "margin-left 0.3s ease",
          paddingLeft:"20px",
          paddingRight:"20px",
          paddingTop: "5%",
        }}
        className="bg-gray-100 min-h-screen"
      >
        <Outlet />
      </main>
    </div>
  );
};

export default TrainerLayout;
