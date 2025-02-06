import React from "react";
import useOtpTimer from "../hooks/useOtpTimer";

const OtpForm: React.FC = () => {

  const { Otp } = useOtpTimer();

  if (!Otp) {
    return <div>Loading OTP...</div>;
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-semibold text-center mb-6">Verify OTP</h1>
        <form>
          {Otp.otpCountDown <= 0 ? (
            <p className="text-red-500">OTP Expired</p>
          ) : (
            <div>
              <p>Email: {Otp.otpEmail}</p>
              <p>OTP Countdown: {Otp.otpCountDown} seconds</p>
              <p>Expires at: {Otp.otpExpireTime}</p>
            </div>
          )}

          <div className="flex justify-between mb-4">
            {Array.from({ length: 4 }).map((_, idx) => (
              <input
                key={idx}
                type="text"
                maxLength={1}
                className="w-12 h-12 text-center border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ))}
          </div>

          <button
            type="submit"
            className="w-full py-2 mt-4 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={Otp.otpCountDown <= 0}
          >
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default OtpForm;
