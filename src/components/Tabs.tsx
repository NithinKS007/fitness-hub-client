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
        indicatorColor="primary"
        textColor="primary"
      >
        {tabItems.map((item, index) => (
          <Tab key={index} label={item.label} component={Link} to={item.path} />
        ))}
      </Tabs>
    </>
  );
};

export default NavigationTabs;
