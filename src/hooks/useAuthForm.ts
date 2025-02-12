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
      console.log("Form submitted", values);

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
          navigate("/auth/verify-otp");
        } else {
          const { email, password } = values;
          const response = await dispatch(
            signinUser({ email, password })
          ).unwrap();
          console.log("response from signin", response);
          dispatch(setUser(response.data));
          showSuccessToast(
            `${response.message} Welcome back ${response.data.fname}`
          );
          handleUserAuth.resetForm();
          if (response.data.role === "user") {
            navigate("/");
          } else if (response.data.role === "trainer") {
            navigate("/trainer/dashboard");
          } else {
            navigate("/admin/dashboard");
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
      console.log("Form submitted", values);
      try {
        const trainerData = {
          fname: values.fname,
          lname: values.lname,
          email: values.email,
          phone:values.phone,
          dateOfBirth: values.dateOfBirth,
          password: values.password,
          yearsOfExperience: values?.yearsOfExperience,
        };

        console.log(trainerData)
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
        navigate("/auth/verify-otp");
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
