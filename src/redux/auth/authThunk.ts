import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axios";
import { User, ResendOtpRequest, verifyOtpRequest,RequestSignin,RequestGenLink, RequestPasswordChange,RequestGoogleAuth } from "./authTypes";

export const signUpUser = createAsyncThunk(
  "auth/signUpUser",
  async ({ userData }: { userData: User }, { rejectWithValue }) => {
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
  async ({ email,otp }: verifyOtpRequest, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("auth/verify-otp", { email,otp });
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
  async({email,password}:RequestSignin,{rejectWithValue}) => {
     try {
       const response = await axiosInstance.post("auth/sign-in",{email,password})
       return response.data
     } catch (error:any) {
      console.log(error);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Failed to signin");
      }
     }
  }
)

export const forgotPassLink = createAsyncThunk(
  "auth/forgotPassLink",
  async ({email}:RequestGenLink,{rejectWithValue}) => {
    try {
      const response = await axiosInstance.post("auth/forgot-password",{email})
      return response.data
    } catch (error:any) {
      console.log(error);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Failed to generateLink");
      }
    }
  }
)

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async ({ password, token }: RequestPasswordChange, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(`auth/forgot-password/${token}`, { password });
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
  async({token}:RequestGoogleAuth,{rejectWithValue}) => {
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
)

