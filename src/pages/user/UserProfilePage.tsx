import UserProfile from "../../components/UserProfile";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import useUpdateProfileForm from "../../hooks/useUpdateProfileForm";
import React, { useState } from "react";
import NavigationTabs from "../../components/Tabs";

const UserProfilePage: React.FC = () => {
  const [value, setValue] = useState(0);
  const userData = useSelector((state: RootState) => state.auth.user);
  const isEditable = userData?.role === "user" ? true : false;

  const { formik, handleProfilePicChange } = useUpdateProfileForm(userData);
  const tabItems = [{ label: "Profile", path: "/admin/user-details" }];
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <div style={{ marginBottom: "25px", marginLeft: "110px" }}>
        <NavigationTabs
          value={value}
          handleChange={handleChange}
          tabItems={tabItems}
        />
      </div>
      <UserProfile
        formik={formik}
        isEditable={isEditable}
        handleProfilePicChange={handleProfilePicChange}
      />
    </>
  );
};

export default UserProfilePage;
