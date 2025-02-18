import { Role } from "../redux/auth/authTypes";
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

    ...emailValidationSchema.fields,

    password: Yup.string()
      .matches(
        passwordRegex,
        "*Password must contain at least 8 characters, including one uppercase, one lowercase, one number, and one special character"
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

    ...emailValidationSchema.fields,

    password: Yup.string()
      .matches(
        passwordRegex,
        "*Password must contain at least 8 characters, including one uppercase, one lowercase, one number, and one special character"
      )
      .required("*Password is required"),

    cPassword: Yup.string()
      .oneOf([Yup.ref("password"), ""], "*Passwords must match")
      .required("*Confirm password is required"),

    dateOfBirth: Yup.date().required("Date of Birth is required"),

    phone: Yup.string()
      .matches(phoneRegex, "*Phone number must be 10 digits")
      .required("*Phone number is required"),

    yearsOfExperience: Yup.number()
      .min(1, "*Experience must be at least 1 year")
      .required("*Years of experience is required"),
  });
};

export const updateProfileValidationSchema = (role: Role) => {
  const c =  Yup.object({
    fname: Yup.string()
      .matches(nameRegex, "*Name can only contain letters and spaces")
      .required("*First name is required"),

    lname: Yup.string()
      .matches(nameRegex, "*Name can only contain letters and spaces")
      .required("*Last name is required"),

    phone:
      role === "trainer"
        ? Yup.string()
            .matches(phoneRegex, "*Phone number must be 10 digits")
            .required("*Phone number is required")
        : Yup.string()
            .matches(phoneRegex, "*Phone number must be 10 digits")
            .notRequired(),
    dateOfBirth:
      role === "trainer"
        ? Yup.date().required("Date of Birth is required")
        : Yup.date().notRequired(),

    yearsOfExperience:
      role === "trainer"
        ? Yup.number()
            .min(1, "*Experience must be at least 1 year")
            .required("*Years of experience is required")
        : Yup.number().notRequired(),

    gender:
      role === "user"
        ? Yup.string()
            .oneOf(
              ["male", "female"],
              "*Gender must be 'male', 'female', or 'other'"
            )
            .notRequired()
        : Yup.string().notRequired(),

    age:
      role === "user"
        ? Yup.number()
            .min(18, "*Age must be at least 18")
            .max(120, "*Age must be a valid age between 18 and 120")
            .notRequired()
        : Yup.number().notRequired(),

    height:
      role === "user"
        ? Yup.number()
            .min(30, "*Height must be at least 30 cm")
            .max(300, "*Height must be less than or equal to 300 cm")
            .notRequired()
        : Yup.number().notRequired(),

    weight:
      role === "user"
        ? Yup.number()
            .min(10, "*Weight must be at least 10 kg")
            .max(300, "*Weight must be less than or equal to 300 kg")
            .notRequired()
        : Yup.number().notRequired(),
    bloodGroup:
      role === "user"
        ? Yup.string()
            .matches(
              /^(A|B|AB|O)[+-]$/,
              "*Please enter a valid blood group (e.g. A+, B-, AB+, O-)"
            )
            .notRequired()
        : Yup.string().notRequired(),
    medicalConditions:
      role === "user"
        ? Yup.string()
            .max(300, "*Medical conditions must be less than 300 characters")
            .notRequired()
        : Yup.string().notRequired(),
    otherConcerns:
      role === "user"
        ? Yup.string()
            .max(500, "*Other concerns must be less than 500 characters")
            .notRequired()
        : Yup.string().notRequired(),
    certifications:
      role === "trainer"
        ? Yup.array()
            .of(
              Yup.mixed()
                .test(
                  "fileFormat",
                  "*Only PDF files are allowed",
                  (file) => file && (file as File).type === "application/pdf"
                )
                .test(
                  "fileSize",
                  "*File size must be less than 25MB",
                  (file) => file && (file as File).size <= 25 * 1024 * 1024
                )
            )
            .notRequired()
        : Yup.array().notRequired(),
  });

  console.log(c)
  return c
};
