import React from "react";
import TrainerProfileProps from "../../components/profile/TrainerProfile";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import useUpdateProfileForm from "../../hooks/useUpdateProfileForm";

const TrainerProfilePage: React.FC = () => {
  const trainerProfileData = useSelector(
    (state: RootState) => state?.auth?.trainer
  );
  const isEditable = trainerProfileData?.role === "trainer";
  const { formik, handleProfilePicChange, handlePdfChange } =
    useUpdateProfileForm(trainerProfileData);

  return (
    <>
      <TrainerProfileProps
        formik={formik}
        handleProfilePicChange={handleProfilePicChange}
        handlePdfChange={handlePdfChange}
        isEditable={isEditable}
      />
    </>
  );
};

export default TrainerProfilePage;
