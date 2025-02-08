import OtpForm from "../components/OtpForm";
import useOtp from "../hooks/useOtp";
import React, { useRef, useState } from "react";

const OtpPage: React.FC = () => {
  const { otp, isTimerExpired, handleResendOtp, handleVerifyOtp } = useOtp();
  const [otpData, setOtpData] = useState(new Array(6).fill(""));
  const otpBoxRef = useRef<(HTMLInputElement | null)[]>([]);
  const numberOfDigits = 6;

  const handleOtpChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number
  ) => {
    const value = e.target.value;
    const newOtp = [...otpData];
    newOtp[idx] = value;
    setOtpData(newOtp);

    if (value && idx < numberOfDigits - 1) {
        
      otpBoxRef.current[idx + 1]?.focus();
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const otpString = otpData.join("");
    if (otpString.length === numberOfDigits) {
      await handleVerifyOtp(otpString, event);
      setOtpData(new Array(6).fill(""));
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
    />
  );
};

export default OtpPage;
