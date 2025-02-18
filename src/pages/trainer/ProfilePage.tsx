import React, { useState } from "react";
import NavigationTabs from "../../components/Tabs";
import Profile from "../../components/Profile";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import useUpdateProfileForm from "../../hooks/useUpdateProfileForm";

const TrainerProfilePage: React.FC = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  }

  const tabItems = [
    { label: "Profile", path: "/trainer/profile" },
    { label: "Schedule Adding", path: "/trainer/schedule-setting" },
    { label: "Add video & Docs for clients", path: "/trainer/add-video" },
  ];

  const trainerProfileData = useSelector(
    (state: RootState) => state?.auth?.user
  );
  const isEditable = trainerProfileData?.role === "trainer" ? true : false;
  const { formik, handleProfilePicChange, handlePdfChange } =
    useUpdateProfileForm(trainerProfileData);

  return (
    <>
      <div style={{ marginBottom: "20px", marginLeft: "150px" }}>
        <NavigationTabs
          value={value}
          handleChange={handleChange}
          tabItems={tabItems}
        />
      </div>

      <Profile
        formik={formik}
        handleProfilePicChange={handleProfilePicChange}
        handlePdfChange={handlePdfChange}
        isEditable={isEditable}
      />
    </>
  );
};

export default TrainerProfilePage;
