import OtpForm from "../../components/auth/OtpForm";
import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import {
  clearOtpDetails,
  setOtp,
  updateOtpCountDown,
} from "../../redux/auth/authSlice";
import { resendOtp, verifyOtp } from "../../redux/auth/authThunk";
import { showErrorToast, showSuccessToast } from "../../utils/toast";
import { useNavigate } from "react-router-dom";

const OtpPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { otp } = useSelector((state: RootState) => state.auth);
  const [isTimerExpired, setIsTimerExpired] = useState<boolean>(false);
  const navigate = useNavigate();

  const [otpData, setOtpData] = useState(new Array(6).fill(""));
  const otpBoxRef = useRef<(HTMLInputElement | null)[]>([]);
  const numberOfDigits = 6;

  useEffect(() => {
    if (!otp) return;
    const timer = setInterval(() => {
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
    return () => {
      clearInterval(timer);
    };
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
      const response = await dispatch(
        resendOtp({ email: otp.otpEmail })
      ).unwrap();
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
    const { otpEmail } = otp;
    try {
      const response = await dispatch(
        verifyOtp({ email: otpEmail, otp: otpData })
      ).unwrap();
      showSuccessToast(response.message);
      navigate("/sign-in");
      dispatch(clearOtpDetails());
    } catch (error) {
      console.log(`Failed to verify OTP: ${error}`);
      showErrorToast(`${error}`);
    }
  };

  const handleOtpChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number
  ) => {
    const value = e.target.value;
    const newOtp = [...otpData];

    if (value) {
      newOtp[idx] = value;
      setOtpData(newOtp);
      if (idx < numberOfDigits - 1) {
        otpBoxRef.current[idx + 1]?.focus();
      }
    } else {
      newOtp[idx] = "";
      setOtpData(newOtp);
      if (idx > 0) {
        otpBoxRef.current[idx - 1]?.focus();
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedValue = e.clipboardData.getData("Text");

    // Only process if the pasted value is of valid length
    if (pastedValue.length <= numberOfDigits) {
      const newOtp = [...otpData];
      const otpArray = pastedValue.split(""); // Split the pasted value into digits

      // Update OTP fields with the pasted digits
      otpArray.forEach((digit, index) => {
        newOtp[index] = digit; // Fill the OTP data array with the pasted digits
      });

      setOtpData(newOtp);

      // Set focus to the next available input after the paste
      otpBoxRef.current[otpArray.length]?.focus(); // Focus the next input after the paste
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (otpData) {
      const otpString = otpData.join("");
      if (otpString.length === numberOfDigits) {
        await handleVerifyOtp(otpString, event);
        setOtpData(new Array(6).fill(""));
      }
    }
  };

  return (
    <OtpForm
      otpData={otpData}
      isTimerExpired={isTimerExpired}
      handleResendOtp={handleResendOtp}
      handleVerifyOtp={handleVerifyOtp}
      otp={otp}
      handleOtpChange={handleOtpChange}
      handleSubmit={handleSubmit}
      otpBoxRef={otpBoxRef}
      handlePaste={handlePaste}
    />
  );
};

export default OtpPage;
