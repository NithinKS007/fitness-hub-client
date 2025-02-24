import React from "react";
import { Tabs, Tab } from "@mui/material";
import { Link } from "react-router-dom";

interface TabItem {
  label: string;
  path: string;
}

interface NavigationTabsProps {
  value: number;
  handleChange: (event: React.SyntheticEvent, newValue: number) => void;
  tabItems: TabItem[];
}

const NavigationTabs: React.FC<NavigationTabsProps> = ({
  value,
  handleChange,
  tabItems,
}) => {
  return (
    <>
      <Tabs
        value={value}
        onChange={handleChange}
        role="navigation"
        sx={{ marginLeft: "10px" }}
      >
        {tabItems.map((item, index) => (
          <Tab
            key={index}
            label={item.label}
            component={Link}
            to={item.path}
            sx={{
              backgroundColor: value === index ? "rgba(0, 123, 255, 0.1)" : "transparent", 
              color: value === index ? "blue" : "inherit",
              "&:hover": {
                backgroundColor: value === index ? "rgba(0, 123, 255, 0.2)" : "rgba(0, 0, 0, 0.04)",
              },
            }}
          />
        ))}
      </Tabs>
    </>
  );
};

export default NavigationTabs;
