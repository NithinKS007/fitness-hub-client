import * as Yup from "yup";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const nameRegex = /^[A-Za-z\s]+$/;
const phoneRegex = /^[0-9]{10}$/;

export const emailSchema = Yup.object({
  email: Yup.string()
    .matches(emailRegex, "*Invalid email format")
    .required("*Email is required"),
});

export const passwordSchema = Yup.object({
  password: Yup.string()
    .matches(
      passwordRegex,
      `*Password must contain at least 8 characters, including one uppercase, 
         one lowercase, one number, and one special character`
    )
    .required("*Password is required"),
});

export const userSignUpSchema = Yup.object({
  fname: Yup.string()
    .matches(nameRegex, "*Name can only contain letters and spaces")
    .required("*First name is required"),
  lname: Yup.string()
    .matches(nameRegex, "*Name can only contain letters and spaces")
    .required("*Last name is required"),
  ...emailSchema.fields,
  ...passwordSchema.fields,
  cPassword: Yup.string()
    .oneOf([Yup.ref("password"), ""], "*Passwords must match")
    .required("*Confirm password is required"),
});

export const trainerSignUpSchema = Yup.object({
  fname: Yup.string()
    .matches(nameRegex, "*Name can only contain letters and spaces")
    .required("*First name is required"),

  lname: Yup.string()
    .matches(nameRegex, "*Name can only contain letters and spaces")
    .required("*Last name is required"),

  ...emailSchema.fields,

  ...passwordSchema.fields,

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

export const signInSchema = Yup.object({
  ...emailSchema.fields,
  ...passwordSchema.fields,
});

export const resetPasswordSchema = Yup.object({
  ...passwordSchema.fields,
  cPassword: Yup.string()
    .oneOf([Yup.ref("password"), ""], "*Passwords must match")
    .required("*Confirm password is required"),
});

export const changePasswordSchema = Yup.object({
  password: passwordSchema,
  newPassword: passwordSchema,
  cPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), ""], "*Passwords must match")
    .required("*Confirm password is required"),
});

export const imageSchema = Yup.mixed()
  .notRequired()
  .test(
    "fileSize",
    "*File size too large. Maximum size is 20MB",
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
    "*File size too large. Maximum size is 20MB",
    (value: any) => value && value.size <= 20 * 1024 * 1024
  )
  .test(
    "fileFormat",
    "*Unsupported file format. Only PDF files are allowed",
    (value: any) => {
      if (!value) return false;
      const supportedFormats = ["application/pdf"];
      return supportedFormats.includes(value.type);
    }
  );

export const userSchema = Yup.object({
  fname: Yup.string()
    .matches(nameRegex, "*Name can only contain letters and spaces")
    .required("*First name is required"),

  lname: Yup.string()
    .matches(nameRegex, "*Name can only contain letters and spaces")
    .required("*Last name is required"),

  phone: Yup.string()
    .matches(phoneRegex, "*Phone number must be 10 digits")
    .notRequired(),

  dateOfBirth: Yup.date().notRequired(),

  gender: Yup.string()
    .oneOf(
      ["male", "female", "other"],
      "*Gender must be 'male', 'female', or 'other'"
    )
    .notRequired(),

  age: Yup.number()
    .min(18, "*Age must be at least 18")
    .max(120, "*Age must be a valid age between 18 and 120")
    .notRequired(),

  height: Yup.number()
    .min(30, "*Height must be at least 30 cm")
    .max(300, "*Height must be less than or equal to 300 cm")
    .notRequired(),

  weight: Yup.number()
    .min(10, "*Weight must be at least 10 kg")
    .max(300, "*Weight must be less than or equal to 300 kg")
    .notRequired(),

  bloodGroup: Yup.string()
    .matches(
      /^(A|B|AB|O)[+-]$/,
      "*Please enter a valid blood group (e.g. A+, B-, AB+, O-)"
    )
    .notRequired(),

  medicalConditions: Yup.string()
    .max(300, "*Medical conditions must be less than 300 characters")
    .notRequired(),

  otherConcerns: Yup.string()
    .max(500, "*Other concerns must be less than 500 characters")
    .notRequired(),
});

