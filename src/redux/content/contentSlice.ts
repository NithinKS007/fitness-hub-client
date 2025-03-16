import { createSlice } from "@reduxjs/toolkit";
import { ContentState } from "./contentTypes";
import { addPlayList, addVideo, getPlayListsOfTrainer, getUploadedVideosOfTrainer } from "./contentThunk";

const initialState: ContentState = {
  isLoading: false,
  error: null,
  playLists:[],
  videos:[]
}

const content = createSlice({
  name: "content",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder

    // create playlist
      .addCase(addPlayList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addPlayList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.playLists?.push(action.payload.data)
      })
      .addCase(addPlayList.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to create playlist";
      })

    //retrieve playlist
    .addCase(getPlayListsOfTrainer.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(getPlayListsOfTrainer.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.playLists = action.payload.data
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
      state.videos.push(action.payload.data)
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
      state.videos = action.payload.data
    })
    .addCase(getUploadedVideosOfTrainer.rejected, (state, action) => {
      state.isLoading = false;
      state.error =
        typeof action.payload === "string"
          ? action.payload
          : "Failed to get trainer videos list";
    })
    
  },
});

export default content.reducer;
