import React, { useEffect, useState } from "react";
import NavigationTabs from "../../components/Tabs";
import Profile from "../../components/Profile";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import useUpdateProfileForm from "../../hooks/useUpdateProfileForm";
import { useParams } from "react-router-dom";
import { userDetails } from "../../redux/admin/adminThunk";

const TrainerDetailsPage: React.FC = () => {
  const [value, setValue] = useState(0);
  const { _id } = useParams<{ _id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const tabItems = [
    { label: "Profile", path: "/admin/trainer-details" },
    { label: "Subscriptions", path: "/admin/trainer-subscriptions" },
    { label: "Videos", path: "/admin/trainer-videos" },
  ];

  const authUser = useSelector((state: RootState) => state?.auth?.user);
  const userData = useSelector((state: RootState) => state.admin.userDetails);
  useEffect(() => {
    if (_id) {
      dispatch(userDetails(_id));
    }
  }, [dispatch, _id])

  const isEditable = authUser?.role === "trainer" ? true : false;
  const { formik } = useUpdateProfileForm(userData);


  return (
    <>
      <div style={{ marginLeft: "70px" }}>
        <NavigationTabs
          value={value}
          handleChange={handleChange}
          tabItems={tabItems}
        />
      </div>
      <Profile formik={formik} isEditable={isEditable} />
    </>
  );
};

export default TrainerDetailsPage;
