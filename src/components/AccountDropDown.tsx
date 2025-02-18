import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Avatar from "@mui/material/Avatar";
import { useState,useRef } from "react";

interface AccountDropDownProps {
  color:any,
  user: any;
  redirectToLogin: () => void;
  signout:()=>void
}
const userMenuItems = [
  { label: "Dashboard", action: "user-dashboard", path: "/user/dashboard" },
  { label: "Subscriptions", action: "user-subscriptions", path: "/user/subscriptions",
  },
  { label: "Profile", action: "user-profile", path: "/user/profile",
  },
  { label: "Bookings", action: "user-bookings", path: "/user/bookings" },
  { label: "Chats", action: "user-chats", path: "/user/chats" },
  { label: "Wallet", action: "user-wallet", path: "/user/wallet" },
  { label: "Signout", action: "signout" },
];

const adminMenuItems = [

  { label: "Dashboard", action: "admin-dashboard", path: "/admin/dashboard" },
  { label: "Users", action: "admin-users", path: "/admin/users" },
  { label: "Trainers", action: "admin-trainers", path: "/admin/trainers" },
  { label: "Inbox", action: "admin-inbox", path: "/admin/inbox" },
  { label: "Settings", action: "admin-settings", path: "/admin/settings" },
  { label: "Signout", action: "signout" },

]

const trainerMenuItems = [

  { label: "Dashboard", action: "trainer-dashboard", path: "/trainer/dashboard" },
  { label: "Clients", action: "trainer-clients", path: "/trainer/clients" },
  { label: "Chat", action: "trainer-chat", path: "/trainer/chat" },
  { label: "Sessions", action: "trainer-sessions", path: "/trainer/sessions" },
  { label: "Profile", action: "trainer-profile", path: "/trainer/profile" },
  { label: "Settings", action: "trainer-settings", path: "/trainer/settings" },
  { label: "Signout", action: "signout",}
   
]

const AccountDropDown: React.FC<AccountDropDownProps> = ({
  color,
  user,
  redirectToLogin,
  signout
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const anchorRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();
  const userData = useSelector((state: RootState) => state.auth.user);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }
    setOpen(false);
  };

  const handleListKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Tab" || event.key === "Escape") {
      setOpen(false);
    }
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
      case "user-wallet":
        navigate("/user/wallet");
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
      case "admin-settings":
        navigate("/admin/settings");
        break;
      case "trainer-dashboard":
        navigate("/trainer/dashboard");
        break;
      case "trainer-clients":
        navigate("/trainer/clients");
        break;
      case "trainer-chat":
        navigate("/trainer/chat");
        break;
      case "trainer-sessions":
        navigate("/trainer/sessions");
        break;
      case "trainer-profile":
        navigate("/trainer/profile");
        break;
      default:
        break;
    }
  };

  const getMenuItems = () => {
    switch (userData?.role) {
      case "admin":
        return adminMenuItems;
      case "trainer":
        return trainerMenuItems;
      default:
        return userMenuItems;
    }
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2}}>
      {user ? (
        <IconButton
          sx={{ color: "#1a1a1a", padding: "8px" }}
          ref={anchorRef}
          id="composition-button"
          aria-controls={open ? "composition-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          <Popper
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            placement="bottom-start"
            transition
            disablePortal
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === "bottom-start" ? "left top" : "left bottom",
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList
                      autoFocusItem={open}
                      id="composition-menu"
                      aria-labelledby="composition-button"
                      onKeyDown={handleListKeyDown}
                    >
                      {getMenuItems().map((item:{label:string,action:string,path ?:string}, index:number) => (
                        <MenuItem
                          key={index}
                          onClick={() => handleMenuAction(item.action)}
                        >
                          {item.label}
                        </MenuItem>
                      ))}
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
          {userData?.profilePic ? (
            <Avatar
              alt="Profile"
              src={userData.profilePic}
              sx={{ width: 35, height: 35,color:color }}
            />
          ) : (
            <Avatar sx={{ width: 35, height: 35,color:color}}>
              <AccountCircleIcon sx={{ fontSize: 35 ,color:color}} />
            </Avatar>
          )}
        </IconButton>
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
          SIGN IN
        </Button>
      )}
    </Box>
  );
};


export default AccountDropDown;
