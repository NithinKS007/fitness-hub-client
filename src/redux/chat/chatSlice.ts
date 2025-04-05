import { createSlice } from "@reduxjs/toolkit";
import { ChatState } from "./chatTypes";
import { fetchChatMessages, getTrainerChatList, getUserChatList } from "./chatThunk";

const initialState: ChatState = {
  isLoading: false,
  error: null,
  ChatMessages: [],
  userChatList:[],
  trainerChatList:[]
};

const chat = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addMessage(state, action) {
      state.ChatMessages.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      //get messages
      .addCase(fetchChatMessages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchChatMessages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.ChatMessages = action.payload.data;
      })
      .addCase(fetchChatMessages.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to get chat messages";
      })

      
      .addCase(getUserChatList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserChatList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.userChatList = action.payload.data;
      })
      .addCase(getUserChatList.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to get user chat list";
      })

      .addCase(getTrainerChatList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTrainerChatList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.trainerChatList = action.payload.data;
      })
      .addCase(getTrainerChatList.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to get trainer chat list";
      });


  },
});

export const { addMessage } = chat.actions;
export default chat.reducer;
