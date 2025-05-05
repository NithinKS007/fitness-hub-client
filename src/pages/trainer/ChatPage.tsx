import { useState, useEffect, useRef } from "react";
import { socket } from "../../config/socket";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import {
  fetchChatMessages,
  getTrainerChatList,
} from "../../redux/chat/chatThunk";
import {
  addMessage,
  sortTrainerChatList,
  updateMessageReadStatus,
  updateTrainerChatListUnReadCount,
  updateTrainerLastMessage,
} from "../../redux/chat/chatSlice";
import { Box } from "@mui/material";
import ReusableChat from "../../components/ReusableChat";
import Picker from "emoji-picker-react";
import useSearchFilter from "../../hooks/useSearchFilterTable";
export interface Ichat {
  _id: string;
  senderId: string;
  receiverId: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface UnreadCountPayload {
  _id: string;
  userId: string;
  trainerId: string;
  lastMessage: Ichat;
  unreadCount: number;
  stripeSubscriptionStatus: string;
}
const ChatPage = () => {
  const [input, setInput] = useState("");
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [showPicker, setShowPicker] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);
  const [isOnline, setIsOnline] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [typing, setTyping] = useState<string | null>(null);
  const typingIndicatorRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<number | null>(null);

  const dispatch = useDispatch<AppDispatch>();

  const { searchTerm, handleSearchChange, getQueryParams } = useSearchFilter();

  useEffect(() => {
    dispatch(getTrainerChatList(getQueryParams()));
  }, [dispatch, getQueryParams().search]);

  const {
    trainerChatList,
    ChatMessages: messages,
    isLoading: chatLoading,
  } = useSelector((state: RootState) => state.chat);
  const { trainer } = useSelector((state: RootState) => state.auth);

