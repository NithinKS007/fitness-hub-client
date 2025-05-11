import UserProfile from "../../components/profile/UserProfile";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import useUpdateProfileForm from "../../hooks/useUpdateProfileForm";
import React from "react";
import useChangePassword from "../../hooks/useChangePassword";

const UserProfilePage: React.FC = () => {
  const userData = useSelector((state: RootState) => state?.auth?.user);
  const isEditable = userData?.role === "user" ? true : false;
  const { formik, handleProfilePicChange } = useUpdateProfileForm(userData);

  const { changePasswordFormik } = useChangePassword();

  return (
    <>
      <UserProfile
        formik={formik}
        isEditable={isEditable}
        handleProfilePicChange={handleProfilePicChange}
        changePasswordFormik={changePasswordFormik}
      />
    </>
  );
};

export default UserProfilePage;
