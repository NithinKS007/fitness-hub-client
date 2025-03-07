import { useState, useEffect } from "react";
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
import { User } from "../redux/auth/authTypes";
import { useNavigate } from "react-router-dom";
import AccountDropDown from "./AccountDropDown";
import useSignOut from "../hooks/useSignOut";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Get a Coach", href: "/find-trainer" },
  { label: "Entroll as a coach", href: "/trainer-entrollment" },
  { label: "About", href: "/about" },
  { label: "Contact us", href: "/contact-us" },
];
const color = "#61512";

interface TopNavBarProps {
  user: User | null;
}

const TopNavBar: React.FC<TopNavBarProps> = ({ user }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const handleSignOut = useSignOut();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const redirectToLogin = () => {
    navigate("/sign-in");
  };
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2, fontWeight: 700 }}>
        FT HUB
      </Typography>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton
              onClick={() => navigate(item.href)}
              sx={{ textAlign: "center" }}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar
      position="fixed"
      sx={{
        bgcolor: isScrolled
          ? "rgba(255, 255, 255, 0.6)"
          : "rgba(255, 255, 255, 0.9)",
        backdropFilter: "blur(15px)",
        transition: "all 0.3s ease-in-out",
        boxShadow: isScrolled
          ? "0 4px 6px rgba(0,0,0,0.07)"
          : "0 2px 4px rgba(0,0,0,0.05)",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            height: "75px",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box
            component="a"
            href="/"
            sx={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              color: "black",
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: 700, letterSpacing: 1, fontSize: "1.5rem" }}
            >
              FT HUB
            </Typography>
          </Box>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { sm: "none" }, color: "text.primary" }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              gap: 3,
              alignItems: "center",
              flexGrow: 1,
              justifyContent: "center",
            }}
          >
            {navItems.map((item) => (
              <Button
                key={item.label}
                onClick={() => navigate(item.href)}
                sx={{
                  color: "text.primary",
                  textTransform: "none",
                  fontSize: "0.95rem",
                  padding: "6px 8px",
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <AccountDropDown
              signout={handleSignOut}
              user={user}
              redirectToLogin={redirectToLogin}
              color={color}
            />
          </Box>
        </Toolbar>
      </Container>
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
};

export default TopNavBar;