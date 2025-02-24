import React, { useState } from "react";
import SideNavBar from "../components/SideNavBar/SideNavBar";
import { Outlet, useLocation } from "react-router-dom";
import { Dashboard, People, Mail } from "@mui/icons-material";
import { SiTrainerroad } from "react-icons/si";
import { useTheme } from "@mui/material/styles";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import useSignOut from "../hooks/useSignOut";

const AdminLayout: React.FC = () => {
  const [open, setOpen] = useState(false);

  const handleSignout = useSignOut()
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
      path: "",
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


  const theme = useTheme();
  const location = useLocation();

  return (
    <div style={{ display: "flex", height: "100%" }}>
      <SideNavBar
        navItems={adminNavItems}
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
        className="bg-gray-50 min-h-screen"
      >
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
