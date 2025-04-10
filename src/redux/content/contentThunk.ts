import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axios";
import { createPlayList, AddVideo, RequestPlayListsByTrainerId, RequestVideosListByPlayListId, RequestVideoId, VideosQueryParams, PlayListQueryParams, UpdateVideoBlockStatus, UpdatePlayListBlockStatus} from "./contentTypes";

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
  async (params:PlayListQueryParams, { rejectWithValue }) => {

    try {
      const response = await axiosInstance.get(`trainer/playlists/`,{params});
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
  async (params:VideosQueryParams, { rejectWithValue }) => {

    try {
      const response = await axiosInstance.get(`trainer/videos/`,{params});
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


export const updateVideoPrivacyStatus = createAsyncThunk(
  "content/updateVideoPrivacyStatus",
  async ({videoId,privacy}:UpdateVideoBlockStatus, { rejectWithValue }) => {

    try {
      const response = await axiosInstance.patch(`trainer/videos/${videoId}`,{
        privacy
      })
      return response.data
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
  async ({playListId,privacy}:UpdatePlayListBlockStatus, { rejectWithValue }) => {

    try {
      const response = await axiosInstance.patch(`trainer/playlist/${playListId}`,{
        privacy
      });
      return response.data
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
  async (videoData: {_id: string;title: string;description: string;
    video: string;thumbnail: string;playLists: string[];duration: number;},{ rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`trainer/videos/${videoData._id}`, videoData);
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
  async (playListData: {playListId: string;title: string},{ rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`trainer/playlist/${playListData.playListId}`,playListData);
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
      const response = await axiosInstance.get(`trainer/playlist-all/`);
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