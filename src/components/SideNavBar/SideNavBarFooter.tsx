import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

interface NavItem {
  icon: JSX.Element;
  text: string;
  path: string;
}

interface SideNavBarFooterProps {
  navItemsFooter: NavItem[];
  open: boolean;
  location: any;
  drawerBgColor: string;
  hoverBgColor: string;
  iconColor: string;
  textColor: string;
  activeTextColor: string;
  onSettingsClick: () => void;
  onLogoutClick: () => void;
}
const SideNavBarFooter: React.FC<SideNavBarFooterProps> = ({
  navItemsFooter,
  open,
  location,
  drawerBgColor,
  hoverBgColor,
  iconColor,
  textColor,
  activeTextColor,
  onSettingsClick,
  onLogoutClick,
}) => {
  return (
    <>
      <List>
        {navItemsFooter.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <ListItem key={item.text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  px: 2.5,
                  mx: 2,
                  justifyContent: open ? "initial" : "center",
                  backgroundColor: isActive ? drawerBgColor : "transparent",
                  "&:hover": {
                    backgroundColor: !isActive ? hoverBgColor : drawerBgColor,
                  },
                }}
                component={item.path === "/settings" ? "button" : "div"}
                onClick={
                  item.path === "/settings" ? onSettingsClick : onLogoutClick
                }
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    justifyContent: "center",
                    mr: open ? 3 : "auto",
                    color: isActive ? activeTextColor : iconColor,
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{
                    opacity: open ? 1 : 0,
                    color: isActive ? activeTextColor : textColor,
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </>
  );
};

export default SideNavBarFooter;
