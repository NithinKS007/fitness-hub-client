import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Auth, Otp } from "./authTypes";
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
  updateTrainerProfile,
} from "./authThunk";

const initialState: Auth = {
  otp: null,
  user: null,
  trainer: null,
  admin: null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setOtp: (state, action: PayloadAction<Otp>) => {
      state.otp = action.payload;
    },
    updateOtpCountDown: (state, action: PayloadAction<number>) => {
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
    setTrainer: (state, action) => {
      state.trainer = action.payload;
    },
    setAdmin: (state, action) => {
      state.admin = action.payload;
    },
    clearAuthPerson: (state) => {
      state.user = null;
      state.admin = null;
      state.trainer = null;
    },
  },
  extraReducers: (builder) => {
    builder
      //signup user
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
      //resendOtp
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
      //verifyOtp
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
      //signin user
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
      //forgotPassword
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
      //resetPassword
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
      //google authentication
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
      //trainer entrollment
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

      //update user profile
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

      //update trainer profile
      .addCase(updateTrainerProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTrainerProfile.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(updateTrainerProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to update trainer profile";
      })

      //sign out user
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
      });
  },
});

export const {
  setOtp,
  updateOtpCountDown,
  setUser,
  setAdmin,
  setTrainer,
  clearOtpDetails,
  clearAuthPerson,
} = authSlice.actions;
export default authSlice.reducer;
