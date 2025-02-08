import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { setOtp, updateOtpCountDown } from "../redux/auth/authSlice";
import { resendOtp, verifyOtp } from "../redux/auth/authThunk";
import { showErrorToast, showSuccessToast } from "../utils/toast";
import { useNavigate } from "react-router-dom";

const useOtp = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { otp } = useSelector((state: RootState) => state.auth);
  const [isTimerExpired, setIsTimerExpired] = useState<boolean>(false);
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setInterval(() => {
      if (!otp) return;

      const currentTime = new Date().getTime();
      const expireTime = new Date(otp.otpExpireTime).getTime();
      const remainingTime = expireTime - currentTime;
      const remainingSeconds = Math.floor(remainingTime / 1000);

      if (remainingSeconds <= 0) {
        setIsTimerExpired(true);
        clearInterval(timer);
      } else {
        setIsTimerExpired(false);
        dispatch(updateOtpCountDown(remainingSeconds));
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [dispatch, otp?.otpExpireTime]);

  const handleResendOtp = async (event: React.FormEvent) => {
    event?.preventDefault();
    if (!otp?.otpEmail) {
      return;
    }
    const newotpExpireTime = new Date(Date.now() + 60 * 1000).toISOString();

    const resendOtpData = {
      otpEmail: otp.otpEmail,
      otpCountDown: 60,
      otpExpireTime: newotpExpireTime,
    };

    try {
      dispatch(setOtp(resendOtpData));
      const response = await dispatch(resendOtp({ email: otp.otpEmail })).unwrap();
      setIsTimerExpired(false);
      showSuccessToast(response.message);
    } catch (error) {
      console.log(`Failed to resend OTP: ${error}`);
      showErrorToast(`${error}`);
    }
  };

  const handleVerifyOtp = async (otpData: string, event: React.FormEvent) => {
    event?.preventDefault();
    if (!otp?.otpEmail) {
      return;
    }
    const {otpEmail} = otp
    try {
      const response = await dispatch(verifyOtp({email:otpEmail, otp:otpData })).unwrap();
      console.log("response for verifying the otp",response);
      showSuccessToast(response.message)
      navigate("/auth")
    } catch (error) {
      console.log(`Failed to verify OTP: ${error}`);
      showErrorToast(`${error}`);
    }
  };

  return { isTimerExpired, otp, handleResendOtp, handleVerifyOtp };
};

export default useOtp;
