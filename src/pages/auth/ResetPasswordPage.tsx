import React from "react";
import ResetPassword from "../../components/auth/ResetPassword";
import { useFormik } from "formik";
import { resetPasswordSchema } from "../../utils/validationSchema";
import { showErrorToast, showSuccessToast } from "../../utils/toast";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { forgotPassword } from "../../redux/auth/authThunk";
import { useParams } from "react-router-dom";

export interface ResetPasswordFormik {
  password: string;
  cPassword: string;
}
const ResetPasswordPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { token } = useParams<{ token: string }>();
  if (!token) {
    return;
  }
  const formik = useFormik<ResetPasswordFormik>({
    initialValues: {
      password: "",
      cPassword: "",
    },
    validationSchema: resetPasswordSchema,
    onSubmit: async (values) => {
      try {
        const { password } = values;
        const response = await dispatch(
          forgotPassword({ password, token })
        ).unwrap();
        showSuccessToast(`${response.message}`);
        formik.resetForm();
      } catch (error) {
        console.log(`API Error ${error}`);
        showErrorToast(`${error}`);
      }
    },
  });
  return <ResetPassword formik={formik} />;
};

export default ResetPasswordPage;
