export interface UserAuthFormData {
  fname: string;
  lname: string;
  email: string;
  password: string;
  cPassword:string
}
export type SignState = "sign in" | "sign up";