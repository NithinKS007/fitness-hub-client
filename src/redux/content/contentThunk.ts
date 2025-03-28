import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axios";
import { createPlayList, AddVideo, RequestPlayListsByTrainerId, RequestVideosListByPlayListId, RequestVideoId} from "./contentTypes";

export const addPlayList = createAsyncThunk(
    "content/addPlayList",
    async (title:createPlayList, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.post(`trainer/create-playlist/`,title);
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
  async (_, { rejectWithValue }) => {

    try {
      const response = await axiosInstance.get(`trainer/playlists/`);
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

export const addVideo = createAsyncThunk(
  "content/addVideos",
  async (createdVideoData:AddVideo, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`trainer/upload-video/`,createdVideoData);
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

export const getUploadedVideosOfTrainer = createAsyncThunk(
  "content/getUploadedVideosOfTrainer",
  async (_, { rejectWithValue }) => {

    try {
      const response = await axiosInstance.get(`trainer/videos/`);
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


export const getPlayListsAvailableByTrainerId = createAsyncThunk(
  "content/getPlayListsAvailableByTrainerId",
  async ({trainerId}:RequestPlayListsByTrainerId, { rejectWithValue }) => {

    try {
      const response = await axiosInstance.get(`user/video-playlist/${trainerId}`);
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

export const fetchVideosByPlayListId = createAsyncThunk(
  "content/fetchVideosByPlayListId",
  async ({playListId}:RequestVideosListByPlayListId, { rejectWithValue }) => {

    try {
      const response = await axiosInstance.get(`user/videos/${playListId}`);
      return response.data
    } catch (error: any) {
      console.log(error);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Failed to get videos of the trainer");
      }
    }
  }
);


export const fetchVideoDataById = createAsyncThunk(
  "content/fetchVideoDataById",
  async ({videoId}:RequestVideoId, { rejectWithValue }) => {

    try {
      const response = await axiosInstance.get(`user/video-details/${videoId}`);
      return response.data
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

export const relatedVideosDataByPayListId = createAsyncThunk(
  "content/relatedVideosDataByPayListId",
  async ({playListId}:RequestVideosListByPlayListId, { rejectWithValue }) => {

    try {
      const response = await axiosInstance.get(`user/related-videos/${playListId}`);
      return response.data
    } catch (error: any) {
      console.log(error);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Failed to get related videos of trainer");
      }
    }
  }
);

