export interface UserAuthFormData {
  fname: string;
  lname: string;
  email: string;
  password: string;
  cPassword: string;
  phone?: string;
  dateOfBirth?: string | Date;
  yearsOfExperience?: string;
}
export type SignState = "sign in" | "sign up";
