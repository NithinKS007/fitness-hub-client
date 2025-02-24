import React, { useState } from "react";
import SideNavBar from "../components/SideNavBar/SideNavBar";
import { Outlet, useLocation } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import GridViewIcon from "@mui/icons-material/GridView";
import ChatIcon from "@mui/icons-material/Chat";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import useSignOut from "../hooks/useSignOut";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";

const ULProfile: React.FC = () => {
  const [open, setOpen] = useState(false);
  const handleSignout = useSignOut();

  const userNavItems = [
    {
      icon: <GridViewIcon />,
      text: "DASHBOARD",
      path: "/user/dashboard",
    },
    {
      icon: <SubscriptionsIcon />,
      text: "SUBSCRIPTIONS",
      path: "/user/subscriptions",
    },
    {
      icon: <CollectionsBookmarkIcon />,
      text: "BOOKINGS",
      path: "/user/bookings",
    },
    {
      icon: <ChatIcon />,
      text: "CHAT",
      path: "/user/chats",
    },
    {
      icon: <AccountBalanceWalletIcon />,
      text: "WALLET",
      path: "/user/wallet",
    },
    {
      icon: <AccountCircleIcon />,
      text: "PROFILE",
      path: "/user/profile",
    },
  ];

  const navItemsFooter = [
    {
      icon: <SettingsIcon />,
      text: "Settings",
      path: "/user/settings",
    },
    {
      icon: <LogoutIcon />,
      text: "Signout",
      path: "",
    },
  ];
  const handleDrawerToggle = () => {
    setOpen(!open);
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
        onLogoutClick={handleSignout}
        theme={theme}
        location={location}
      />
      <main
        style={{
          flexGrow: 1,
          transition: "margin-left 0.3s ease",
          paddingLeft: "20px",
          paddingRight: "20px",
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
