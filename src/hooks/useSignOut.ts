import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { signOutUser } from "../redux/auth/authThunk";
import { clearUser } from "../redux/auth/authSlice";
import { showErrorToast, showSuccessToast } from "../utils/toast";

const useSignOut = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleSignout = async () => {
    try {
      const response = await dispatch(signOutUser()).unwrap();
      dispatch(clearUser())
      showSuccessToast(response.message)
    } catch (error) {
      console.log(`API Error: ${error}`);
      showErrorToast(`${error}`);
    }
  };

  return handleSignout;
};

export default useSignOut;
