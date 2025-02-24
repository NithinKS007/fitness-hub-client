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
  updateUserProfile,
  signOutUser,
  updatePassword,
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
      console.log("otp", action.payload);
      state.otp = action.payload;
    },
    updateOtpCountDown: (state, action: PayloadAction<number>) => {
      console.log("count", action.payload);
      if (state.otp) {
        state.otp.otpCountDown = action.payload;
      }
    },
    clearOtpDetails: (state) => {
      state.otp = null;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
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
      //handle trainer entrollment
      .addCase(trainerEntroll.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(trainerEntroll.fulfilled, (state) => {
        (state.isLoading = false), (state.error = null);
      })
      .addCase(trainerEntroll.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to create trainer";
      })
      //handle update user profile
      .addCase(updateUserProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserProfile.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to update user profile";
      })
      //handle sign out user
      .addCase(signOutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signOutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(signOutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to sign out user";
      })
      //change Password in user profile
      .addCase(updatePassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePassword.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to update password of the user";
      })
  },
});

export const { setOtp, updateOtpCountDown, setUser, clearOtpDetails ,clearUser } =
  authSlice.actions;
export default authSlice.reducer;
