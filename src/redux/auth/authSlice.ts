import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthUser, Otp } from "./authTypes";
import {
  resendOtp,
  signUpUser,
  verifyOtp,
  signinUser,
  forgotPassLink,
  forgotPassword,
  googleAuth,
  trainerEntroll,
} from "./authThunk";

const initialState: AuthUser = {
  otp: null,
  user: null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setOtp: (state, action: PayloadAction<Otp>) => {

      console.log("otp",action.payload)
      state.otp = action.payload;
    },
    updateOtpCountDown: (state, action: PayloadAction<number>) => {
      console.log("count",action.payload)
      if (state.otp) {
        state.otp.otpCountDown = action.payload
      }
    },
    setUser: (state, action) => {
      console.log("user",action.payload)
      state.user = action.payload;
    },
    clearOtpDetails: (state) => {
      state.otp = null;
    },
  },
  extraReducers: (builder) => {
    builder
      //handle signup user
      .addCase(signUpUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signUpUser.fulfilled, (state) => {
        (state.isLoading = false), (state.error = null);
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to create user";
      })
      //handle resendOtp
      .addCase(resendOtp.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resendOtp.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(resendOtp.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to resend otp";
      })
      //handle verifyOtp
      .addCase(verifyOtp.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyOtp.fulfilled, (state) => {
        state.isLoading = true;
        state.otp = null;
        state.error = null;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to verify otp";
      })
      //handle signin user
      .addCase(signinUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signinUser.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(signinUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to signin user";
      })
      //handle forgotPassword
      .addCase(forgotPassLink.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(forgotPassLink.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(forgotPassLink.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to send link";
      })
      //handle resetPassword
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to reset password ";
      })
      //handle google authentication
      .addCase(googleAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(googleAuth.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(googleAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to verify google user ";
      })
      .addCase(trainerEntroll.pending,(state) => {
        state.isLoading = true
      })
      .addCase(trainerEntroll.fulfilled,(state)=>{
        (state.isLoading = false), (state.error = null);
      })
      .addCase(trainerEntroll.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to create trainer";
      })
  },
});

export const { setOtp, updateOtpCountDown, setUser, clearOtpDetails } = authSlice.actions;
export default authSlice.reducer;
