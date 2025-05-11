import OtpForm from "../../components/user-authentication/OtpForm";
import useOtp from "../../hooks/useOtp";
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
    />
  );
};

export default OtpPage;
