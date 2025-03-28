import { createSlice } from "@reduxjs/toolkit";
import { ChatState } from "./chatTypes";
import { fetchChatMessages } from "./chatThunk";

const initialState: ChatState = {
  isLoading: false,
  error: null,
  ChatMessages: [],
  
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
      });
  },
});

export const { addMessage } = chat.actions;
export default chat.reducer;
