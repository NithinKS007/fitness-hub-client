import React from "react";
import Profile from "../../components/Profile";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import useUpdateProfileForm from "../../hooks/useUpdateProfileForm";

const TrainerProfilePage: React.FC = () => {
  const trainerProfileData = useSelector(
    (state: RootState) => state?.auth?.user
  );
  const isEditable = trainerProfileData?.role === "trainer";
  const { formik, handleProfilePicChange, handlePdfChange } =
    useUpdateProfileForm(trainerProfileData);

  return (
    <>
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
