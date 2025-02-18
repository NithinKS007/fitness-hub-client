import { useFormik } from "formik";
import {
  trainerEntrollValidationSchema,
  userAuthvalidationSchema,
} from "../utils/validationSchema";
import { UserAuthFormData, SignState } from "../types/authTypes";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, NavigateFunction } from "react-router-dom";
import {
  signinUser,
  signUpUser,
  trainerEntroll,
} from "../redux/auth/authThunk";
import { showSuccessToast, showErrorToast } from "../utils/toast";
import { AppDispatch } from "../redux/store";
import { setOtp, setUser } from "../redux/auth/authSlice";

const useAuthForm = (formState: SignState = "sign in") => {

  const dispatch = useDispatch<AppDispatch>();
  const navigate: NavigateFunction = useNavigate();

  const handleUserAuth = useFormik({
    initialValues: {
      fname: "",
      lname: "",
      email: "",
      password: "",
      cPassword: "",
    },

    validationSchema: userAuthvalidationSchema(formState),
    
    onSubmit: async (values: UserAuthFormData) => {

      try {
        if (formState === "sign up") {
          const response = await dispatch(
            signUpUser({ userData: values })
          ).unwrap();
          const otpExpireTime = new Date(Date.now() + 60 * 1000).toISOString();

          const otpData = {
            otpEmail: values.email,
            otpCountDown: 60,
            otpExpireTime: otpExpireTime,
          };
          dispatch(setOtp(otpData));
          showSuccessToast(response.message);
          handleUserAuth.resetForm();
          navigate("/verify-otp");
        } else {
          const { email, password } = values;
          const response = await dispatch(
            signinUser({ email, password })
          ).unwrap();
          localStorage.setItem('accessToken', response.data.accessToken);
          dispatch(setUser(response.data.userData))

          showSuccessToast(
            `${response.message} Welcome back ${response.data.userData.fname}`
          );
          handleUserAuth.resetForm();
          switch (response.data.userData.role) {
            case "user":
              navigate("/user/dashboard");
              break;
            case "trainer":
              navigate("/trainer/dashboard");
              break;
            case "admin":
              navigate("/admin/dashboard");
              break;
            default:
              break;
          }
          
        }
      } catch (error: any) {
        console.log(`API Error ${error}`);
        showErrorToast(`${error}`);
      }
    },
  });

  const handleTrainerAuth = useFormik({
    initialValues: {
      fname: "",
      lname: "",
      yearsOfExperience: "",
      phone: "",
      dateOfBirth: "",
      email: "",
      password: "",
      cPassword: "",
    },
    validationSchema: trainerEntrollValidationSchema(),
    onSubmit: async (values: UserAuthFormData) => {
      try {
        const trainerData = {
          fname: values.fname,
          lname: values.lname,
          email: values.email,
          phone:values.phone,
          dateOfBirth: values.dateOfBirth,
          password: values.password,
          yearsOfExperience: values.yearsOfExperience,
        };
        const response = await dispatch(trainerEntroll(trainerData)).unwrap();
        const otpExpireTime = new Date(Date.now() + 60 * 1000).toISOString();

        const otpData = {
          otpEmail: values.email,
          otpCountDown: 60,
          otpExpireTime: otpExpireTime,
        };
        dispatch(setOtp(otpData));
        showSuccessToast(response.message);
        handleTrainerAuth.resetForm();
        navigate("/verify-otp");
      } catch (error: any) {
        console.log(`API Error ${error}`);
        showErrorToast(`${error}`);
      }
    },
  });

  useEffect(() => {
    handleUserAuth.setErrors({});
    handleTrainerAuth.setErrors({});
  }, [formState]);

  return {
    handleUserAuth,
    handleTrainerAuth,
  };
};

export default useAuthForm;
