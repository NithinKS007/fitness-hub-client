import React, { useEffect, useState } from "react";
import useAuthForm from "../hooks/useAuthForm";
import { SignState } from "../types/authTypes";
import AuthForm from "../components/AuthForm";
import useGoogleAuth from "../hooks/useGoogleAuth";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";

const AuthPage: React.FC = () => {
  const [signState, setSignState] = useState<SignState>("sign in");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { handleUserAuth } = useAuthForm(signState);
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (user) {
      navigate("/");
    } else {
      setLoading(false);
    }
  }, [user, navigate]);

  const { handleGoogleAuthSuccess } = useGoogleAuth();
  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <AuthForm
      signState={signState}
      setSignState={setSignState}
      showPassword={showPassword}
      setShowPassword={setShowPassword}
      formik={handleUserAuth}
      handleGoogleAuthSuccess={handleGoogleAuthSuccess}
    />
  );
};

export default AuthPage;
