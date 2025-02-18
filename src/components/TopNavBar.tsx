import { useState, useEffect } from "react";
import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
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
const color = "#61512"

interface TopNavBarProps {
  user: User | null;
}

const TopNavBar: React.FC<TopNavBarProps> = ({ user }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:768px)");

  const handleSignOut = useSignOut()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const redirectToLogin = () => {
    navigate("/sign-in");
  };


  return (
    <AppBar
      position="fixed"
      sx={{
        bgcolor: isScrolled ? "rgba(255, 255, 255, 0.6)" : "rgba(255, 255, 255, 0.9)",
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
          sx={{ height: "75px", justifyContent: "space-between" }}
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
          {isMobile ? (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <AccountDropDown signout={handleSignOut} user={user} redirectToLogin={redirectToLogin} color={"black"}/>
            </Box>
          ) : (
            <>
              
                <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
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
       
              <AccountDropDown signout={handleSignOut} user={user} redirectToLogin={redirectToLogin}  color={color} />
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default TopNavBar;
