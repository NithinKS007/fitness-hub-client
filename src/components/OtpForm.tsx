interface OtpFormProps {
  otp: {
    otpEmail: string;
    otpCountDown: number;
    otpExpireTime: string;
  } | null;
  isTimerExpired: boolean;
  handleResendOtp: (event: React.FormEvent) => Promise<void>;
  handleVerifyOtp: (otp: string, event: React.FormEvent) => void;
  otpData: string[];
  handleOtpChange: (e: React.ChangeEvent<HTMLInputElement>, idx: number) => void;
  handleSubmit: (event: React.FormEvent) => void;
  otpBoxRef: React.RefObject<(HTMLInputElement | null)[]>
}

const OtpForm: React.FC<OtpFormProps> = ({
  otpData,
  isTimerExpired,
  handleResendOtp,
  otp,
  handleOtpChange,
  handleSubmit,
  otpBoxRef,
}) => {
  
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-semibold text-center mb-6">Verify OTP</h1>
        <form onSubmit={handleSubmit}>
          {isTimerExpired ? (
            <p className="text-red-500 text-center">OTP Expired</p>
          ) : (
            <div>
              <p className="text-center">{otp?.otpCountDown} seconds</p>
            </div>
          )}

          <div className="flex justify-between mb-4">
            {otpData.map((digit, idx) => (
              <input
                key={idx}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(e, idx)}
                ref={(reference) => {
                  if (otpBoxRef.current) {
                    otpBoxRef.current[idx] = reference; 
                  }
                }}
                className="w-12 h-12 text-center border-2 border-gray-300 rounded-md"
              />
            ))}
          </div>

          <button
            type="submit"
            className="w-full py-2 mt-4 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={isTimerExpired ? (e) => handleResendOtp(e) : undefined}
          >
            {isTimerExpired ? "Resend OTP" : "Verify OTP"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OtpForm;
