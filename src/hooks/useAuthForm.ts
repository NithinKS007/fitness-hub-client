import { useFormik } from "formik";
import { AuthFormValidationSchema } from "../utils/validationSchema";
import { UserAuthFormData, SignState } from "../types/authTypes";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, NavigateFunction } from "react-router-dom";
import { signinUser, signUpUser } from "../redux/auth/authThunk";
import { showSuccessToast, showErrorToast } from "../utils/toast";
import { AppDispatch } from "../redux/store";
import { setOtp, setUser } from "../redux/auth/authSlice";

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
    validationSchema: AuthFormValidationSchema(formState),
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
          formik.resetForm()
          navigate("/auth/verify-otp")
        } else {
          const {email,password} = values
          const response = await dispatch(signinUser({email:email,password:password})).unwrap()
          console.log("response from signin",response)
          dispatch(setUser(response.data))
          showSuccessToast(`${response.message} Welcome back ${response.data.fname}`);
          formik.resetForm()
          if (response.data.role === "user") {
            navigate("/"); 
          } else if (response.data.role === "trainer") {
            navigate("/trainer/dashboard"); 
          } else {
            navigate("/admin/dashboard"); 
          }
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
