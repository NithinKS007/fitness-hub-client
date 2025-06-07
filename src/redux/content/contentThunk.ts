import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axios";
import {
  createPlayList,
  AddVideo,
  RequestPlayListsByTrainerId,
  RequestVideoId,
  VideosQueryParams,
  PlayListQueryParams,
  UpdateVideoBlockStatus,
  UpdatePlayListBlockStatus,
  VideosQueryParamsUser,
} from "./contentTypes";

export const fetchVideosByTrainerUser = createAsyncThunk(
  "content/fetchVideosByTrainerUser",
  async (videosQueryParams: VideosQueryParamsUser, { rejectWithValue }) => {
    try {
      console.log("params", videosQueryParams);
      const { trainerId, ...queryParams } = videosQueryParams;
      const response = await axiosInstance.get(`user/trainer/videos/${trainerId}`, {
        params: queryParams,
      });
      return response.data;
    } catch (error: any) {
      console.log(error);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Failed to get videos user");
      }
    }
  }
);

export const getPlayListsAvailableByTrainerId = createAsyncThunk(
  "content/getPlayListsAvailableByTrainerId",
  async ({ trainerId }: RequestPlayListsByTrainerId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `user/playlists/all/${trainerId}`
      );
      return response.data;
    } catch (error: any) {
      console.log(error);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Failed to get playlists of trainer");
      }
    }
  }
);

export const getUploadedVideosOfTrainer = createAsyncThunk(
  "content/getUploadedVideosOfTrainer",
  async (params: VideosQueryParams, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`trainer/videos/`, { params });
      return response.data;
    } catch (error: any) {
      console.log(error);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Failed to get videos of trainer");
      }
    }
  }
);

export const addVideo = createAsyncThunk(
  "content/addVideos",
  async (createdVideoData: AddVideo, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `trainer/videos/`,
        createdVideoData
      );
      return response.data;
    } catch (error: any) {
      console.log(error);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Failed to upload video");
      }
    }
  }
);

export const addPlayList = createAsyncThunk(
  "content/addPlayList",
  async (title: createPlayList, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `trainer/playlists/`,
        title
      );
      return response.data;
    } catch (error: any) {
      console.log(error);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Failed to create playlist");
      }
    }
  }
);

export const getPlayListsOfTrainer = createAsyncThunk(
  "content/getPlayListsOfTrainer",
  async (params: PlayListQueryParams, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`trainer/playlists/`, {
        params,
      });
      return response.data;
    } catch (error: any) {
      console.log(error);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Failed to get playlists of trainer");
      }
    }
  }
);

export const fetchVideoDataById = createAsyncThunk(
  "content/fetchVideoDataById",
  async ({ videoId }: RequestVideoId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`user/videos/${videoId}`);
      return response.data;
    } catch (error: any) {
      console.log(error);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Failed to get video data of the trainer");
      }
    }
  }
);

export const updateVideoPrivacyStatus = createAsyncThunk(
  "content/updateVideoPrivacyStatus",
  async ({ videoId, privacy }: UpdateVideoBlockStatus, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(`trainer/videos/${videoId}`, {
        privacy,
      });
      return response.data;
    } catch (error: any) {
      console.log(error);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Failed to update block status");
      }
    }
  }
);

export const updatePlayListPrivacyStatus = createAsyncThunk(
  "content/updatePlayListPrivacyStatus",
  async (
    { playListId, privacy }: UpdatePlayListBlockStatus,
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.patch(
        `trainer/playlists/${playListId}`,
        {
          privacy,
        }
      );
      return response.data;
    } catch (error: any) {
      console.log(error);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Failed to update block status");
      }
    }
  }
);

export const editVideo = createAsyncThunk(
  "content/editVideo",
  async (
    {
      _id,
      title,
      description,
      video,
      thumbnail,
      playLists,
      duration,
    }: {
      _id: string;
      title: string;
      description: string;
      video: string;
      thumbnail: string;
      playLists: string[];
      duration: number;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.put(`trainer/videos/${_id}`, {
        title,
        description,
        video,
        thumbnail,
        playLists,
        duration,
      });
      return response.data;
    } catch (error: any) {
      console.log(error);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Failed to update video");
      }
    }
  }
);

export const editPlayList = createAsyncThunk(
  "content/editPlayList",
  async (
    { playListId, title }: { playListId: string; title: string },
    { rejectWithValue }
  ) => {
    try {
      console.log("data for editing", playListId, title);
      const response = await axiosInstance.put(
        `trainer/playlists/${playListId}`,
        { title }
      );
      return response.data;
    } catch (error: any) {
      console.log(error);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Failed to update playlist");
      }
    }
  }
);

export const fetchFullPlayListOfTrainer = createAsyncThunk(
  "content/fetchFullPlayListOfTrainer",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`trainer/playlists/all/`);
      return response.data;
    } catch (error: any) {
      console.log(error);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Failed to get full playlist of trainer");
      }
    }
  }
);
