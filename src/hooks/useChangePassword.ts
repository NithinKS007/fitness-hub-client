import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { updatePassword } from "../redux/auth/authThunk";
import { useFormik } from "formik";
import { changePasswordValidationSchema } from "../utils/validationSchema";
import { showErrorToast, showSuccessToast } from "../utils/toast";

const useChangePassword = () => {
  const dispatch = useDispatch<AppDispatch>();
  const changePasswordFormik = useFormik({
    initialValues: {
      password: "",
      newPassword: "",
      cPassword: "",
    },
    validationSchema: changePasswordValidationSchema(),
    onSubmit: async (values) => {
      const { password, newPassword } = values;
      try {
        const response = await dispatch(
          updatePassword({ password, newPassword })
        ).unwrap();
        console.log("response for changing the password", response);
        showSuccessToast(response.message)
        changePasswordFormik.resetForm()
      } catch (error) {
        console.log(`API Error ${error}`);
        showErrorToast(`${error}`);
      }
    },
  });

  return {
    changePasswordFormik,
  };
};

export default useChangePassword;
