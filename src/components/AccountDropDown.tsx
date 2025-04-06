import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
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
  { label: "Workouts", action: "user-workouts", path: "/user/workouts" },
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
  {
    label: "Subscribers",
    action: "trainer-subscribers",
    path: "/trainer/subscribers",
  },
  { label: "Chat", action: "trainer-chat", path: "/trainer/chat" },
  {
    label: "Appointments",
    action: "trainer-appointments",
    path: "/trainer/appointments",
  },
  { label: "Profile", action: "trainer-profile", path: "/trainer/profile" },
  { label: "Signout", action: "signout", path: "" },
];

const AccountDropDown: React.FC<AccountDropDownProps> = ({
  authPerson,
  redirectToLogin,
  signout,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const anchorRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();

  const {
    user: userData,
    trainer: trainerData,
    admin: adminData,
  } = useSelector((state: RootState) => state?.auth);

  const handleToggle = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
      case "user-workouts":
        navigate("/user/workouts");
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
    handleClose();
  };

  const getMenuItems = () => {
    if (userData?.role === "user") return userMenuItems;
    if (trainerData?.role === "trainer") return trainerMenuItems;
    if (adminData?.role === "admin") return adminMenuItems;
    return [];
  };

  const open = Boolean(anchorEl);

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
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            {getMenuItems().map((item, index) => (
              <MenuItem
                key={index}
                onClick={() => handleMenuAction(item.action)}
                sx={{
                  padding: "10px 15px",
                  color: "black",
                  width:"150px"
                }}
              >
                {item.label}
              </MenuItem>
            ))}
          </Menu>
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