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
    <div className="w-full bg-white rounded-lg shadow-sm">
      <Tabs
        value={value}
        onChange={handleChange}
        role="navigation"
        className="border-b border-gray-200"
        slotProps={{
          indicator: {
            className: "bg-blue-500 h-1 rounded-t",
          },
        }}
      >
        {tabItems.map((item, index) => (
          <Tab
            key={index}
            label={item.label}
            className={`text-sm font-medium capitalize ${
              value === index ? "text-blue-500" : "text-gray-600"
            } hover:text-blue-500 transition-colors py-2`}
          />
        ))}
      </Tabs>
    </div>
  );
};

export default NavigationTabs;
