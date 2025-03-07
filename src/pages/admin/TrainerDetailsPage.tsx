import React, { useEffect, useState } from "react";
import Profile from "../../components/Profile";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import useUpdateProfileForm from "../../hooks/useUpdateProfileForm";
import { useParams } from "react-router-dom";
import { trainerDetails } from "../../redux/admin/adminThunk";

const TrainerDetailsPage: React.FC = () => {
  const { _id } = useParams<{ _id: string }>();
  const dispatch = useDispatch<AppDispatch>();

  const authUser = useSelector((state: RootState) => state?.auth?.user);
  const trainerData = useSelector(
    (state: RootState) => state.admin.trainerDetails
  );
  useEffect(() => {
    if (_id) {
      dispatch(trainerDetails(_id));
    }
  }, [dispatch, _id]);

  const isEditable = authUser?.role === "trainer" ? true : false;
  const { formik } = useUpdateProfileForm(trainerData);

  return (
    <>
      <Profile formik={formik} isEditable={isEditable} />;
    </>
  );
};

export default TrainerDetailsPage;
