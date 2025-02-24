import React, { useState } from "react";
import FilterButton from "../components/FilterIconButton";
import SortButton from "../components/SortButton";
import Divider from "@mui/material/Divider";
import FilterSidebar from "../components/FilterSideBar";
import TrainerGrid from "../components/TrainerCard";
import GetACoachBanner from "../components/Banners.tsx/GetACoachBanner";
import getACoachBanner from "../assets/getACoachBanner.webp"

const GetTrainer: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <main className="mt-15">
      <>
        <GetACoachBanner getACoachBanner={getACoachBanner} />
        <div className="flex justify-between ml-20 mr-20">
          <FilterButton onClick={toggleSidebar} />
          <SortButton />
        </div>
        <Divider sx={{ margin: "30px" }} />
        <div className="flex justify-center">
          <FilterSidebar open={isSidebarOpen} />
          <div className={`TrainerGrid ${isSidebarOpen ? "shrink" : "expand"}`}>
            <TrainerGrid isSidebarOpen={isSidebarOpen} />
          </div>
        </div>
      </>
    </main>
  );
};

export default GetTrainer;
