import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { useFormik } from "formik";
import { showErrorToast, showSuccessToast } from "../utils/toast";
import {
  playListSchema,
  thumbnailFileSchema,
  videoSchema,
  videoFileSchema,
} from "../utils/validationSchema";
import {
  addPlayList,
  editPlayList,
  addVideo,
  editVideo,
  getPlayListsOfTrainer,
  getUploadedVideosOfTrainer,
} from "../redux/content/contentThunk";
import { useModal } from "./useModal";
import { ChangeEvent, useState } from "react";
import {
  uploadThumbnailToCloudinary,
  uploadVideoToCloudinary,
} from "../utils/upLoadToCloudinary";
import { PlayList, Video } from "../redux/content/contentTypes";
import useSearchFilter from "./useSearchFilter";

export interface PlayListFormik {
  title: string;
}

export interface VideoFormik {
  title: string;
  description: string;
  video: string;
  thumbnail: string;
  duration: number;
  playLists: string[];
}

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

  const { getQueryParams } = useSearchFilter();

  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [selectedPlayList, setSelectedPlayList] = useState<PlayList | null>(
    null
  );

  const playListFormik = useFormik<PlayListFormik>({
    initialValues: {
      title: selectedPlayList?.title || "",
    },
    enableReinitialize: true,
    validationSchema: playListSchema,
    onSubmit: async (values) => {
      const { title } = values;
      try {
        if (isEditMode && selectedPlayList) {
          const { id } = selectedPlayList;
          const response = await dispatch(
            editPlayList({ title, id })
          ).unwrap();
          showSuccessToast(response.message);
        } else {
          const response = await dispatch(addPlayList({ title })).unwrap();
          showSuccessToast(response.message);
        }
        dispatch(getPlayListsOfTrainer(getQueryParams()));
        modalPlayListHandleClose();
        playListFormik.resetForm();
      } catch (error) {
        console.log(`API Error ${error}`);
        showErrorToast(`${error}`);
      }
    },
  });

  const videoFormik = useFormik<VideoFormik>({
    initialValues: {
      title: selectedVideo?.title || "",
      description: selectedVideo?.description || "",
      video: selectedVideo?.video || "",
      thumbnail: selectedVideo?.thumbnail || "",
      duration: selectedVideo?.duration || 0,
      playLists: selectedVideo?.playLists?.map((list) => list.id) || [],
    },
    enableReinitialize: true,
    validationSchema: videoSchema,
    onSubmit: async (values) => {
      const { title, description, video, playLists, thumbnail, duration } =
        values;
      if (!video || !thumbnail) {
        if (!video) videoFormik.setFieldError("video", "Video is required");
        if (!thumbnail)
          videoFormik.setFieldError("thumbnail", "Thumbnail is required");
        return;
      }
      try {
        const videoURL = (await uploadVideoToCloudinary(video)).secure_url;
        const thumbnailURL = (await uploadThumbnailToCloudinary(thumbnail))
          .secure_url;

        const videoData = {
          title,
          description,
          video: videoURL,
          thumbnail: thumbnailURL,
          playLists,
          duration,
        };

        if (isEditMode && selectedVideo) {
          const { id } = selectedVideo;
          const updatedVideoData = { ...videoData, id };
          const response = await dispatch(editVideo(updatedVideoData)).unwrap();
          showSuccessToast(response.message);
        } else {
          const response = await dispatch(addVideo(videoData)).unwrap();
          showSuccessToast(response.message);
        }
        dispatch(getUploadedVideosOfTrainer(getQueryParams()));
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
      } catch (error: any) {
        showErrorToast(`${error.message}`);
        videoFormik.setFieldError("video", `${error.message}`);
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
      } catch (error: any) {
        showErrorToast(`${error.message}`);
        videoFormik.setFieldError("thumbnail", `${error.message}`);
        event.target.value = "";
      }
    }
  };

  const handleModalVideoClose = () => {
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
  const handleModalPlayListClose = () => {
    playListFormik.resetForm();
    setIsEditMode(false);
    setSelectedPlayList(null);
    modalPlayListHandleClose();
  };
  return {
    videoFormik,
    modalVideoHandleClose: handleModalVideoClose,
    modalVideoHandleOpen,
    modalVideoOpen,

    playListFormik,
    modalPlayListHandleClose: handleModalPlayListClose,
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
