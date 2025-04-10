import { useState } from "react";
import Tabs from "../../components/Tabs";
import BookingsTab from "./bookings/BookingsTab";
import CallLogsTab from "./bookings/CallLogsTab";

const tabItems = [{ label: "Bookings" }, { label: "Call logs" }];
const UserBookingsPage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<number>(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
    console.log("event",event)
  };

  const renderContent = () => {
    switch (selectedTab) {
      case 0:
        return <BookingsTab isActive={selectedTab === 0} />;
      case 1:
        return <CallLogsTab isActive={selectedTab === 1} />;
      default:
        return null;
    }
  };

  return (
    <>
      <Tabs
        tabItems={tabItems}
        value={selectedTab as number}
        handleChange={handleTabChange}
      />
      {renderContent()}
    </>
  );
};

export default UserBookingsPage;
