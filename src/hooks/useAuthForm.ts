import { useFormik } from "formik";
import { validationSchema } from "../utils/validationSchema";
import { UserAuthFormData, SignState } from "../types/authTypes";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, NavigateFunction } from "react-router-dom";
import { signUpUser } from "../redux/auth/authThunk";
import { showSuccessToast, showErrorToast } from "../utils/toast";
import { AppDispatch } from "../redux/store";
import { setOtp } from "../redux/auth/authSlice";

const useAuthForm = (formState: SignState) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate: NavigateFunction = useNavigate();

   const formik = useFormik({
    initialValues: {
      fname: "",
      lname: "",
      email: "",
      password: "",
      cPassword: "",
    },
    validationSchema: validationSchema(formState),
    onSubmit: async (values: UserAuthFormData) => {
      console.log("Form submitted", values);

      try {
        if (formState === "sign up") {
          const response = await dispatch(signUpUser({ userData: values })).unwrap();
          const otpExpireTime = new Date(Date.now() + 60 * 1000).toISOString()

          const otpData = {
            otpEmail:values.email,
            otpCountDown:60,
            otpExpireTime:otpExpireTime
          }
          dispatch(setOtp(otpData));
          showSuccessToast(response.message);
          formik.setErrors({})
          navigate("/verifyOtp")
        } else {


        } 
      } catch (error:any) {
        console.log(`API Error ${error}`)
        showErrorToast(`${error}`)
      }
    },
  });

  useEffect(() => {
    formik.setErrors({});
  }, [formState]);

  return formik;
};

export default useAuthForm;
