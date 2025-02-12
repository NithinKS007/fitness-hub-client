import * as React from "react";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Theme } from "@mui/material/styles";

interface SideNavBarHeaderProps {
  onDrawerToggle: () => void;
  theme: Theme;
  iconColor: string;
}

const SideNavBarHeader: React.FC<SideNavBarHeaderProps> = ({
  onDrawerToggle,
  theme,
  iconColor,
}) => {
  return (
    <div style={{ padding: "16px" }}>
      <IconButton onClick={onDrawerToggle}>
        {theme.direction === "rtl" ? (
          <ChevronRightIcon sx={{ color: iconColor }} />
        ) : (
          <ChevronLeftIcon sx={{ color: iconColor }} />
        )}
      </IconButton>
    </div>
  );
};

export default SideNavBarHeader;
