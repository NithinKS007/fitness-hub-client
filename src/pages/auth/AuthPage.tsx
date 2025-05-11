import React, { useEffect, useState } from "react";
import useAuthForm from "../../hooks/useAuthForm";
import { SignState } from "../../types/authTypes";
import useGoogleAuth from "../../hooks/useGoogleAuth";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import SignInForm from "../../components/user-authentication/SignInForm";
import SignUpForm from "../../components/user-authentication/SignUpForm";

const AuthPage: React.FC = () => {
  const [authState, setAuthState] = useState<SignState>("sign in");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { handleUserAuth } = useAuthForm(authState);
  const navigate = useNavigate();
  const { user, trainer, admin } = useSelector(
    (state: RootState) => state.auth
  );

  const getAuthPerson = () => {
    if (user) {
      return user;
    }
    if (trainer) {
      return trainer;
    }
    if (admin) {
      return admin;
    }
  };

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (getAuthPerson()) {
      navigate("/");
    } else {
      setLoading(false);
    }
  }, [getAuthPerson(), navigate]);

  const { handleGoogleAuthSuccess } = useGoogleAuth();
  if (loading) {
    return <div>Loading...</div>;
  }
  const handleAuthClick = () => {
    switch (authState) {
      case "sign in":
        setAuthState("sign up");
        break;
      case "sign up":
        setAuthState("sign in");
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
          formik={handleUserAuth}
          handleGoogleAuthSuccess={handleGoogleAuthSuccess}
          handleAuthClick={handleAuthClick}
        />
      )}
      {authState === "sign up" && (
        <SignUpForm
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          formik={handleUserAuth}
          handleGoogleAuthSuccess={handleGoogleAuthSuccess}
          handleAuthClick={handleAuthClick}
        />
      )}
    </>
  );
};

export default AuthPage;
