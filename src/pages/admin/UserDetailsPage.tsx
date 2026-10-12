import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import useUpdateProfileForm from "../../hooks/useUpdateProfileForm";
import { useParams } from "react-router-dom";
import { userDetails } from "../../redux/admin/adminThunk";
import UserProfile from "../../components/profile/UserProfile";

const UserDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();

  const authPerson = useSelector((state: RootState) => state?.auth?.user);
  const userData = useSelector((state: RootState) => state.admin.userDetails);
  useEffect(() => {
    if (id) {
      dispatch(userDetails({id}));
    }
  }, [dispatch, id]);

  const isEditable = authPerson?.role === "user" ? true : false;
  const { userFormik } = useUpdateProfileForm(userData);

  return (
    <>
    <UserProfile formik={userFormik} isEditable={isEditable} />
    </>
  );
};

export default UserDetailsPage;
