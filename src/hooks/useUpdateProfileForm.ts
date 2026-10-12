import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { useFormik } from "formik";
import { trainerSchema, userSchema } from "../utils/validationSchema";
import {
  updateUserProfile,
  updateTrainerProfile,
} from "../redux/auth/authThunk";
import { showErrorToast, showSuccessToast } from "../utils/toast";
import { setTrainer, setUser } from "../redux/auth/authSlice";
import { imageSchema, pdfSchema } from "../utils/validationSchema";
import type { TrainerProfileUpdate, User } from "../redux/auth/authTypes";

type Certification = { fileName: string; url: string };
type ProfileData = Partial<User> & {
  trainerDetails?: {
    id?: string;
    userId?: string;
    yearsOfExperience?: string;
    specializations?: string[];
    certifications?: Certification[];
    aboutMe?: string;
  };
};

export type TrainerProfileFormValues = Omit<TrainerProfileUpdate, "id"> & {
  id: string;
};

const useUpdateProfileForm = (profileData: ProfileData | null | undefined) => {
  const dispatch = useDispatch<AppDispatch>();
  const profile = profileData ?? {};
  const trainerDetails = profile.trainerDetails ?? {};

  const handleTrainerProfilePicChange: React.ChangeEventHandler<
    HTMLInputElement
  > = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        await imageSchema.validate(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          trainerFormik.setFieldValue("profilePic", reader.result);
          trainerFormik.setFieldTouched("profilePic", true);
        };
        reader.readAsDataURL(file);
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Invalid image";
        showErrorToast(message);
        trainerFormik.setFieldError("profilePic", message);
        e.target.value = "";
      }
    }
  };

  const handleUserProfilePicChange: React.ChangeEventHandler<
    HTMLInputElement
  > = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        await imageSchema.validate(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          userFormik.setFieldValue("profilePic", reader.result);
          userFormik.setFieldTouched("profilePic", true);
        };
        reader.readAsDataURL(file);
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Invalid image";
        showErrorToast(message);
        userFormik.setFieldError("profilePic", message);
        e.target.value = "";
      }
    }
  };

  const handlePdfChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const selectedFilesArray = Array.from(files);
      try {
        const filesData: Certification[] = [];
        for (const file of selectedFilesArray) {
          await pdfSchema.validate(file);
          const base64String = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(file);
          });
          filesData.push({ fileName: file.name, url: base64String });
        }
        trainerFormik.setFieldValue("certifications", [
          ...trainerFormik.values.certifications,
          ...filesData,
        ]);
        trainerFormik.setFieldTouched("certifications", true);
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Invalid PDF";
        showErrorToast(message);
        trainerFormik.setFieldError(
          "certifications",
          message
        );
        e.target.value = "";
      }
    }
  };

  const trainerFormik = useFormik<TrainerProfileFormValues>({
    initialValues: {
      id: profile.id ?? "",
      fname: profile.fname ?? "",
      lname: profile.lname ?? "",
      email: profile.email ?? "",
      dateOfBirth: profile.dateOfBirth ?? "",
      phone: profile.phone ?? "",
      profilePic: profile.profilePic ?? "",
      role: profile.role,
      gender: profile.gender,
      age: profile.age ?? "",
      height: profile.height ?? "",
      weight: profile.weight ?? "",
      bloodGroup: profile.bloodGroup ?? "",
      medicalConditions: profile.medicalConditions ?? "",
      otherConcerns: profile.otherConcerns ?? "",
      yearsOfExperience: trainerDetails.yearsOfExperience ?? "",
      aboutMe: trainerDetails.aboutMe ?? "",
      certifications: trainerDetails.certifications ?? [],
      specializations: trainerDetails.specializations ?? [],
    },
    validationSchema: trainerSchema,
    onSubmit: async (values) => {
      try {
        const response = await dispatch(
          updateTrainerProfile({
            TrainerData: {
              ...values,
              ...values,
            },
          })
        ).unwrap();
        dispatch(setTrainer(response.data));
        showSuccessToast(response.message);
      } catch (error) {
        console.log(`API Error ${error}`);
        showErrorToast(`${error}`);
      }
    },
    enableReinitialize: true,
  });

  const userFormik = useFormik<User>({
    initialValues: {
      id: profile.id ?? "",
      fname: profile.fname ?? "",
      lname: profile.lname ?? "",
      email: profile.email ?? "",
      dateOfBirth: profile.dateOfBirth ?? "",
      phone: profile.phone ?? "",
      profilePic: profile.profilePic ?? "",
      role: profile.role,
      gender: profile.gender,
      age: profile.age ?? "",
      height: profile.height ?? "",
      weight: profile.weight ?? "",
      bloodGroup: profile.bloodGroup ?? "",
      medicalConditions: profile.medicalConditions ?? "",
      otherConcerns: profile.otherConcerns ?? "",
    },
    validationSchema: userSchema,
    onSubmit: async (values) => {
      try {
        const response = await dispatch(
          updateUserProfile({
            userData: {
              ...values,
              role: values.role,
              gender: values.gender,
            },
          })
        ).unwrap();
        dispatch(setUser(response.data));
        showSuccessToast(response.message);
      } catch (error: unknown) {
        console.log(`API Error ${error}`);
        showErrorToast(`${error}`);
      }
    },
    enableReinitialize: true,
  });

  return {
    userFormik,
    trainerFormik,
    handleUserProfilePicChange,
    handleTrainerProfilePicChange,
    handlePdfChange,
  };
};

export default useUpdateProfileForm;