export const trainerSchema = Yup.object({
  fname: Yup.string()
    .matches(nameRegex, "*Name can only contain letters and spaces")
    .required("*First name is required"),

  lname: Yup.string()
    .matches(nameRegex, "*Name can only contain letters and spaces")
    .required("*Last name is required"),

  phone: Yup.string()
    .matches(phoneRegex, "*Phone number must be 10 digits")
    .required("*Phone number is required"),

  dateOfBirth: Yup.date().required("Date of Birth is required"),

  gender: Yup.string().notRequired(),

  age: Yup.number().notRequired(),

  height: Yup.number().notRequired(),

  weight: Yup.number().notRequired(),

  bloodGroup: Yup.string().notRequired(),

  medicalConditions: Yup.string().notRequired(),
  trainerDetails: Yup.object({
    aboutMe: Yup.string().notRequired(),
    yearsOfExperience: Yup.number()
      .min(1, "*Experience must be at least 1 year")
      .required("*Years of experience is required"),
    certifications: Yup.array().of(Yup.string()).notRequired(),
    specializations: Yup.array().of(Yup.string()).notRequired(),
  }),
  otherConcerns: Yup.string().notRequired(),
});

export const subscriptionSchema = Yup.object({
  subPeriod: Yup.string().required("Subscription period is required"),
  price: Yup.number()
    .required("*Price is required")
    .min(0, "*Price cannot be negative")
    .moreThan(0, "*Price must be greater than zero"),
  sessionsPerWeek: Yup.number()
    .required("*Sessions per week is required")
    .min(1, "*Sessions per week cannot be less than 1"),
  durationInWeeks: Yup.number().required("*Duration in weeks is required"),
  totalSessions: Yup.number().required("*Total sessions is required"),
});

export const playListSchema = Yup.object({
  title: Yup.string()
    .required("*Playlist title is required")
    .min(3, "*Title must be at least 3 characters long")
    .max(100, "*Title can't be more than 100 characters"),
});

export const videoFileSchema = Yup.mixed()
  .required("*Video is required")
  .test("fileType", "*Unsupported video format", (value) => {
    return (
      value &&
      ["video/mp4", "video/webm", "video/ogg"].includes((value as File).type)
    );
  });

export const thumbnailFileSchema = Yup.mixed()
  .required("*Thumbnail is required")
  .test("fileSize", "*Thumbnail file is too large", (value) => {
    return value && (value as File).size <= 20 * 1024 * 1024;
  })
  .test("fileType", "*Unsupported image format", (value) => {
    return (
      value &&
      ["image/jpeg", "image/png", "image/gif", "image/webp"].includes(
        (value as File).type
      )
    );
  });

export const videoSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "*Title must be at least 3 characters")
    .max(100, "*Title must not exceed 100 characters")
    .required("*Title is required"),
  description: Yup.string()
    .min(3, "*Description must be at least 3 characters")
    .max(500, "*Description must not exceed 500 characters")
    .required("*Description is required"),
  playLists: Yup.array()
    .of(Yup.string())
    .min(1, "*Playlist is required")
    .required("*Playlists are required"),
  duration: Yup.number()
    .min(0, "*Duration cannot be negative")
    .required("*Duration is required"),
});

export const slotSchema = Yup.object().shape({
  date: Yup.string()
    .required("*Date is required")
    .test("is-future-date", "*Date must be today or in the future", (value) => {
      if (!value) return false;
      const selectedDate = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return selectedDate >= today;
    }),
  time: Yup.string()
    .required("*Time is required")
    .matches(
      /^\d{2}:\d{2} (AM|PM)$/,
      "Time must be in valid format (e.g., 01:30 PM)"
    ),
});

export const workoutSchema = Yup.object({
  selectedBodyPart: Yup.string().required("*Body part is required"),
  workouts: Yup.array()
    .of(
      Yup.object({
        bodyPart: Yup.string().required("*Body part is required"),
        exercise: Yup.string().required("*Exercise name is required"),
        kg: Yup.number()
          .min(1, "*Kg must be at least 1")
          .required("*Kg is required"),
        reps: Yup.number()
          .min(1, "*Reps must be at least 1")
          .required("*Reps is required"),
        time: Yup.number()
          .min(1, "*Time must be at least 1")
          .required("*Time is required"),
      })
    )
    .min(1, "*At least one workout is required"),
});
