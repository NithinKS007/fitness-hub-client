import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthUser, Otp } from "./authTypes";
import { signUpUser } from "./authThunk";

const initialState: AuthUser = {
  Otp: null,
  user: null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setOtp: (state, action: PayloadAction<Otp>) => {
      state.Otp = action.payload;
      console.log(state.Otp)
    },
    updateOtpCountDown: (state, action: PayloadAction<number>) => {
      if (state.Otp) {
        state.Otp.otpCountDown = action.payload;
      }
    },
    clearOtp: (state) => {
      state.Otp = null;
    },
  },
  extraReducers: (builder) => {
    builder
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
      });
  },
});

export const { setOtp, clearOtp,updateOtpCountDown } = authSlice.actions;
export default authSlice.reducer;
