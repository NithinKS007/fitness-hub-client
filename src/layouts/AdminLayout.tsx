import React, { useState } from "react";
import SideNavBar from "../components/SideNavBar/SideNavBar";
import { Outlet, useLocation } from "react-router-dom";
import { Dashboard, People, Mail } from "@mui/icons-material";
import { SiTrainerroad } from "react-icons/si";
import { useTheme } from "@mui/material/styles";
import Breadcrumb from "../components/BrudCrumb";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";

const AdminLayout: React.FC = () => {
  const [open, setOpen] = useState(false);
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

  const navItemsFooter = [
    {
      icon: <SettingsApplicationsIcon />,
      text: "Settings",
      path: "/admin/settings",
    },
    {
      icon: <ExitToAppIcon />,
      text: "Logout",
      path: "/admin/logout",
    },
  ];
  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleSettingsClick = () => {
    console.log("Settings Clicked");
  };

  const handleLogoutClick = () => {
    console.log("Logout Clicked");
  };

  const handleProfileClick = () => {
    console.log("Profile Clicked");
  };

  const theme = useTheme();
  const location = useLocation();

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <SideNavBar
        navItems={adminNavItems}
        navItemsFooter={navItemsFooter}
        open={open}
        onDrawerToggle={handleDrawerToggle}
        onSettingsClick={handleSettingsClick}
        onLogoutClick={handleLogoutClick}
        onProfileClick={handleProfileClick}
        theme={theme}
        location={location}
      />
      <main
        style={{
          flexGrow: 1,
          transition: "margin-left 0.3s ease",
          padding: "20px",
          marginTop: "64px",
        }}
        className="bg-gray-100"
      >
        <div className="mb-10">
          <Breadcrumb pathname={location.pathname} />
        </div>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
