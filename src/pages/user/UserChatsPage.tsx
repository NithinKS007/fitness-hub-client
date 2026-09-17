import { useState, useEffect, useRef, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { fetchChatMessages, getUserChatList } from "../../redux/chat/chatThunk";
import {
  addMessage,
  sortUserChatList,
  updateMessageReadStatus,
  updateUserChatListUnReadCount,
  updateUserLastMessage,
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
const UserChatsPage = () => {

    const { socket, isSocketConnected } = useContext(SocketContext) || {
      socket: null,
      isSocketConnected: false,
    };
  const [input, setInput] = useState("");
  const [selectedTrainerId, setSelectedTrainerId] = useState<string | null>(
    null
  );
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
    dispatch(getUserChatList(getQueryParams()));
  }, [dispatch, getQueryParams().search]);

  const {
    userChatList,
    ChatMessages: messages,
    isLoading: chatLoading,
  } = useSelector((state: RootState) => state.chat);
  const { user } = useSelector((state: RootState) => state.auth);

  const fetchedUserSubscriptionData = userChatList.map((trainer) => ({
    id: trainer.id,
    contactId: trainer.trainerId,
    lastMessage: trainer.lastMessage,
    unReadCount: trainer.unreadCount,
    name: `${trainer.subscribedTrainerData.fname} ${trainer.subscribedTrainerData.lname}`,
    profilePic: trainer.subscribedTrainerData.profilePic,
    planStatus: `${trainer.stripeSubscriptionStatus}`,
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
        isRead: boolean;
        id: string;
      }) => {
        dispatch(
          updateUserLastMessage({
            ...message,
            createdAt: new Date(message.createdAt).toISOString(),
            updatedAt: new Date(message.updatedAt).toISOString(),
          })
        );
        dispatch(
          sortUserChatList({
            ...message,
            createdAt: new Date(message.createdAt).toISOString(),
            updatedAt: new Date(message.updatedAt).toISOString(),
          })
        );
        if (
          user?.id &&
          selectedTrainerId &&
          ((message.senderId === user.id &&
            message.receiverId === selectedTrainerId) ||
            (message.senderId === selectedTrainerId &&
              message.receiverId === user.id))
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
        dispatch(
          updateUserChatListUnReadCount({
            countUpdatedDocument,
          })
        );
      }
    );

    if (selectedTrainerId && user?.id && socket && isSocketConnected) {
      dispatch(
        fetchChatMessages({
          senderId: user?.id,
          receiverId: selectedTrainerId,
        })
      );
      socket.emit("openChat", {
        userId: user.id,
        partnerId: selectedTrainerId,
      });

      socket.on(
        "onlineStatusResponse",
        ({ userId, isOnline }: { userId: string; isOnline: boolean }) => {
          if (userId === selectedTrainerId) setIsOnline(isOnline);
        }
      );

      socket.on("startTyping", ({ senderId }: { senderId: string }) => {
        if (senderId === selectedTrainerId) {
          setTyping(senderId);
        }
      });

      socket.on("stopTyping", ({ senderId }: { senderId: string }) => {
        if (senderId === selectedTrainerId) {
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
        socket.emit("closeChat", user.id);
        socket.off("receiveMessage");
        socket.off("messageRead");
        socket.off("onlineStatusResponse");
        socket.off("unreadCountUpdated");
        socket.off("startTyping");
        socket.off("stopTyping");
      };
    }
  }, [dispatch, user?.id, selectedTrainerId,socket, isSocketConnected]);

  useEffect(() => {
    if (typing && typingIndicatorRef.current && !chatLoading) {
      typingIndicatorRef.current.scrollIntoView();
    } else if (messagesEndRef.current && !chatLoading && !typing) {
      messagesEndRef.current.scrollIntoView();
    }
  }, [messages, selectedTrainerId, chatLoading, typing]);

  const handleSendMessage = () => {
      if (!socket || !isSocketConnected) return;
    if (input && selectedTrainerId && user?.id) {
      const message = {
        senderId: user.id,
        receiverId: selectedTrainerId,
        message: input,
        createdAt: new Date().toISOString(),
      };
      socket.emit("sendMessage", message);
      setInput("");
      socket.emit("stopTyping", {
        senderId: user.id,
        receiverId: selectedTrainerId,
      });
    }
  };

  const handleTrainerClick = (trainerId: string) => {
      if (!socket || !isSocketConnected) return;
    setSelectedTrainerId(trainerId);
    setIsOnline(false);
    setTyping(null);
    socket.emit("checkOnlineStatus", trainerId);
  };

  const onEmojiClick = (emojiObject: any) => {
    setInput((prev) => prev + emojiObject.emoji);
  };

  const selectedTrainer = fetchedUserSubscriptionData.find(
    (trainer) => trainer.contactId === selectedTrainerId
  );

  const handleTyping = () => {
      if (!socket || !isSocketConnected) return;
    if (selectedTrainer && user?.id) {
      socket.emit("startTyping", {
        senderId: user.id,
        receiverId: selectedTrainerId,
      });
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }

      typingTimeoutRef.current = window.setTimeout(() => {
        socket.emit("stopTyping", {
          senderId: user.id,
          receiverId: selectedTrainerId,
        });
      }, 2000);
    }
  };

  return (
    <>
      <ReusableChat
        contacts={fetchedUserSubscriptionData}
        messages={messages}
        selectedId={selectedTrainerId}
        input={input}
        isPlanActive={selectedTrainer?.planStatus === "active"}
        isOnline={isOnline}
        onContactClick={handleTrainerClick}
        onInputChange={setInput}
        onSendClick={handleSendMessage}
        onEmojiClick={() => setShowPicker((prev) => !prev)}
        messagesEndRef={messagesEndRef}
        currentUserId={user?.id || ""}
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

export default UserChatsPage;
