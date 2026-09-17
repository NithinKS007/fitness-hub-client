import { useState, useEffect, useRef, useContext } from "react";
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
import useSearchFilter from "../../hooks/useSearchFilter";
import { SocketContext } from "../../context/SocketContext";

export interface Ichat {
  id: string;
  senderId: string;
  receiverId: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface UnreadCountPayload {
  id: string;
  userId: string;
  trainerId: string;
  lastMessage: Ichat;
  unreadCount: number;
  stripeSubscriptionStatus: string;
}
const ChatPage = () => {
  const { socket, isSocketConnected } = useContext(SocketContext) || {
    socket: null,
    isSocketConnected: false,
  };

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
    id: user.id,
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
    if (!socket || !isSocketConnected) return;
    socket.on(
      "receiveMessage",
      (message: {
        createdAt: Date;
        updatedAt: Date;
        message: string;
        senderId: string;
        receiverId: string;
        id: string;
      }) => {
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
          trainer?.id &&
          ((message.senderId === trainer.id &&
            message.receiverId === selectedUserId) ||
            (message.senderId === selectedUserId &&
              message.receiverId === trainer.id))
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

    if (selectedUserId && trainer?.id && socket && isSocketConnected) {
      dispatch(
        fetchChatMessages({
          senderId: trainer?.id,
          receiverId: selectedUserId,
        })
      );
      socket.emit("openChat", {
        userId: trainer.id,
        partnerId: selectedUserId,
      });

      socket.on(
        "onlineStatusResponse",
        ({ userId, isOnline }: { userId: string; isOnline: boolean }) => {
          if (userId === selectedUserId) setIsOnline(isOnline);
        }
      );
      socket.on("startTyping", ({ senderId }: { senderId: string }) => {
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
        if (messageIds && messageIds.length > 0) {
          messageIds?.forEach((messageId) =>
            dispatch(updateMessageReadStatus({ messageId }))
          );
        }
      });

      return () => {
        socket.emit("closeChat", trainer.id);
        socket.off("onlineStatusResponse");
        socket.off("receiveMessage");
        socket.off("messageRead");
        socket.off("unreadCountUpdated");
        socket.off("startTyping");
        socket.off("stopTyping");
      };
    }
  }, [dispatch, trainer?.id, selectedUserId, socket, isSocketConnected]);

  useEffect(() => {
    if (typing && typingIndicatorRef.current && !chatLoading) {
      typingIndicatorRef.current.scrollIntoView();
    } else if (messagesEndRef.current && !chatLoading && !typing) {
      messagesEndRef.current.scrollIntoView();
    }
  }, [messages, selectedUserId, chatLoading, typing]);

  const handleSendMessage = () => {
    if (!socket || !isSocketConnected) return;
    if (input && selectedUserId && trainer?.id) {
      const message = {
        senderId: trainer.id,
        receiverId: selectedUserId,
        message: input,
        createdAt: new Date().toISOString(),
      };
      socket.emit("sendMessage", message);
      setInput("");
      socket.emit("stopTyping", {
        senderId: trainer.id,
        receiverId: selectedUserId,
      });
    }
  };

  const handleUserClick = (userId: string) => {
    if (!socket || !isSocketConnected) return;
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
    if (!socket || !isSocketConnected) return;
    if (selectedUser && trainer?.id) {
      socket.emit("startTyping", {
        senderId: trainer.id,
        receiverId: selectedUserId,
      });

      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }

      typingTimeoutRef.current = window.setTimeout(() => {
        socket.emit("stopTyping", {
          senderId: trainer.id,
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
        selectedId={selectedUserId}
        input={input}
        isPlanActive={selectedUser?.planStatus === "active"}
        isOnline={isOnline}
        onContactClick={handleUserClick}
        onInputChange={setInput}
        onSendClick={handleSendMessage}
        onEmojiClick={() => setShowPicker((prev) => !prev)}
        messagesEndRef={messagesEndRef}
        currentUserId={trainer?.id || ""}
        typing={typing}
        onTyping={handleTyping}
        typingIndicatorRef={typingIndicatorRef}
        searchTerm={searchTerm}
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
