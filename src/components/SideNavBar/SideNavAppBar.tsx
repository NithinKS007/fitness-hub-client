import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { AppBar } from "./sideNavBarStyles";
import { Theme } from "@mui/material/styles";

interface SideNavAppBarProps {
  onDrawerToggle: () => void;
  open: boolean;
  theme: Theme;
  iconColor: string;
  onProfileClick: () => void;
}
const SideNavAppBar: React.FC<SideNavAppBarProps> = ({
  onDrawerToggle,
  open,
  theme,
  iconColor,
  onProfileClick,
}) => {
  return (
    <>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={onDrawerToggle}
            edge="start"
            sx={{ marginRight: 5, display: open ? "none" : "block" }}
          >
            <MenuIcon sx={{ color: iconColor }} />
          </IconButton>
          <IconButton
            color="inherit"
            aria-label="close drawer"
            onClick={onDrawerToggle}
            edge="start"
            sx={{ marginRight: 5, display: open ? "block" : "none" }}
          >
            {theme.direction === "rtl" ? (
              <ChevronRightIcon sx={{ color: iconColor }} />
            ) : (
              <ChevronLeftIcon sx={{ color: iconColor }} />
            )}
          </IconButton>

          <Box sx={{ flexGrow: 1 }} />

          <IconButton color="inherit">
            <NotificationsIcon sx={{ color: iconColor }} />
          </IconButton>
          <IconButton color="inherit" onClick={onProfileClick}>
            <AccountCircleIcon sx={{ color: iconColor }} />
          </IconButton>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default SideNavAppBar;