  const fetchedSubscribers = trainerChatList.map((user) => ({
    _id: user._id,
    contactId: user.userId,
    lastMessage: user.lastMessage,
    unReadCount: user.unreadCount,
    name: `${user.subscribedUserData.fname} ${user.subscribedUserData.lname}`,
    profilePic: user.subscribedUserData.profilePic,
    planStatus: `${user.stripeSubscriptionStatus}`,
  }));

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node)
      ) {
        setShowPicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    socket.on(
      "receiveMessage",
      (message: {
        createdAt: Date;
        updatedAt: Date;
        message: string;
        senderId: string;
        receiverId: string;
        _id: string;
      }) => {
        console.log("Received message:", message);
        dispatch(
          updateTrainerLastMessage({
            ...message,
            createdAt: new Date(message.createdAt).toISOString(),
            updatedAt: new Date(message.updatedAt).toISOString(),
          })
        );

        dispatch(
          sortTrainerChatList({
            ...message,
            createdAt: new Date(message.createdAt).toISOString(),
            updatedAt: new Date(message.updatedAt).toISOString(),
          })
        );
        if (
          selectedUserId &&
          trainer?._id &&
          ((message.senderId === trainer._id &&
            message.receiverId === selectedUserId) ||
            (message.senderId === selectedUserId &&
              message.receiverId === trainer._id))
        ) {
          dispatch(
            addMessage({
              ...message,
              createdAt: new Date(message.createdAt).toISOString(),
              updatedAt: new Date(message.updatedAt).toISOString(),
            })
          );
        }
      }
    );

    socket.on(
      "unreadCountUpdated",
      (countUpdatedDocument: UnreadCountPayload) => {
        console.log("trainer", countUpdatedDocument);
        dispatch(updateTrainerChatListUnReadCount({ countUpdatedDocument }));
      }
    );

    if (selectedUserId && trainer?._id) {
      dispatch(
        fetchChatMessages({
          senderId: trainer?._id,
          receiverId: selectedUserId,
        })
      );
      socket.emit("setActiveChat", {
        userId: trainer._id,
        partnerId: selectedUserId,
      });

      socket.on(
        "onlineStatusResponse",
        ({ userId, isOnline }: { userId: string; isOnline: boolean }) => {
          if (userId === selectedUserId) setIsOnline(isOnline);
        }
      );
      socket.on("typing", ({ senderId }: { senderId: string }) => {
        if (senderId === selectedUserId) {
          setTyping(senderId);
        }
      });

      socket.on("stopTyping", ({ senderId }: { senderId: string }) => {
        if (senderId === selectedUserId) {
          setTyping(null);
        }
      });
      socket.on("messageRead", ({ messageIds }: { messageIds: string[] }) => {
        console.log(
          "Received messageRead for the mark as read it will be as arrays:",
          messageIds
        );
        if (messageIds && messageIds.length > 0) {
          messageIds?.forEach((messageId) =>
            dispatch(updateMessageReadStatus({ messageId }))
          );
        }
      });

      return () => {
        socket.emit("closeChat", trainer._id);
        socket.off("onlineStatusResponse");
        socket.off("receiveMessage");
        socket.off("messageRead");
        socket.off("unreadCountUpdated");
        socket.off("typing");
        socket.off("stopTyping");
      };
    }
  }, [dispatch, trainer?._id, selectedUserId]);

  useEffect(() => {
    if (typing && typingIndicatorRef.current && !chatLoading) {
      typingIndicatorRef.current.scrollIntoView();
    } else if (messagesEndRef.current && !chatLoading && !typing) {
      messagesEndRef.current.scrollIntoView();
    }
  }, [messages, selectedUserId, chatLoading, typing]);

  const handleSendMessage = () => {
    if (input && selectedUserId && trainer?._id) {
      const message = {
        senderId: trainer._id,
        receiverId: selectedUserId,
        message: input,
        createdAt: new Date().toISOString(),
      };
      socket.emit("sendMessage", message);
      setInput("");
      socket.emit("stopTyping", {
        senderId: trainer._id,
        receiverId: selectedUserId,
      });
    }
  };

  const handleUserClick = (userId: string) => {
    setSelectedUserId(userId);
    setIsOnline(false);
    setTyping(null);
    socket.emit("checkOnlineStatus", userId);
  };

  const onEmojiClick = (emojiObject: any) => {
    setInput((prev) => prev + emojiObject.emoji);
  };

  const selectedUser = fetchedSubscribers.find(
    (user) => user.contactId === selectedUserId
  );

  const handleTyping = () => {
    if (selectedUser && trainer?._id) {
      socket.emit("typing", {
        senderId: trainer._id,
        receiverId: selectedUserId,
      });

      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }

      typingTimeoutRef.current = window.setTimeout(() => {
        socket.emit("stopTyping", {
          senderId: trainer._id,
          receiverId: selectedUserId,
        });
      }, 2000);
    }
  };

  return (
    <>
      <ReusableChat
        contacts={fetchedSubscribers}
        messages={messages}
        selectedId={selectedUserId as string}
        input={input as string}
        isPlanActive={selectedUser?.planStatus === "active"}
        isOnline={isOnline as boolean}
        onContactClick={handleUserClick}
        onInputChange={setInput}
        onSendClick={handleSendMessage}
        onEmojiClick={() => setShowPicker((prev) => !prev)}
        messagesEndRef={messagesEndRef}
        currentUserId={trainer?._id || ""}
        typing={typing}
        onTyping={handleTyping}
        typingIndicatorRef={typingIndicatorRef}
        searchTerm={searchTerm as string}
        onSearchChange={handleSearchChange}
        chatLoading={chatLoading}
      />
      {showPicker && (
        <Box
          ref={pickerRef}
          sx={{
            position: "absolute",
            bottom: "100px",
            right: "30px",
            zIndex: 1000,
          }}
        >
          <Picker onEmojiClick={onEmojiClick} />
        </Box>
      )}
    </>
  );
};

export default ChatPage;
