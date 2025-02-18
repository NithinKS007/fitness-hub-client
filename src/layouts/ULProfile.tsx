import React, { useState } from "react";
import SideNavBar from "../components/SideNavBar/SideNavBar";
import { Outlet, useLocation } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import Dashboard from "@mui/icons-material/Dashboard";
import Chat from "@mui/icons-material/Chat";
import AccountCircle from "@mui/icons-material/AccountCircle";
import useSignOut from "../hooks/useSignOut";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import BookingIcon from "@mui/icons-material/Bookmark"; 

const ULProfile: React.FC = () => {
  const [open, setOpen] = useState(false);
  const handleSignout = useSignOut();
  const userNavItems = [
    {
      icon: <Dashboard />,
      text: "DASHBOARD",
      path: "/user/dashboard",
    },
    {
        icon: <SubscriptionsIcon />,
      text: "SUBSCRIPTIONS",
      path: "/user/subscriptions",
    },
    {
        icon: <BookingIcon />,
      text: "BOOKINGS",
      path: "/user/bookings",
    },
    {
      icon: <Chat />,
      text: "CHAT",
      path: "/user/chats",
    },
    {
      icon: <AccountBalanceWalletIcon />,
      text: "WALLET",
      path: "/user/wallet",
    },
    {
      icon: <AccountCircle />,
      text: "PROFILE",
      path: "/user/profile",
    },
  ];

  const navItemsFooter = [
    {
      icon: <SettingsApplicationsIcon />,
      text: "Settings",
      path: "/user/settings",
    },
    {
      icon: <ExitToAppIcon />,
      text: "Signout",
      path: "",
    },
  ];
  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleSettingsClick = () => {
    console.log("Settings Clicked");
  };

  const handleProfileClick = () => {
    console.log("Profile Clicked");
  };

  const theme = useTheme();
  const location = useLocation();

  return (
    <div style={{ display: "flex", height: "100%" }}>
      <SideNavBar
        navItems={userNavItems}
        navItemsFooter={navItemsFooter}
        open={open}
        onDrawerToggle={handleDrawerToggle}
        onSettingsClick={handleSettingsClick}
        onLogoutClick={handleSignout}
        onProfileClick={handleProfileClick}
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
        className="bg-gray-100  min-h-screen"
      >
        <Outlet />
      </main>
    </div>
  );
};

export default ULProfile;
