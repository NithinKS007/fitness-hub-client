import React, { useEffect } from "react";
import Profile from "../../components/profile/TrainerProfile";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import useUpdateProfileForm from "../../hooks/useUpdateProfileForm";
import { useParams } from "react-router-dom";
import { trainerDetails } from "../../redux/admin/adminThunk";
import usePdfDownload from "../../hooks/usePdfDownload";

const TrainerDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const authPerson = useSelector((state: RootState) => state?.auth?.trainer);
  const trainerData = useSelector(
    (state: RootState) => state.admin.trainerDetails
  );
  useEffect(() => {
    if (id) {
      dispatch(trainerDetails({ id }));
    }
  }, [dispatch, id]);

  const isEditable = authPerson?.role === "trainer" ? true : false;
  const { formik } = useUpdateProfileForm(trainerData);

  const { handleDownload } = usePdfDownload();
  return (
    <>
      <Profile
        formik={formik}
        isEditable={isEditable}
        handleDownload={handleDownload}
      />
      ;
    </>
  );
};

export default TrainerDetailsPage;
