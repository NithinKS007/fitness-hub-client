import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { updateProfileValidationSchema } from "../utils/validationSchema";
import { updateUserProfile,updateTrainerProfile } from "../redux/auth/authThunk";
import { showErrorToast, showSuccessToast } from "../utils/toast";
import { setTrainer, setUser } from "../redux/auth/authSlice";
import { imageSchema,pdfSchema } from "../utils/validationSchema";

const useUpdateProfileForm = (profileData: any) => {
  const dispatch = useDispatch<AppDispatch>();
  // const [selectedFiles,setSelectedFiles] = useState<any[]>([])
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
    userId:"",
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
          gender:profileData.gender || "",
          yearsOfExperience: profileData?.yearsOfExperience || "",
          userId:profileData.userId,
          certifications: profileData?.certifications || [],
          specializations: profileData?.specializations || [],
          aboutMe: profileData?.aboutMe || "",
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
          bloodGroup:profileData?.bloodGroup || "",
          medicalConditions:profileData?.medicalConditions || "",
          otherConcerns:profileData?.otherConcerns || ""
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

  const handleProfilePicChange: React.ChangeEventHandler<HTMLInputElement> = async(e) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
      await imageSchema.validate(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        formik.setFieldValue("profilePic", reader.result);
        formik.setFieldTouched("profilePic", true);
      };
      reader.readAsDataURL(file);
    } catch (error: any) {
      showErrorToast(error.message);
      formik.setFieldError("profilePic", error);
      e.target.value = ""; 
    }
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
          await pdfSchema.validate(file);
          const base64String = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(file);
          });

          filesData.push({ fileName: file.name, url: base64String });
        }
        // setSelectedFiles((prevState) => [...prevState, ...filesData])
        formik.setFieldValue("certifications", [...formik.values.certifications, ...filesData])
        formik.setFieldTouched("certifications", true)
      } catch (error:any) {
        showErrorToast(error.message);
        console.error("Error reading files", error)
        formik.setFieldError("certifications", error.message);
        e.target.value = ""; 
      }
    }
  };
  
  const formik = useFormik({
    initialValues,
    validationSchema: updateProfileValidationSchema(initialValues.role),
    onSubmit: async (values) => {
      console.log("values for submition",values)
      try {
        if(formik.values.role==="user"){
          const response = await dispatch(
            updateUserProfile({ userData:{...values}})).unwrap();
            dispatch(setUser(response.data));
            showSuccessToast(response.message);
        } else if(formik.values.role==="trainer"){
          const response = await dispatch(
            updateTrainerProfile({ TrainerData:{...values,certifications:formik.values.certifications}})).unwrap();
            dispatch(setTrainer(response.data));
            showSuccessToast(response.message);
        }
       
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
