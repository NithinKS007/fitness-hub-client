import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { useFormik } from "formik";
import { showErrorToast, showSuccessToast } from "../utils/toast";
import {
  createPlayListSchema,
  thumbnailFileSchema,
  videoCreationSchema,
  videoFileSchema,
} from "../utils/validationSchema";
import {
  addPlayList,
  editPlayList,
  addVideo,
  editVideo,
} from "../redux/content/contentThunk";
import { useModal } from "./useModal";
import { ChangeEvent, useState } from "react";
import {
  uploadThumbnailToCloudinary,
  uploadVideoToCloudinary,
} from "../utils/upLoadToCloudinary";
import { PlayList, Video } from "../redux/content/contentTypes";

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
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [selectedPlayList, setSelectedPlayList] = useState<PlayList | null>(
    null
  );

  const playListFormik = useFormik({
    initialValues: {
      title: selectedPlayList?.title || "",
    },
    enableReinitialize: true,
    validationSchema: createPlayListSchema,
    onSubmit: async (values) => {
      const { title } = values;
      try {
        if (isEditMode && selectedPlayList) {
          const { _id } = selectedPlayList;
          const response = await dispatch(
            editPlayList({ title, playListId: _id })
          ).unwrap();
          showSuccessToast(response.message);
        } else {
          const response = await dispatch(addPlayList({ title })).unwrap();
          showSuccessToast(response.message);
        }
        modalPlayListHandleClose();
        playListFormik.resetForm();
      } catch (error) {
        console.log(`API Error ${error}`);
        showErrorToast(`${error}`);
      }
    },
  });

  const videoFormik = useFormik({
    initialValues: {
      title: selectedVideo?.title || "",
      description: selectedVideo?.description || "",
      video: selectedVideo?.video || "",
      thumbnail: selectedVideo?.thumbnail || "",
      duration: selectedVideo?.duration || 0,
      playLists: selectedVideo?.playLists?.map((pl) => pl._id) || [],
    },
    enableReinitialize: true,
    validationSchema: videoCreationSchema,
    onSubmit: async (values) => {
      const { title, description, video, playLists, thumbnail, duration } =
        values;
      console.log(
        "values for submitting for adding or editing the playlist",
        values
      );
      if (!video) {
        videoFormik.setFieldError("video", "Video is required");
        return;
      }
      if (!thumbnail) {
        videoFormik.setFieldError("thumbnail", "Thumbnail is required");
        return;
      }
      try {
        if (isEditMode && selectedVideo) {
          const updatedVideoData = {
            _id: selectedVideo._id,
            title,
            description,
            video:
              typeof video === "string"
                ? video
                : (await uploadVideoToCloudinary(video)).secure_url,
            thumbnail:
              typeof thumbnail === "string"
                ? thumbnail
                : (await uploadThumbnailToCloudinary(thumbnail)).secure_url,
            playLists,
            duration,
          };
          const response = await dispatch(editVideo(updatedVideoData)).unwrap();
          showSuccessToast(response.message);
        } else {
          const videoData = await uploadVideoToCloudinary(video);
          const thumbnailData = await uploadThumbnailToCloudinary(thumbnail);

          const createdVideoData = {
            title,
            description,
            video: videoData.secure_url,
            thumbnail: thumbnailData.secure_url,
            playLists,
            duration,
          };
          const response = await dispatch(addVideo(createdVideoData)).unwrap();
          showSuccessToast(response.message);
        }
        modalVideoHandleClose();
        videoFormik.resetForm();
        setIsEditMode(false);
        setSelectedVideo(null);
      } catch (error) {
        console.log(`API Error ${error}`);
        showErrorToast(`${error}`);
      }
    },
  });

  const handleVideoChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        await videoFileSchema.validate(file);
        const video = document.createElement("video");
        video.preload = "metadata";

        video.onloadedmetadata = () => {
          window.URL.revokeObjectURL(video.src);
          videoFormik.setFieldValue("video", file);
          videoFormik.setFieldValue("duration", video.duration);
        };
        video.onerror = () => {
          videoFormik.setFieldError("video", "Error loading video metadata");
        };
        video.src = window.URL.createObjectURL(file);
      } catch (error) {
        showErrorToast(`${error}`);
        videoFormik.setFieldError("video", `${error}`);
        event.target.value = "";
      }
    }
  };

  const handleThumbnailChange = async (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        await thumbnailFileSchema.validate(file);
        videoFormik.setFieldValue("thumbnail", file);
      } catch (error) {
        showErrorToast(`${error}`);
        videoFormik.setFieldError("thumbnail", `${error}`);
        event.target.value = "";
      }
    }
  };

  const handleModalVideoCloseWithReset = () => {
    videoFormik.resetForm();
    setIsEditMode(false);
    setSelectedVideo(null);
    modalVideoHandleClose();
  };

  const handleEditVideo = (video: Video) => {
    setIsEditMode(true);
    setSelectedVideo(video);
    modalVideoHandleOpen();
  };
  const handleEditPlayList = (playList: PlayList) => {
    setIsEditMode(true);
    setSelectedPlayList(playList);
    modalPlayListHandleOpen();
  };
  const handleModalPlayListCloseWithReset = () => {
    playListFormik.resetForm();
    setIsEditMode(false);
    setSelectedPlayList(null);
    modalPlayListHandleClose();
  };
  return {
    videoFormik,
    modalVideoHandleClose: handleModalVideoCloseWithReset,
    modalVideoHandleOpen,
    modalVideoOpen,

    playListFormik,
    modalPlayListHandleClose: handleModalPlayListCloseWithReset,
    modalPlayListHandleOpen,
    modalPlayListOpen,

    handleVideoChange,
    handleThumbnailChange,

    handleEditVideo,
    handleEditPlayList,
    isEditMode,
    
  };
};

export default useContent;
