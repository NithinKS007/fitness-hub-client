import React, { useState } from "react";
import useAuthForm from "../hooks/useAuthForm";
import { SignState } from "../types/authTypes";
import AuthForm from "../components/AuthForm";
import useGoogleAuth from "../hooks/useGoogleAuth";

const AuthPage: React.FC = () => {
  const [signState, setSignState] = useState<SignState>("sign in");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const formik = useAuthForm(signState);
  const {handleGoogleAuthSuccess} = useGoogleAuth()

  return (
    <AuthForm
      signState={signState}
      setSignState={setSignState}
      showPassword={showPassword}
      setShowPassword={setShowPassword}
      formik={formik}
      handleGoogleAuthSuccess ={handleGoogleAuthSuccess}
    />
  );
};

export default AuthPage;
