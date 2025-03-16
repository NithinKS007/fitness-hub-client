import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { useFormik } from "formik";
import { showErrorToast, showSuccessToast } from "../utils/toast";
import {
  createPlayListSchema,
  videoCreationSchema,
} from "../utils/validationSchema";
import { addPlayList, addVideo} from "../redux/content/contentThunk";
import { useModal } from "./useModal";
import { ChangeEvent} from "react";
import { uploadThumbnailToCloudinary, uploadVideoToCloudinary } from "../utils/upLoadToCloudinary";

const useContent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    handleClose: modalVideoHandleClose,
    handleOpen: modalVideoHandleOpen,
    open: modalVideoOpen,
  } = useModal();
  const {
    handleClose: modalPlayListHandleClose,
    handleOpen: modalPlayListHandleOpen,
    open: modalPlayListOpen,
  } = useModal();

  //create playlist
  const playListFormik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: createPlayListSchema,
    onSubmit: async (values) => {
      const { title } = values;

      console.log("title received for submitting", title);
      try {
        const response = await dispatch(addPlayList({ title })).unwrap();
        console.log("response for creating a playlist", response);
        showSuccessToast(response.message);
        modalPlayListHandleClose();
        playListFormik.resetForm();
      } catch (error) {
        console.log(`API Error ${error}`);
        showErrorToast(`${error}`);
      }
    },
  });


  //create video 
  const videoFormik = useFormik({
    initialValues: {
      title: "",
      description: "",
      video:"",
      thumbnail:"",
      duration: 0,
      playLists: [],
    },
    validationSchema: videoCreationSchema,
    onSubmit: async (values) => {
      const { title, description, video, playLists, thumbnail,duration } = values;

      console.log("values for uploading",title,description,playLists,duration);
      try {
        const videoData = await uploadVideoToCloudinary(video);
        const thumbnailData = await uploadThumbnailToCloudinary(thumbnail);

        const createdVideoData = {
          title,
          description,
          video:videoData.secure_url,      
          thumbnail:thumbnailData.secure_url,   
          playLists,
          duration      
        };
        const response = await dispatch(addVideo(createdVideoData)).unwrap();
        showSuccessToast(response.message);
        modalVideoHandleClose();
        videoFormik.resetForm();
      } catch (error) {
        console.log(`API Error ${error}`);
        showErrorToast(`${error}`);
      }
    },
  });

  const handleVideoChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const video = document.createElement('video');
      video.preload = 'metadata';

      video.onloadedmetadata = () => {
        window.URL.revokeObjectURL(video.src);
        videoFormik.setFieldValue('video', file);
        videoFormik.setFieldValue('duration', video.duration);
      };
      video.onerror = () => {
        videoFormik.setFieldError('video', 'Error loading video metadata');
      };
      video.src = window.URL.createObjectURL(file);
    }
  };

  const handleThumbnailChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      videoFormik.setFieldValue("thumbnail", file);
    }
  }


  return {
    videoFormik,
    modalVideoHandleClose,
    modalVideoHandleOpen,
    modalVideoOpen,

    playListFormik,
    modalPlayListHandleClose,
    modalPlayListHandleOpen,
    modalPlayListOpen,

    handleVideoChange,   
    handleThumbnailChange, 

  };
};

export default useContent;
