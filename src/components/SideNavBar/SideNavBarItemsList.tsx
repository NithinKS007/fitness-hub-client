import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "react-router-dom";

interface NavItem {
  icon: JSX.Element;
  text: string;
  path: string;
}

interface SideNavBarItemsListProps {
  navItems: NavItem[];
  open: boolean;
  location: any;
  drawerBgColor: string;
  hoverBgColor: string;
  iconColor: string;
  textColor: string;
  activeTextColor: string;
}

const SideNavBarItemsList: React.FC<SideNavBarItemsListProps> = ({
  navItems,
  open,
  location,
  drawerBgColor,
  hoverBgColor,
  iconColor,
  textColor,
  activeTextColor,
}) => {
  return (
    <>
      <List>
        {navItems.map((item) => {
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
                component={Link}
                to={item.path}
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

export default SideNavBarItemsList;
