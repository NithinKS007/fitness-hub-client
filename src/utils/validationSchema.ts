import { SignState } from "../types/authTypes";
import * as Yup from "yup";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const nameRegex = /^[A-Za-z\s]+$/;
const phoneRegex = /^[0-9]{10}$/;

export const userAuthvalidationSchema = (formState: SignState) => {
  return Yup.object({
    fname:
      formState === "sign up"
        ? Yup.string()
            .matches(nameRegex, "*Name can only contain letters and spaces")
            .required("*First name is required")
        : Yup.string(),

    lname:
      formState === "sign up"
        ? Yup.string()
            .matches(nameRegex, "*Name can only contain letters and spaces")
            .required("*Last name is required")
        : Yup.string(),

    email: Yup.string()
      .matches(emailRegex, "*Invalid email format")
      .required("*Email is required"),
    password: Yup.string()
      .matches(
        passwordRegex,
        `*Password must contain at least 8 characters, including one uppercase, one lowercase, 
        one number, and one special character`
      )
      .required("*Password is required"),
    cPassword:
      formState === "sign up"
        ? Yup.string()
            .oneOf([Yup.ref("password"), ""], "*Passwords must match")
            .required("*Confirm password is required")
        : Yup.string(),
  });
};

export const emailValidationSchema = Yup.object({
  email: Yup.string()
    .matches(emailRegex, "*Invalid email format")
    .required("*Email is required"),
});

export const passwordValidationSchema = Yup.object({
  password: Yup.string()
    .matches(
      passwordRegex,
      "*Password must contain at least 8 characters, including one uppercase, one lowercase, one number, and one special character"
    )
    .required("*Password is required"),

  cPassword: Yup.string()
    .oneOf([Yup.ref("password"), ""], "*Passwords must match")
    .required("*Confirm password is required"),
});

export const trainerEntrollValidationSchema = () => {
  return Yup.object({
    fname: Yup.string()
      .matches(nameRegex, "*Name can only contain letters and spaces")
      .required("*First name is required"),

    lname: Yup.string()
      .matches(nameRegex, "*Name can only contain letters and spaces")
      .required("*Last name is required"),

    email: Yup.string()
      .matches(emailRegex, "*Invalid email format")
      .required("*Email is required"),

    password: Yup.string()
      .matches(
        passwordRegex,
        `*Password must contain at least 8 characters, including one uppercase, one lowercase, 
        one number, and one special character`
      )
      .required("*Password is required"),
    dateOfBirth: Yup.date()
      .required("Date of Birth is required"),
    cPassword: Yup.string()
      .oneOf([Yup.ref("password"), ""], "*Passwords must match")
      .required("*Confirm password is required"),
    phone: Yup.string()
      .matches(phoneRegex, "*Phone number must be 10 digits")
      .required("*Phone number is required"),

    yearsOfExperience: Yup.number()
      .min(1, "*Experience must be at least 1 year")
      .required("*Years of experience is required"),
  });
};
