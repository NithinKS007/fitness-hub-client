import axiosInstance, { cloudinaryAxiosInstance } from "../config/axios";

const CLOUDINARY_VIDEOS_FOLDER = import.meta.env.VITE_CLOUDINARY_VIDEOS_FOLDER;
const CLOUDINARY_THUMBNAIL_FOLDER = import.meta.env
  .VITE_CLOUDINARY_THUMBNAIL_FOLDER;

interface CloudinaryUploadResponse {
  secure_url: string;
  public_id: string;
  format: string;
}

const uploadFileToCloudinary = async (
  file: any,
  folder: string
): Promise<CloudinaryUploadResponse> => {
  const signatureResponse = await axiosInstance.get("/cloudinary/signature", {
    params: { folder: folder },
  });
  const {
    signature,
    timestamp,
    cloudName,
    apiKey,
    publicId,
    folder: uploadFolder,
  } = signatureResponse.data.data;

  const formData = new FormData();

  formData.append("file", file);
  formData.append("api_key", apiKey);
  formData.append("timestamp", timestamp);
  formData.append("signature", signature);
  formData.append("public_id", publicId);
  formData.append("folder", uploadFolder);

  try {
    const response = await cloudinaryAxiosInstance(cloudName).post(
      "/upload",
      formData,
      {}
    );
    return response.data;
  } catch (error: any) {
    console.log(error.message);
    console.log("Error uploading file to Cloudinary:", error);
    throw new Error("File upload failed");
  }
};

const uploadVideoToCloudinary = async (
  video: any
): Promise<CloudinaryUploadResponse> => {
  return uploadFileToCloudinary(video, CLOUDINARY_VIDEOS_FOLDER);
};

const uploadThumbnailToCloudinary = async (
  thumbnail: any
): Promise<CloudinaryUploadResponse> => {
  return uploadFileToCloudinary(thumbnail, CLOUDINARY_THUMBNAIL_FOLDER);
};

export { uploadVideoToCloudinary, uploadThumbnailToCloudinary };
