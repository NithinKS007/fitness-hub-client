export interface User {
  fname: string;
  lname: string;
  email: string;
  password: string;
}
export interface Otp {
  otpEmail: string;
  otpCountDown: number;
  otpExpireTime: string;
}

export interface AuthUser {
  Otp: Otp | null;
  user: User | null;
  isLoading: boolean;
  error: string | null;
}
