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

const useUpdateProfileForm = (profileData: any) => {
  const dispatch = useDispatch<AppDispatch>();

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
      } catch (error: any) {
        showErrorToast(error.message);
        trainerFormik.setFieldError("profilePic", error);
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
      } catch (error: any) {
        showErrorToast(error.message);
        userFormik.setFieldError("profilePic", error);
        e.target.value = "";
      }
    }
  };

  const handlePdfChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const selectedFilesArray = Array.from(files);
      try {
        const filesData: any = [];
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
        trainerFormik.setFieldValue("trainerDetails.certifications", [
          ...trainerFormik.values.trainerDetails.certifications,
          ...filesData,
        ]);
        trainerFormik.setFieldTouched("trainerDetails.certifications", true);
      } catch (error: any) {
        showErrorToast(error.message);
        trainerFormik.setFieldError(
          "trainerDetails.certifications",
          error.message
        );
        e.target.value = "";
      }
    }
  };

  const trainerFormik = useFormik({
    initialValues: {
      id: profileData.id,
      fname: profileData.fname,
      lname: profileData.lname,
      email: profileData.email,
      dateOfBirth: profileData.dateOfBirth || "",
      phone: profileData.phone || "",
      profilePic: profileData.profilePic || "",
      role: profileData.role || undefined,
      gender: profileData.gender || undefined,
      age: profileData.age || "",
      height: profileData.height || "",
      weight: profileData.weight || "",
      bloodGroup: profileData.bloodGroup || "",
      medicalConditions: profileData.medicalConditions || "",
      otherConcerns: profileData.otherConcerns || "",
      trainerDetails: {
        id: profileData.trainerDetails?.id || "",
        aboutMe: profileData?.trainerDetails?.aboutMe || "",
        yearsOfExperience: profileData.trainerDetails?.yearsOfExperience || "",
        certifications: profileData.trainerDetails?.certifications || [],
        specializations: profileData.trainerDetails?.specializations || [],
        userId: profileData.trainerDetails?.userId || "",
      },
    },
    validationSchema: trainerSchema,
    onSubmit: async (values) => {
      try {
        const response = await dispatch(
          updateTrainerProfile({
            TrainerData: {
              ...values,
              trainerDetails: {
                ...values.trainerDetails,
                certifications:
                  trainerFormik.values.trainerDetails.certifications,
              },
              role: values.role,
              gender: values.gender,
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

  const userFormik = useFormik({
    initialValues: {
      id: profileData.id,
      fname: profileData.fname,
      lname: profileData.lname,
      email: profileData.email,
      dateOfBirth: profileData.dateOfBirth || "",
      phone: profileData.phone || "",
      profilePic: profileData.profilePic || "",
      role: profileData.role || undefined,
      gender: profileData.gender || undefined,
      age: profileData.age || "",
      height: profileData.height || "",
      weight: profileData.weight || "",
      bloodGroup: profileData.bloodGroup || "",
      medicalConditions: profileData.medicalConditions || "",
      otherConcerns: profileData.otherConcerns || "",
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
      } catch (error: any) {
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
