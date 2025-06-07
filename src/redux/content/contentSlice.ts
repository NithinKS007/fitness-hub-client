import { createSlice } from "@reduxjs/toolkit";
import { ContentState } from "./contentTypes";
import {
  addPlayList,
  addVideo,
  editPlayList,
  editVideo,
  fetchFullPlayListOfTrainer,
  fetchVideoDataById,
  fetchVideosByTrainerUser,
  getPlayListsAvailableByTrainerId,
  getPlayListsOfTrainer,
  getUploadedVideosOfTrainer,
  updatePlayListPrivacyStatus,
  updateVideoPrivacyStatus,
} from "./contentThunk";

const initialState: ContentState = {
  isLoading: false,
  error: null,
  playLists: [],
  videos: [],
  videoData: null,
  pagination: { totalPages: 0, currentPage: 1 },
};

const content = createSlice({
  name: "content",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // create playlist
      .addCase(addPlayList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addPlayList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.playLists?.push(action.payload.data);
      })
      .addCase(addPlayList.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to create playlist";
      })

      //retrieve playlist for trainer viewing in his profile
      .addCase(getPlayListsOfTrainer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPlayListsOfTrainer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.playLists = action.payload.data.playList;
        state.pagination.currentPage =
          action.payload.data.paginationData.currentPage;
        state.pagination.totalPages =
          action.payload.data.paginationData.totalPages;
      })
      .addCase(getPlayListsOfTrainer.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to get trainer playlist list";
      })

      // upload video
      .addCase(addVideo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addVideo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.videos.push(action.payload.data);
      })
      .addCase(addVideo.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to create video";
      })

      // get videos uploaded by the trainer
      .addCase(getUploadedVideosOfTrainer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUploadedVideosOfTrainer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        console.log("videos in trainer side", action.payload.data.videoList);
        state.videos = action.payload.data.videoList;
        state.pagination.currentPage =
          action.payload.data.paginationData.currentPage;
        state.pagination.totalPages =
          action.payload.data.paginationData.totalPages;
      })
      .addCase(getUploadedVideosOfTrainer.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to get trainer videos list";
      })

      .addCase(getPlayListsAvailableByTrainerId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPlayListsAvailableByTrainerId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.playLists = action.payload.data;
      })
      .addCase(getPlayListsAvailableByTrainerId.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to get playlists";
      })
      //get video data
      .addCase(fetchVideoDataById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchVideoDataById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.videoData = action.payload.data;
      })
      .addCase(fetchVideoDataById.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to get video data";
      })
      .addCase(updateVideoPrivacyStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateVideoPrivacyStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        const updatedVideo = action.payload.data;

        state.videos = state?.videos?.map((v) =>
          v._id === updatedVideo._id
            ? { ...v, privacy: updatedVideo.privacy }
            : v
        );

        state.error = null;
      })

      .addCase(updateVideoPrivacyStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to update block status";
      })

      .addCase(updatePlayListPrivacyStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePlayListPrivacyStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        const updatedPlayList = action.payload.data;
        state.playLists = state?.playLists?.map((p) =>
          p._id === updatedPlayList._id
            ? { ...p, privacy: updatedPlayList.privacy }
            : p
        );
        state.error = null;
      })
      .addCase(updatePlayListPrivacyStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to update block status";
      })

      //get full playlist
      .addCase(fetchFullPlayListOfTrainer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFullPlayListOfTrainer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.playLists = action.payload.data;
      })
      .addCase(fetchFullPlayListOfTrainer.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to get full playlists of trainer";
      })

      .addCase(fetchVideosByTrainerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchVideosByTrainerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.videos = action.payload.data.videoList;
        state.pagination.currentPage =
          action.payload.data.paginationData.currentPage;
        state.pagination.totalPages =
          action.payload.data.paginationData.totalPages;
      })
      .addCase(fetchVideosByTrainerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to get trainer videos list";
      })
      //edit video
      .addCase(editVideo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editVideo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const updatedVideo = action.payload.data;
        state.videos = state.videos.map((video) =>
          video._id === updatedVideo._id ? { ...video, ...updatedVideo } : video
        );
      })
      .addCase(editVideo.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to edit video";
      })
      //edit playlist
      .addCase(editPlayList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editPlayList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const updatedPlayList = action.payload.data;
        state.playLists = state.playLists.map((p) =>
          p._id === updatedPlayList._id ? { ...p, ...updatedPlayList } : p
        );
      })
      .addCase(editPlayList.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to edit playlist";
      });
  },
});

export default content.reducer;
