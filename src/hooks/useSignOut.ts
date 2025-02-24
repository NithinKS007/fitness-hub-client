import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { signOutUser } from "../redux/auth/authThunk";
import { clearUser } from "../redux/auth/authSlice";
import { showErrorToast, showSuccessToast } from "../utils/toast";
import { useNavigate } from "react-router-dom";

const useSignOut = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate()
  const handleSignout = async () => {
    try {
      const response = await dispatch(signOutUser()).unwrap();
      dispatch(clearUser())
      localStorage.clear()
      showSuccessToast(response.message)
      navigate("/sign-in")
    } catch (error) {
      console.log(`API Error: ${error}`);
      showErrorToast(`${error}`);
    }
  };

  return handleSignout;
};

export default useSignOut;
