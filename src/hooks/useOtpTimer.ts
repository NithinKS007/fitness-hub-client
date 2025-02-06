import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { clearOtp, updateOtpCountDown } from "../redux/auth/authSlice";


const useOtpTimer = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { Otp } = useSelector((state: RootState) => state.auth);
  const [isTimerExpired, setIsTimerExpired] = useState<boolean>(false);

  useEffect(() => {
    if (!Otp?.otpExpireTime) return; 

    const timer = setInterval(() => {
      const currentTime = new Date().getTime();
      const expireTime = new Date(Otp.otpExpireTime).getTime();
      const remainingTime = expireTime - currentTime;
      const remainingSeconds = Math.floor(remainingTime / 1000);

      if (remainingSeconds <= 0) {
        setIsTimerExpired(true);
        dispatch(clearOtp()); 
        clearInterval(timer);
      } else {
        setIsTimerExpired(false);
        dispatch(updateOtpCountDown(remainingSeconds)); 
      }
    }, 1000);

    return () => clearInterval(timer); 
  }, [dispatch, Otp]);

  return { isTimerExpired, Otp };
};

export default useOtpTimer;
