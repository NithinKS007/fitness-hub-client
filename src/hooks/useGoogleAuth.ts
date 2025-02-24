import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { googleAuth } from "../redux/auth/authThunk";
import { setUser } from "../redux/auth/authSlice";
import { showErrorToast, showSuccessToast } from "../utils/toast";

const useGoogleAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate: NavigateFunction = useNavigate();

  const handleGoogleAuthSuccess = async (res: any) => {
    try {
      const response = await dispatch(
        googleAuth({ token: res.credential })
      ).unwrap();

       console.log("response",response)
       localStorage.setItem('accessToken', response.data.accessToken);
       dispatch(setUser(response.data.userData));
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
    } catch (error: any) {
      console.log(`API Error ${error}`);
      showErrorToast(`${error}`);
    }
  };

  return { handleGoogleAuthSuccess };
};

export default useGoogleAuth;
