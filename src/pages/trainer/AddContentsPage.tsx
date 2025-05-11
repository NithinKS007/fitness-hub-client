import { useState } from "react";
import NavigationTabs from "../../components/Tabs";
import VideoSection from "../trainer/contentsTabs/VideosTab";
import PlaylistSection from "../trainer/contentsTabs/PlayListTab";

const tabItems = [{ label: "Videos" }, { label: "Playlists" }];

const AddContentsPage = () => {
  const [selectedTab, setSelectedTab] = useState<number>(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
    console.log("event",event)
  };

  return (
    <>
      <NavigationTabs
        tabItems={tabItems}
        value={selectedTab as number}
        handleChange={handleTabChange}
      />
      {selectedTab === 0 && <VideoSection/>}
      {selectedTab === 1 && <PlaylistSection/>}
    </>
  );
};

export default AddContentsPage;