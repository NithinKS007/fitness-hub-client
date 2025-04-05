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

export const changePasswordValidationSchema = () => {
  return Yup.object({
    password: Yup.string()
      .matches(
        passwordRegex,
        "*Password must contain at least 8 characters, including one uppercase, one lowercase, one number, and one special character"
      )
      .required("*Password is required"),

    newPassword: Yup.string()
      .matches(
        passwordRegex,
        "*Password must contain at least 8 characters, including one uppercase, one lowercase, one number, and one special character"
      )
      .required("*New password is required"),

    cPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), ""], "*Passwords must match")
      .required("*Confirm password is required"),
  });
};

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

export const imageSchema = Yup.mixed()
  .notRequired()
  .test(
    "fileSize",
    "File size too large. Maximum size is 20MB",
    (value: any) => value && value.size <= 20 * 1024 * 1024
  )
  .test(
    "fileFormat",
    "Unsupported file format. Allowed formats: jpg, jpeg, png",
    (value: any) => {
      if (!value) return false;
      const supportedFormats = ["image/jpeg", "image/png", "image/jpg"];
      return supportedFormats.includes(value.type);
    }
  );

export const pdfSchema = Yup.mixed()
  .notRequired()
  .test(
    "fileSize",
    "File size too large. Maximum size is 20MB",
    (value: any) => value && value.size <= 20 * 1024 * 1024
  )
  .test(
    "fileFormat",
    "Unsupported file format. Only PDF files are allowed",
    (value: any) => {
      if (!value) return false;
      const supportedFormats = ["application/pdf"];
      return supportedFormats.includes(value.type);
    }
  );

export const updateProfileValidationSchema = (role: Role) => {
  return Yup.object({
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
  });
};

export const subscriptionValidationSchema = Yup.object({
  subPeriod: Yup.string().required("Subscription period is required"),
  price: Yup.number()
    .required("Price is required")
    .min(0, "Price cannot be negative")
    .moreThan(0, "Price must be greater than zero"),
  sessionsPerWeek: Yup.number()
    .required("Sessions per week is required")
    .min(1, "Sessions per week cannot be less than 1"),
  durationInWeeks: Yup.number().required("Duration in weeks is required"),
  totalSessions: Yup.number().required("Total sessions is required"),
});

export const createPlayListSchema = Yup.object({
  title: Yup.string()
    .required("Playlist title is required")
    .min(3, "Title must be at least 3 characters long")
    .max(100, "Title can't be more than 100 characters"),
});

export const videoCreationSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must not exceed 100 characters")
    .required("Title is required"),
  description: Yup.string()
    .max(500, "Description must not exceed 500 characters")
    .required("Description is required"),
  video: Yup.mixed()
    .required("Video file is required")
    .test("fileType", "Unsupported video format", (value) => {
      return (
        value &&
        ["video/mp4", "video/webm", "video/ogg"].includes((value as File).type)
      );
    }),
  thumbnail: Yup.mixed()
    .required("Thumbnail image is required")
    .test("fileSize", "Thumbnail file is too large", (value) => {
      return value && (value as File).size <= 20 * 1024 * 1024;
    })
    .test("fileType", "Unsupported image format", (value) => {
      return (
        value &&
        ["image/jpeg", "image/png", "image/gif", "image/webp"].includes(
          (value as File).type
        )
      );
    }),
  playLists: Yup.array()
    .of(Yup.string())
    .min(1, "One playlist is required")
    .required("Playlists are required"),
});

export const createSlotSchema = Yup.object().shape({
  date: Yup.string()
    .required("Date is required")
    .test("is-future-date", "Date must be today or in the future", (value) => {
      if (!value) return false;
      const selectedDate = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return selectedDate >= today;
    }),
  time: Yup.string()
    .required("Time is required")
    .matches(
      /^\d{2}:\d{2} (AM|PM)$/,
      "Time must be in valid format (e.g., 01:30 PM)"
    ),
});

export const workoutValidationSchema = Yup.object({
  selectedBodyPart: Yup.string().required("Body part is required"),
  workouts: Yup.array()
    .of(
      Yup.object({
        bodyPart: Yup.string().required("Body part is required"), 
        exercise: Yup.string().required("Exercise name is required"), 
        kg: Yup.number()
          .min(0, "Kg must be positive")
          .required("Kg is required"),
        reps: Yup.number()
          .min(1, "Reps must be at least 1")
          .required("Reps is required"),
        time: Yup.number()
          .min(0, "Time must be positive")
          .required("Time is required"),
      })
    )
    .min(1, "At least one workout is required"),
});
