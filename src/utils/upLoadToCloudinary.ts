import { cloudinaryAxiosInstance } from "../config/axios";
const CLOUDINARY_VIDEOS_FOLDER = import.meta.env.VITE_CLOUDINARY_VIDEOS_FOLDER;
const CLOUDINARY_THUMBNAIL_FOLDER = import.meta.env.VITE_CLOUDINARY_THUMBNAIL_FOLDER
const CLOUDINARY_PRESET = import.meta.env.VITE_CLOUDINARY_PRESET

interface CloudinaryUploadResponse {
    secure_url: string;
    public_id: string;
    format: string;
  }

const uploadFileToCloudinary = async (file: any, folder: string):Promise< CloudinaryUploadResponse > => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset",CLOUDINARY_PRESET); 
    formData.append("folder", folder);
  
    try {
      const response = await cloudinaryAxiosInstance.post("/upload",formData,{})
      console.log("response",response)
      console.log("url from cloudinary",response.data)
      return response.data
    } catch (error) {
      console.error("Error uploading file to Cloudinary:", error);
      throw new Error("File upload failed")
    }
};

const uploadVideoToCloudinary = async (video: any): Promise< CloudinaryUploadResponse >  => {
    return uploadFileToCloudinary(video, CLOUDINARY_VIDEOS_FOLDER);
};
  
const uploadThumbnailToCloudinary = async (thumbnail: any): Promise< CloudinaryUploadResponse >  => {
    return uploadFileToCloudinary(thumbnail, CLOUDINARY_THUMBNAIL_FOLDER);
}

export { uploadVideoToCloudinary, uploadThumbnailToCloudinary };