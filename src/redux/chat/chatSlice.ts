import { createSlice } from "@reduxjs/toolkit";
import { ChatState } from "./chatTypes";
import {
  fetchChatMessages,
  getTrainerChatList,
  getUserChatList,
} from "./chatThunk";

const initialState: ChatState = {
  isLoading: false,
  error: null,
  ChatMessages: [],
  userChatList: [],
  trainerChatList: [],
};

const chat = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addMessage: (state, action) => {
      const newMessage = action.payload;
      if (!state.ChatMessages.some((msg) => msg._id === newMessage._id)) {
        state.ChatMessages.push(newMessage);
      }
    },
    updateMessageReadStatus: (state, action) => {
      const messageId = action.payload.messageId;
      const message = state.ChatMessages.find((msg) => msg._id === messageId);
      if (message) {
        message.isRead = true;
      }
    },
    updateUserLastMessage: (state, action) => {
      const message = action.payload;
      const chatToUpdate = state.userChatList.find(
        (trainer) =>
          (trainer.userId === message.senderId &&
            trainer.trainerId === message.receiverId) ||
          (trainer.userId === message.receiverId &&
            trainer.trainerId === message.senderId)
      );

      if (chatToUpdate) {
        chatToUpdate.lastMessage = message;
      }
    },
    sortUserChatList: (state, action) => {
      const message = action.payload;
      const chat = state.userChatList.findIndex(
        (trainer) =>
          (trainer.userId === message.senderId &&
            trainer.trainerId === message.receiverId) ||
          (trainer.userId === message.receiverId &&
            trainer.trainerId === message.senderId)
      );

      if (chat !== -1) {
        state.userChatList[chat].updatedAt = message.updatedAt;
        state.userChatList = [...state.userChatList].sort(
          (a, b) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
      }
    },
    sortTrainerChatList: (state, action) => {
      const message = action.payload;
      const chat = state.trainerChatList.findIndex(
        (user) =>
          (user.userId === message.senderId &&
            user.trainerId === message.receiverId) ||
          (user.userId === message.receiverId &&
            user.trainerId === message.senderId)
      );
      if (chat !== -1) {
        state.trainerChatList[chat].updatedAt = message.updatedAt;
        state.trainerChatList = [...state.trainerChatList].sort(
          (a, b) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
      }
    },
    updateTrainerLastMessage: (state, action) => {
      const message = action.payload;
      const chatToUpdate = state.trainerChatList.find(
        (user) =>
          (user.userId === message.senderId &&
            user.trainerId === message.receiverId) ||
          (user.userId === message.receiverId &&
            user.trainerId === message.senderId)
      );
      if (chatToUpdate) {
        chatToUpdate.lastMessage = message;
      }
    },
    updateTrainerChatListUnReadCount: (state, action) => {
      const { countUpdatedDocument } = action.payload;

      const stateCountToUpdate = state.trainerChatList.find(
        (ch) => ch._id === countUpdatedDocument?._id
      );
      if (
        stateCountToUpdate &&
        typeof countUpdatedDocument.unreadCount === "number"
      ) {
        stateCountToUpdate.unreadCount = countUpdatedDocument.unreadCount;
      }
    },
    updateUserChatListUnReadCount: (state, action) => {
      const { countUpdatedDocument } = action.payload;
      const stateCountToUpdate = state.userChatList.find(
        (ch) => ch._id === countUpdatedDocument?._id
      );

      if (
        stateCountToUpdate &&
        typeof countUpdatedDocument.unreadCount === "number"
      ) {
        stateCountToUpdate.unreadCount = countUpdatedDocument.unreadCount;
      }
    },
  },
  extraReducers: (builder) => {
    builder
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

export const {
  addMessage,
  updateMessageReadStatus,
  updateUserLastMessage,
  updateTrainerLastMessage,
  sortTrainerChatList,
  sortUserChatList,
  updateTrainerChatListUnReadCount,
  updateUserChatListUnReadCount,
} = chat.actions;
export default chat.reducer;
