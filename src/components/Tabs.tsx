import React from "react";
import { Tabs, Tab } from "@mui/material";

interface TabItem {
  label: string;
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
      <Tabs value={value} onChange={handleChange} role="navigation">
        {tabItems.map((item, index) => (
          <Tab key={index} label={item.label} />
        ))}
      </Tabs>
    </>
  );
};

export default NavigationTabs;
