import { useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import AccountDropDown from "./AccountDropDown";
import useSignOut from "../hooks/useSignOut";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Get a Coach", href: "/find-trainer" },
];

interface TopNavBarProps {
  authPerson: any;
}

const styles = {
  appBar: {
    bgcolor: "white",
    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
  },
  toolbar: {
    height: "75px",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logoBox: {
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    color: "black",
  },
  logoText: {
    fontWeight: 700,
    letterSpacing: 1,
    fontSize: "1.5rem",
  },
  menuIcon: {
    display: { sm: "none" },
    color: "text.primary",
  },
  navBox: {
    display: { xs: "none", sm: "flex" },
    gap: 3,
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "center",
  },
  navButton: {
    color: "text.primary",
    textTransform: "none",
    fontSize: "0.95rem",
    padding: "6px 8px",
  },
  accountBox: {
    display: "flex",
    alignItems: "center",
  },
  drawer: {
    display: { xs: "block", sm: "none" },
    "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
  },
  drawerBox: {
    textAlign: "center",
  },
  drawerText: {
    my: 2,
    fontWeight: 700,
  },
  drawerButton: {
    textAlign: "center",
  },
};

const TopNavBar: React.FC<TopNavBarProps> = ({ authPerson }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const handleSignOut = useSignOut();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const redirectToLogin = () => {
    navigate("/sign-in");
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={styles.drawerBox}>
      <Typography variant="h6" sx={styles.drawerText}>
        FT HUB
      </Typography>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton
              onClick={() => navigate(item.href)}
              sx={styles.drawerButton}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar position="fixed" sx={styles.appBar}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={styles.toolbar}>
          <Box component="a" href="/" sx={styles.logoBox}>
            <Typography variant="h6" sx={styles.logoText}>
              FT HUB
            </Typography>
          </Box>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={styles.menuIcon}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={styles.navBox}>
            {navItems.map((item) => (
              <Button
                key={item.label}
                onClick={() => navigate(item.href)}
                sx={styles.navButton}
              >
                {item.label}
              </Button>
            ))}
          </Box>
          <Box sx={styles.accountBox}>
            <AccountDropDown
              signout={handleSignOut}
              authPerson={authPerson}
              redirectToLogin={redirectToLogin}
            />
          </Box>
        </Toolbar>
      </Container>
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={styles.drawer}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
};

export default TopNavBar;