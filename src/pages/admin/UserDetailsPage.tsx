import React, { useEffect, useState} from "react";
import Profile from "../../components/Profile";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import useUpdateProfileForm from "../../hooks/useUpdateProfileForm";
import { useParams } from "react-router-dom";
import { userDetails } from "../../redux/admin/adminThunk";
import NavigationTabs from "../../components/Tabs";

const UserDetailsPage: React.FC = () => {
   const [value, setValue] = useState(0);
   const {_id} = useParams<{_id:string}>()
   const dispatch = useDispatch<AppDispatch>()
   const handleChange = (event: React.SyntheticEvent, newValue: number) => {
     setValue(newValue);
   };
 

  const authUser = useSelector((state: RootState) => state?.auth?.user)
  const userData = useSelector((state:RootState)=> state.admin.userDetails)
  useEffect(()=>{
    if(_id){
        dispatch(userDetails(_id))
    }
  },[dispatch,_id])
  const tabItems = [
    { label: "Profile", path: "/admin/user-details" },
  ];

  const isEditable = authUser?.role === "user" ? true : false;
  const { formik } = useUpdateProfileForm(userData)
  
  return (
    <>
     <div style={{ marginBottom: "30px", marginLeft: "150px" }}>
     <NavigationTabs
        value={value}
        handleChange={handleChange}
        tabItems={tabItems}
      />
      </div>
      <Profile
        formik={formik}
        isEditable={isEditable}
      />
    </>
  );
};

export default UserDetailsPage;
