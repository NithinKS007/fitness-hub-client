import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axios";
import {
  User,
  ResendOtp,
  VerifyOtp,
  Signin,
  PasswordChange,
  GoogleAuth,
  SignupUser,
  SignupTrainer,
  UpdatePassword,
  Trainer,
} from "./authTypes";

export const signUpUser = createAsyncThunk(
  "auth/signUpUser",
  async ({ userData }: { userData: SignupUser }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("auth/user/sign-up", userData);
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
  async ({ email }: ResendOtp, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("auth/otp/resend", { email });
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
  async ({ email, otp }: VerifyOtp, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("auth/otp/verify", {
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
  async ({ email, password }: Signin, { rejectWithValue }) => {
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
  async (data: { email: string }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("auth/password-reset", {
        email: data.email,
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
  async ({ password, token }: PasswordChange, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(`auth/password-reset/${token}`, {
        password,
      });
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
  async ({ token }: GoogleAuth, { rejectWithValue }) => {
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
    try {
      const response = await axiosInstance.post(
        `auth/trainer/sign-up/`,
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
      const response = await axiosInstance.put(`user/profile/`, userData);
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
      const response = await axiosInstance.put(`trainer/profile/`, TrainerData);
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
  async ({ password, newPassword }: UpdatePassword, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(`auth/password/change`, {
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

export const refreshAT = createAsyncThunk(
  "auth/refreshAT",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/auth/refresh-token");
      const { newAccessToken } = response.data.data;
      return newAccessToken;
    } catch (error: any) {
      console.log(error);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Failed to refresh access token");
      }
    }
  }
);
