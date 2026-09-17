import { Subscription } from "../subscription/subscriptionTypes";

export type Role = "user" | "admin" | "trainer";
export interface User {
  id: string;
  fname: string;
  lname: string;
  email: string;
  password?: string;
  role?: Role;
  isBlocked?: boolean;
  otpVerified?: boolean;
  googleVerified?: boolean;
  phone?: string;
  profilePic?: string;
  createdAt?: string;
  updatedAt?: string;
  dateOfBirth?: string;
  age?: string;
  gender?: "male" | "female";
  height?: string;
  weight?: string;

  bloodGroup?: string;
  medicalConditions?: string;
  otherConcerns?: string;
}

export interface Admin {
  id: string;
  fname: string;
  lname: string;
  email: string;
  password: string;
  role?: Role;
  isBlocked?: boolean;
  otpVerified?: boolean;
  googleVerified?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Trainer {
  id: string;
  fname: string;
  lname: string;
  email: string;
  password?: string;
  role?: Role;
  isBlocked?: boolean;
  otpVerified?: boolean;
  googleVerified?: boolean;
  phone?: string;
  profilePic?: string;
  createdAt?: string;
  updatedAt?: string;
  dateOfBirth?: string;
  age?: string;
  gender?: "male" | "female";
  height?: string;
  weight?: string;
  bloodGroup?: string;
  medicalConditions?: string;
  otherConcerns?: string;

  trainerDetails: {
    id: string;
    userId: string;
    yearsOfExperience?: string;
    specializations?: string[];
    certifications?: { fileName: string; url: string }[];
    isApproved?: boolean;
    aboutMe?: string;
  };
}

export interface TrainerWithSubscriptionDetails extends Trainer {
  subscriptionDetails: Subscription[];
}

export interface SignupUser {
  fname: string;
  lname: string;
  email: string;
  password: string;
}

export interface SignupTrainer extends SignupUser {
  phone?: string;
  dateOfBirth?: string;
  yearsOfExperience?: string;
}

export interface Otp {
  otpEmail: string;
  otpCountDown: number;
  otpExpireTime: string;
}

export interface Auth {
  otp: Otp | null;
  user: User | null;
  trainer: Trainer | null;
  admin: Admin | null;
  isLoading: boolean;
  error: string | null;
  accessToken: string | null;
  isAuthenticated: boolean;
}

export interface ResendOtp {
  email: string;
}

export interface VerifyOtp {
  email: string;
  otp: string;
}

export interface Signin {
  email: string;
  password: string;
}


export interface PasswordChange {
  token: string;
  password: string;
}

export interface GoogleAuth {
  token: string;
}

export interface UpdatePassword {
  password: string;
  newPassword: string;
}
