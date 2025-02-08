import React from "react";
import ForgotPassword from "../components/ForgotPassword";
import { useFormik } from "formik";
import { emailValidationSchema } from "../utils/validationSchema";
import { showErrorToast, showSuccessToast } from "../utils/toast";
import { useDispatch } from "react-redux";
import { forgotPassLink } from "../redux/auth/authThunk";
import { AppDispatch } from "../redux/store";

const ForgotPassPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const formik = useFormik({
    initialValues: {
      email: "", 
    },
    validationSchema: emailValidationSchema, 
    onSubmit: async (values) => {
      try {
        const {email} = values
        const response = await dispatch(forgotPassLink({email:email})).unwrap()
        console.log("response for sending the email",response)
        showSuccessToast(`${response.message}`)
        formik.resetForm()
      } catch (error: any) {
        console.log(`API Error ${error}`);
        showErrorToast(`${error}`);
      }
    },
  });

  return <ForgotPassword formik={formik} />; 
};

export default ForgotPassPage;
