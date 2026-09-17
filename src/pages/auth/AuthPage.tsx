import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import SignInForm from "../../components/auth/SignInForm";
import SignUpForm from "../../components/auth/UserSignUpForm";
import TrainerSignUpForm from "../../components/auth/TrainerSignUpForm";
import { useFormik } from "formik";
import { googleAuth } from "../../redux/auth/authThunk";
import {
  signInSchema,
  trainerSignUpSchema,
  userSignUpSchema,
} from "../../utils/validationSchema";
import { useDispatch } from "react-redux";
import { useNavigate, NavigateFunction } from "react-router-dom";
import {
  signinUser,
  signUpUser,
  trainerEntroll,
} from "../../redux/auth/authThunk";
import { showSuccessToast, showErrorToast } from "../../utils/toast";
import { AppDispatch } from "../../redux/store";
import {
  setOtp,
  setUser,
  setAdmin,
  setTrainer,
  setToken,
} from "../../redux/auth/authSlice";
import { CredentialResponse } from "@react-oauth/google";
import LoadingSpinner from "../../components/LoadingSpinner";

export interface UserSignUpFormik {
  fname: string;
  lname: string;
  email: string;
  password: string;
  cPassword: string;
}

export interface SignInFormik {
  email: string;
  password: string;
}
export interface TrainerSignUpFormik extends UserSignUpFormik {
  yearsOfExperience: string;
  phone: string;
  dateOfBirth: string;
}

type SignState = "sign in" | "user sign up" | "trainer sign up";

const AuthPage: React.FC = () => {
  const [authState, setAuthState] = useState<SignState>("sign in");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate: NavigateFunction = useNavigate();
  const { user, trainer, admin } = useSelector(
    (state: RootState) => state.auth
  );
  const [loading, setLoading] = useState<boolean>(true);

  const signInFormik = useFormik<SignInFormik>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: signInSchema,
    onSubmit: async (values: SignInFormik) => {
      try {
        const { email, password } = values;
        const response = await dispatch(
          signinUser({ email, password })
        ).unwrap();
        dispatch(setToken(response.data.accessToken));
        const userData = response.data.userData;
        const role = userData.role;

        switch (role) {
          case "user":
            dispatch(setUser(userData));
            navigate("/user/dashboard");
            break;
          case "trainer":
            dispatch(setTrainer(userData));
            navigate("/trainer/dashboard");
            break;
          case "admin":
            dispatch(setAdmin(userData));
            navigate("/admin/dashboard");
            break;
          default:
            console.error("Unknown role:", role);
            break;
        }

        showSuccessToast(`${response.message} Welcome back ${userData.fname}`);

        signInFormik.resetForm();
      } catch (error: any) {
        console.log(`API Error ${error}`);
        showErrorToast(`${error}`);
      }
    },
  });

  const userSignUpFormik = useFormik<UserSignUpFormik>({
    initialValues: {
      fname: "",
      lname: "",
      email: "",
      password: "",
      cPassword: "",
    },
    validationSchema: userSignUpSchema,
    onSubmit: async (values: UserSignUpFormik) => {
      try {
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
        userSignUpFormik.resetForm();
        navigate("/verify-otp");
      } catch (error: any) {
        console.log(`API Error ${error}`);
        showErrorToast(`${error}`);
      }
    },
  });

  const trainerSignUpFormik = useFormik<TrainerSignUpFormik>({
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
    validationSchema: trainerSignUpSchema,
    onSubmit: async (values: TrainerSignUpFormik) => {
      try {
        const {
          fname,
          lname,
          email,
          phone,
          dateOfBirth,
          password,
          yearsOfExperience,
        } = values;
        const trainerData = {
          fname,
          lname,
          email,
          phone,
          dateOfBirth,
          password,
          yearsOfExperience,
        };
        const response = await dispatch(trainerEntroll(trainerData)).unwrap();
        const otpExpireTime = new Date(Date.now() + 60 * 1000).toISOString();

        const otpData = {
          otpEmail: email,
          otpCountDown: 60,
          otpExpireTime: otpExpireTime,
        };
        dispatch(setOtp(otpData));
        showSuccessToast(response.message);
        trainerSignUpFormik.resetForm();
        navigate("/verify-otp");
      } catch (error: any) {
        console.log(`API Error ${error}`);
        showErrorToast(`${error}`);
      }
    },
  });

  const handleGoogleAuthSuccess = async (res: CredentialResponse) => {
    try {
      if (res.credential) {
        const response = await dispatch(
          googleAuth({ token: res.credential })
        ).unwrap();
        dispatch(setUser(response.data.userData));
        dispatch(setToken(response.data.accessToken));
        showSuccessToast(
          `${response.message} Welcome back ${response.data.userData.fname}`
        );

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
      } else {
        console.error("No credential returned by Google.");
      }
    } catch (error: any) {
      console.log(`API Error ${error}`);
      showErrorToast(`${error}`);
    }
  };

  useEffect(() => {
    userSignUpFormik.setErrors({});
    trainerSignUpFormik.setErrors({});
    signInFormik.setErrors({});
  }, [authState]);

  useEffect(() => {
    if (user || trainer || admin) {
      navigate("/");
    } else {
      setLoading(false);
    }
  }, [user, trainer, admin, navigate]);

  if (loading) {
    return <LoadingSpinner/>
  }
  const handleAuthClick = (state: string) => {
    switch (state) {
      case "sign in":
        setAuthState("sign in");
        break;
      case "user sign up":
        setAuthState("user sign up");
        break;
      case "trainer sign up":
        setAuthState("trainer sign up");
        break;
      default:
        break;
    }
  };

  return (
    <>
      {authState === "sign in" && (
        <SignInForm
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          formik={signInFormik}
          handleGoogleAuthSuccess={handleGoogleAuthSuccess}
          handleAuthClick={handleAuthClick}
        />
      )}
      {authState === "user sign up" && (
        <SignUpForm
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          formik={userSignUpFormik}
          handleGoogleAuthSuccess={handleGoogleAuthSuccess}
          handleAuthClick={handleAuthClick}
        />
      )}
      {authState === "trainer sign up" && (
        <TrainerSignUpForm
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          formik={trainerSignUpFormik}
          handleAuthClick={handleAuthClick}
        />
      )}
    </>
  );
};

export default AuthPage;
