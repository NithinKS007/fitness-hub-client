import { useState } from "react";
import Tabs from "../../components/Tabs";
import MyTrainersTab from "./subscriptions/MyTrainersTab";
import MySubscriptions from "./subscriptions/MySubscriptions";

const tabItems = [{ label: "My trainers" }, { label: "Subscriptions history" }];
const UserSubscriptionsPage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<number>(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
    console.log("event",event)
  };

  const renderContent = () => {
    switch (selectedTab) {
      case 0:
        return <MyTrainersTab isActive={selectedTab === 0} />;
      case 1:
        return <MySubscriptions isActive={selectedTab === 1} />;
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

export default UserSubscriptionsPage;
