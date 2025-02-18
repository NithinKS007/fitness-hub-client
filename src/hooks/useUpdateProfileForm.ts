import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { updateProfileValidationSchema } from "../utils/validationSchema";
import { updateUserProfile } from "../redux/auth/authThunk";
import { showErrorToast, showSuccessToast } from "../utils/toast";
import { setUser } from "../redux/auth/authSlice";

const useUpdateProfileForm = (profileData: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const [selectedFiles,setSelectedFiles] = useState<any[]>([])
  const [initialValues, setInitialValues] = useState<any>({
    _id: "",
    fname: "",
    lname: "",
    email: "",
    dateOfBirth: "",
    phone: "",
    profilePic: "",
    role: "",
    aboutMe: "",
    yearsOfExperience: "",
    certifications: [],
    specializations: [],
    gender:"",
    age:"",
    height:"",
    weight:"",
    bloodGroup:"",
    medicalConditions:"",
    otherConcerns:""
  });

  useEffect(() => {
    if (profileData) {
      if (profileData.role === "trainer") {
        setInitialValues({
          _id: profileData._id,
          fname: profileData.fname || "",
          lname: profileData.lname || "",
          email: profileData.email,
          dateOfBirth: profileData.dateOfBirth
            ? new Date(profileData.dateOfBirth).toISOString().split("T")[0]
            : "",
          phone: profileData.phone || "",
          profilePic: profileData.profilePic || "",
          role: profileData.role,
          yearsOfExperience: profileData.trainerData?.yearsOfExperience || "",
          certifications: profileData.trainerData?.certifications || [],
          specializations: profileData.trainerData?.specializations || [],
          aboutMe: profileData.trainerData?.aboutMe || "",
        });
      } else if (profileData.role === "user") {
        setInitialValues({
          _id: profileData._id,
          fname: profileData.fname || "",
          lname: profileData.lname || "",
          email: profileData.email,
          dateOfBirth: profileData.dateOfBirth
            ? new Date(profileData.dateOfBirth).toISOString().split("T")[0]
            : "",
          phone: profileData.phone || "",
          profilePic: profileData.profilePic || "",
          role: profileData.role,
          gender:profileData.gender || "",
          age:profileData.age || "",
          height:profileData.height || "",
          weight:profileData.weight || "",
          bloodGroup:profileData.medicalDetails?.bloodGroup || "",
          medicalConditions:profileData.medicalDetails?.medicalConditions || "",
          otherConcerns:profileData.medicalDetails?.otherConcerns || ""
        });
      } else {
        setInitialValues({
          _id: profileData._id,
          fname: profileData.fname || "",
          lname: profileData.lname || "",
          email: profileData.email,
          phone: profileData.phone || "",
          profilePic: profileData.profilePic || "",
          role: profileData.role,
        });
      }
    }
  }, [profileData])

  const handleProfilePicChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        formik.setFieldValue("profilePic", reader.result);
      };
      reader.readAsDataURL(file);
    }
  }



  const handlePdfChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const selectedFilesArray = Array.from(files);  
      console.log("Selected files before processing:", selectedFilesArray); 
      try {
        const filesData:any = [];
        for (const file of selectedFilesArray) {
          const base64String = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
              const result = reader.result as string;
              resolve(result);
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
          });

          filesData.push({ fileName: file.name, url: base64String });
        }
  
        setSelectedFiles((prevState) => [...prevState, ...filesData]);
  
        formik.setFieldValue("certifications", [...formik.values.certifications, ...filesData]);

        console.log("Updated selected files:", [...selectedFiles, ...filesData]);

        console.log("Formik certifications field after update:", formik.values.certifications);

         
        
      } catch (error) {
        console.error("Error reading files", error);
      }
    }
  };
  
  const formik = useFormik({
    initialValues,
    validationSchema: updateProfileValidationSchema(initialValues.role),
    onSubmit: async (values) => {
      console.log("Form values submitted:", values);
      console.log("Certification Files:", formik.values.certifications);

      try {
        const response = await dispatch(
          updateUserProfile({ userData:{...values ,certifications:selectedFiles} })
        ).unwrap();
        console.log("response", response);
        dispatch(setUser(response.data));
        showSuccessToast(response.message);
      } catch (error) {
        console.log(`API Error ${error}`);
        showErrorToast(`${error}`);
      }
    },
    enableReinitialize: true,
  });

  return { formik, handleProfilePicChange,handlePdfChange };
};

export default useUpdateProfileForm;
