import React from "react";
import { Box, Button, Typography, TextField, Grid } from "@mui/material";

const authImage = import.meta.env.VITE_AUTHENTICATION_PAGE_IMAGE;

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
  otpBoxRef: React.RefObject<(HTMLInputElement | null)[]>;
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
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "grey.100",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          width: "100%",
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            width: { xs: "100%", md: "50%" },
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh", 
            bgcolor: "black", 
            overflow: "hidden", 
          }}
        >
          <Box
            component="img"
            src={authImage}
            alt="Fitness Couple"
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover", 
              display: "block",
            }}
          />
        </Box>
        <Box
          sx={{
            width: { xs: "100%", md: "50%" },
            p: 4,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box sx={{ width: "100%", maxWidth: "400px", textAlign: "center" }}>
            <Typography variant="h5" gutterBottom>
              Verify OTP
            </Typography>

            <form onSubmit={handleSubmit}>
              {isTimerExpired ? (
                <Typography color="error" variant="body2" align="center">
                  OTP Expired
                </Typography>
              ) : (
                <Typography align="center" variant="body2">
                  {otp?.otpCountDown !== undefined
                    ? `${otp.otpCountDown}s`
                    : "Loading..."}
                </Typography>
              )}

              <Grid container spacing={2} justifyContent="center" sx={{ mt: 3 }}>
                {otpData.map((digit, idx) => (
                  <Grid item key={idx}>
                    <TextField
                      value={digit}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleOtpChange(e, idx)
                      }
                      inputRef={(reference) => {
                        if (otpBoxRef.current) {
                          otpBoxRef.current[idx] = reference;
                        }
                      }}
                      sx={{
                        width: 50,
                        height: 50,
                        textAlign: "center",
                        "& .MuiInputBase-input": {
                          textAlign: "center",
                        },
                      }}
                      variant="outlined"
                      inputProps={{
                        maxLength: 1,
                        style: { textAlign: "center" },
                      }}
                    />
                  </Grid>
                ))}
              </Grid>

              <Button
                type="submit"
                fullWidth
                sx={{
                  mt: 3,
                  bgcolor: "black",
                  "&:hover": {
                    bgcolor: "grey.800",
                  },
                  color: "white",
                  height: "50px",
                }}
                onClick={isTimerExpired ? (e) => handleResendOtp(e) : undefined}
              >
                {isTimerExpired ? "Resend OTP" : "Verify OTP"}
              </Button>
            </form>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default OtpForm;