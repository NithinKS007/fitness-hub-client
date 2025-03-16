import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { AppBar } from "./sideNavBarStyles";
import { Theme } from "@mui/material/styles";
import AccountDropDown from "../AccountDropDown";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import useSignOut from "../../hooks/useSignOut";

interface SideNavAppBarProps {
  onDrawerToggle: () => void;
  open: boolean;
  theme: Theme;
  iconColor: string;
}
const SideNavAppBar: React.FC<SideNavAppBarProps> = ({
  onDrawerToggle,
  open,
  theme,
  iconColor,
}) => {

  const user = useSelector((state:RootState)=>state?.auth?.user)
  const trainer = useSelector((state:RootState)=>state?.auth?.trainer)
  const admin = useSelector((state:RootState)=>state?.auth?.admin)

  const getAuthPerson = () =>{
    if(user){
      return user
    }
    if(trainer){
      return trainer
    }
    if(admin){
      return admin
    }
  }
  const navigate = useNavigate()
    const redirectToLogin = () => {
     navigate("/sign-in");
  };
  const handleSignOut = useSignOut()

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
            <NotificationsIcon sx={{ color: iconColor ,width:"35px" ,height:"35px"}} />
          </IconButton>
          <AccountDropDown color = {iconColor} authPerson={getAuthPerson()} redirectToLogin={redirectToLogin} signout={handleSignOut}/>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default SideNavAppBar;
