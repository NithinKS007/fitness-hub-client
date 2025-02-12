import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import { Drawer } from "./sideNavBarStyles";
import SideNavAppBar from "./SideNavAppBar";
import SideNavBarItemsList from "./SideNavBarItemsList";
import SideNavBarFooter from "./SideNavBarFooter";
import SideNavBarHeader from "./SideNavBarHeader";
import { Theme } from "@mui/material/styles";

interface SideNavBarProps {
  navItems: { icon: JSX.Element; text: string; path: string }[];
  navItemsFooter: { icon: JSX.Element; text: string; path: string }[];
  open: boolean;
  onDrawerToggle: () => void;
  onSettingsClick: () => void;
  onLogoutClick: () => void;
  onProfileClick: () => void;
  theme: Theme;
  location: any;
}

const SideNavBar: React.FC<SideNavBarProps> = ({
  navItems,
  open,
  onDrawerToggle,
  onSettingsClick,
  onLogoutClick,
  onProfileClick,
  theme,
  location,
  navItemsFooter,
}) => {
  const drawerBgColor = "#1e3a8a";
  const hoverBgColor = "rgba(0, 0, 0, 0.2)";
  const iconColor = "black";
  const textColor = "black";
  const activeTextColor = "white";

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <SideNavAppBar
        onDrawerToggle={onDrawerToggle}
        open={open}
        theme={theme}
        iconColor={iconColor}
        onProfileClick={onProfileClick}
      />
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          width: open ? 240 : 70,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: open ? 240 : 70,
            visibility: open ? "visible" : "visible",
            transition: "width 0.3s, visibility 0s 0.3s",
            overflowX: "hidden",
          },
        }}
      >
        <SideNavBarHeader
          onDrawerToggle={onDrawerToggle}
          theme={theme}
          iconColor={iconColor}
        />
        <SideNavBarItemsList
          navItems={navItems}
          open={open}
          location={location}
          drawerBgColor={drawerBgColor}
          hoverBgColor={hoverBgColor}
          iconColor={iconColor}
          textColor={textColor}
          activeTextColor={activeTextColor}
        />

        <Divider sx={{ marginTop: "auto" }} />
        <SideNavBarFooter
          navItemsFooter={navItemsFooter}
          open={open}
          location={location}
          drawerBgColor={drawerBgColor}
          hoverBgColor={hoverBgColor}
          iconColor={iconColor}
          textColor={textColor}
          activeTextColor={activeTextColor}
          onSettingsClick={onSettingsClick}
          onLogoutClick={onLogoutClick}
        />
      </Drawer>
    </Box>
  );
};

export default SideNavBar;
