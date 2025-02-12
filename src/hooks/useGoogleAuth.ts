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
      const response = await dispatch(googleAuth({ token: res.credential })).unwrap()
      console.log("response from the backend for google login", response);
      dispatch(setUser(response.data))
      showSuccessToast(`${response.message} Welcome back ${response.data.fname}`)
      if (response.data.role === "user") {
        navigate("/"); 
      } else if (response.data.role === "trainer") {
        navigate("/trainer/dashboard"); 
      } else {
        navigate("/admin/dashboard"); 
      }
    } catch (error:any) {
      console.log(`API Error ${error}`)
      showErrorToast(`${error}`)
    }
  
  };

  return { handleGoogleAuthSuccess };
};

export default useGoogleAuth;
