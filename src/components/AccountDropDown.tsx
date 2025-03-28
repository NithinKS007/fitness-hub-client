import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Avatar from "@mui/material/Avatar";
import { useState, useRef } from "react";

interface AccountDropDownProps {
  authPerson: any;
  redirectToLogin: () => void;
  signout: () => void;
}

const userMenuItems = [
  { label: "Dashboard", action: "user-dashboard", path: "/user/dashboard" },
  {
    label: "Subscriptions",
    action: "user-subscriptions",
    path: "/user/subscriptions",
  },
  { label: "Bookings", action: "user-bookings", path: "/user/bookings" },
  { label: "Chats", action: "user-chats", path: "/user/chats" },
  { label: "Profile", action: "user-profile", path: "/user/profile" },
  { label: "Signout", action: "signout", path: "" },
];

const adminMenuItems = [
  { label: "Dashboard", action: "admin-dashboard", path: "/admin/dashboard" },
  { label: "Users", action: "admin-users", path: "/admin/users" },
  { label: "Trainers", action: "admin-trainers", path: "/admin/trainers" },
  { label: "Inbox", action: "admin-inbox", path: "/admin/inbox" },
  { label: "Signout", action: "signout", path: "" },
];

const trainerMenuItems = [
  {
    label: "Dashboard",
    action: "trainer-dashboard",
    path: "/trainer/dashboard",
  },
  { label: "Subscribers", action: "trainer-subscribers", path: "/trainer/subscribers" },
  { label: "Chat", action: "trainer-chat", path: "/trainer/chat" },
  { label: "Appointments", action: "trainer-appointments", path: "/trainer/appointments" },
  { label: "Profile", action: "trainer-profile", path: "/trainer/profile" },
  { label: "Signout", action: "signout", path: "" },
];

const AccountDropDown: React.FC<AccountDropDownProps> = ({
  authPerson,
  redirectToLogin,
  signout,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const anchorRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();
  const userData = useSelector((state: RootState) => state?.auth?.user);
  const trainerData = useSelector((state: RootState) => state?.auth?.trainer);
  const adminData = useSelector((state: RootState) => state?.auth?.admin);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleMenuAction = (action: string) => {
    switch (action) {
      case "user-profile":
        navigate("/user/profile");
        break;
      case "user-dashboard":
        navigate("/user/dashboard");
        break;
      case "user-subscriptions":
        navigate("/user/subscriptions");
        break;
      case "user-bookings":
        navigate("/user/bookings");
        break;
      case "user-chats":
        navigate("/user/chats");
        break;
      case "signout":
        signout();
        break;
      case "admin-dashboard":
        navigate("/admin/dashboard");
        break;
      case "admin-users":
        navigate("/admin/users");
        break;
      case "admin-trainers":
        navigate("/admin/trainers");
        break;
      case "admin-inbox":
        navigate("/admin/inbox");
        break;
      case "trainer-dashboard":
        navigate("/trainer/dashboard");
        break;
      case "trainer-subscribers":
        navigate("/trainer/subscribers");
        break;
      case "trainer-chat":
        navigate("/trainer/chat");
        break;
      case "trainer-appointments":
        navigate("/trainer/appointments");
        break;
      case "trainer-profile":
        navigate("/trainer/profile");
        break;
      default:
        break;
    }
    setOpen(false);
  };

  const getMenuItems = () => {
    if (userData?.role === "user") return userMenuItems;
    if (trainerData?.role === "trainer") return trainerMenuItems;
    if (adminData?.role === "admin") return adminMenuItems;
    return [];
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      {authPerson ? (
        <>
          <IconButton
            sx={{ color: "#1a1a1a" }}
            ref={anchorRef}
            onClick={handleToggle}
          >
            {userData?.profilePic ? (
              <Avatar
                alt="Profile"
                src={userData.profilePic}
                sx={{ width: 35, height: 35, color: "#4b5563" }}
              />
            ) : (
              <AccountCircleIcon sx={{ fontSize: 35, color: "#4b5563" }} />
            )}
          </IconButton>
          {open && (
            <Box
              sx={{
                position: "absolute",
                top: "60px",
                right: "20px",
                width: "160px",
                backgroundColor: "white",
                borderRadius: "4px",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.25)",
                zIndex: 999,
    
              }}
            >
              <Box>
                {getMenuItems().map((item, index) => (
                  <MenuItem
                    key={index}
                    onClick={() => handleMenuAction(item.action)}
                    sx={{ padding: "10px 15px", cursor: "pointer",color:"black" }}
                  >
                    {item.label}
                  </MenuItem>
                ))}
              </Box>
            </Box>
          )}
        </>
      ) : (
        <Button
          variant="contained"
          sx={{
            bgcolor: "#1a1a1a",
            color: "white",
            textTransform: "none",
            borderRadius: "8px",
            padding: "8px 24px",
          }}
          onClick={redirectToLogin}
        >
          GET STARTED
        </Button>
      )}
    </Box>
  );
};

export default AccountDropDown;
