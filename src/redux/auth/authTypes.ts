export type Role = "user" | "admin" | "trainer";

export interface User {
  fname: string;
  lname: string;
  email: string;
  password: string;
  role?: Role;
}
export interface Otp {
  otpEmail: string;
  otpCountDown: number;
  otpExpireTime: string;
}

export interface AuthUser {
  otp: Otp | null;
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

export interface ResendOtpRequest {
  email: string;
}

export interface verifyOtpRequest {
  email: string;
  otp: string;
}

export interface RequestSignin {
  email: string;
  password: string;
}

export interface RequestGenLink {
  email: string;
}

export interface RequestPasswordChange {
  token:string
  password: string;
}

export interface RequestGoogleAuth{
  token:string
}