import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axios";
import {
  User,
  ResendOtpRequest,
  verifyOtpRequest,
  RequestSignin,
  RequestGenLink,
  RequestPasswordChange,
  RequestGoogleAuth,
  SignupUser,
  SignupTrainer,
  RequestUpdatePassword,
  Trainer,
} from "./authTypes";

export const signUpUser = createAsyncThunk(
  "auth/signUpUser",
  async ({ userData }: { userData: SignupUser }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("auth/sign-up", userData);
      return response.data;
    } catch (error: any) {
      console.log(error);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Failed to create user");
      }
    }
  }
);

export const resendOtp = createAsyncThunk(
  "auth/resendOtp",
  async ({ email }: ResendOtpRequest, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("auth/resend-otp", { email });
      return response.data;
    } catch (error: any) {
      console.log(error);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Failed to resend otp");
      }
    }
  }
);

export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async ({ email, otp }: verifyOtpRequest, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("auth/verify-otp", {
        email,
        otp,
      });
      return response.data;
    } catch (error: any) {
      console.log(error);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Failed to verify otp");
      }
    }
  }
);

export const signinUser = createAsyncThunk(
  "auth/signinUser",
  async ({ email, password }: RequestSignin, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("auth/sign-in", {
        email,
        password,
      });
      return response.data;
    } catch (error: any) {
      console.log(error);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Failed to signin");
      }
    }
  }
);

export const forgotPassLink = createAsyncThunk(
  "auth/forgotPassLink",
  async ({ email }: RequestGenLink, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("auth/forgot-password", {
        email,
      });
      return response.data;
    } catch (error: any) {
      console.log(error);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Failed to generateLink");
      }
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async ({ password, token }: RequestPasswordChange, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(
        `auth/forgot-password/${token}`,
        { password }
      );
      return response.data;
    } catch (error: any) {
      console.log(error);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Failed to reset forgotpassword");
      }
    }
  }
);

export const googleAuth = createAsyncThunk(
  "auth/googleAuth",
  async ({ token }: RequestGoogleAuth, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`auth/google/`, { token });
      return response.data;
    } catch (error: any) {
      console.log(error);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Failed to verify google user");
      }
    }
  }
);

export const trainerEntroll = createAsyncThunk(
  "auth/trainerEntroll",
  async (trainerData: SignupTrainer, { rejectWithValue }) => {
    console.log(trainerData, "for send");
    try {
      const response = await axiosInstance.post(
        `auth/trainer-entroll/`,
        trainerData
      );
      return response.data;
    } catch (error: any) {
      console.log(error);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Failed to create trainer");
      }
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "auth/updateUserProfile",
  async ({ userData }: { userData: User }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        `user/update-profile/`,
        userData
      );
      return response.data;
    } catch (error: any) {
      console.log(error);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Failed to update user profile ");
      }
    }
  }
);

export const updateTrainerProfile = createAsyncThunk(
  "auth/updateTrainerProfile",
  async ({ TrainerData }: { TrainerData: Trainer }, { rejectWithValue }) => {
    console.log("trainer data for updating the profile", TrainerData);
    try {
      const response = await axiosInstance.put(
        `trainer/update-profile/`,
        TrainerData
      );
      return response.data;
    } catch (error: any) {
      console.log(error);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Failed to update trainer profile ");
      }
    }
  }
);

export const signOutUser = createAsyncThunk(
  "auth/signOutUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`auth/sign-out/`);
      return response.data;
    } catch (error: any) {
      console.log(error);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Failed to signout");
      }
    }
  }
);

export const updatePassword = createAsyncThunk(
  "auth/updatePassword",
  async (
    { password, newPassword }: RequestUpdatePassword,
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.patch(`auth/update-password`, {
        password,
        newPassword,
      });
      return response.data;
    } catch (error: any) {
      console.log(error);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Failed to update password");
      }
    }
  }
);
