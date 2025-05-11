import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import useUpdateProfileForm from "../../hooks/useUpdateProfileForm";
import { useParams } from "react-router-dom";
import { userDetails } from "../../redux/admin/adminThunk";
import UserProfile from "../../components/profile/UserProfile";

const UserDetailsPage: React.FC = () => {
  const { _id } = useParams<{ _id: string }>();
  const dispatch = useDispatch<AppDispatch>();

  const authPerson = useSelector((state: RootState) => state?.auth?.user);
  const userData = useSelector((state: RootState) => state.admin.userDetails);
  useEffect(() => {
    if (_id) {
      dispatch(userDetails({_id}));
    }
  }, [dispatch, _id]);

  const isEditable = authPerson?.role === "user" ? true : false;
  const { formik } = useUpdateProfileForm(userData);

  return (
    <>
      <UserProfile formik={formik} isEditable={isEditable} />
    </>
  );
};

export default UserDetailsPage;
