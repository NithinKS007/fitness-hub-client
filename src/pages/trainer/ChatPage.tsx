import { useState, useEffect, useRef } from "react";
import { socket } from "../../config/socket";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import {
  fetchChatMessages,
  getTrainerChatList,
} from "../../redux/chat/chatThunk";
import { addMessage } from "../../redux/chat/chatSlice";
import { Box } from "@mui/material";
import ReusableChat from "../../components/ReusableChat";
import Picker from "emoji-picker-react";
import LoadingSpinner from "../../components/LoadingSpinner";

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

  useEffect(() => {
    dispatch(getTrainerChatList());
  }, [dispatch]);

  const {
    trainerChatList,
    ChatMessages: messages,
    isLoading: chatLoading,
  } = useSelector((state: RootState) => state.chat);
  const { trainer } = useSelector((state: RootState) => state.auth);

  const fetchedSubscribers = trainerChatList.map((user) => ({
    _id: user._id,
    contactId: user.userId,
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
    if (selectedUserId && trainer?._id) {
      dispatch(
        fetchChatMessages({
          senderId: trainer?._id,
          receiverId: selectedUserId,
        })
      );

      socket.on(
        "receiveMessage",
        (message: {
          createdAt: Date;
          message: string;
          senderId: string;
          _id: string;
        }) => {
          console.log("Received message:", message);
          if (message.senderId === selectedUserId) {
            dispatch(
              addMessage({
                ...message,
                createdAt: new Date(message.createdAt).toISOString(),
              })
            );
          }
        }
      );
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
      return () => {
        socket.off("onlineStatusResponse");
        socket.off("receiveMessage");
        socket.off("typing");
        socket.off("stopTyping");
      };
    }
  }, [dispatch, trainer?._id, selectedUserId]);

  useEffect(() => {
    if (typing && typingIndicatorRef.current && !chatLoading) {
      typingIndicatorRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (messagesEndRef.current && !chatLoading &&!typing) {
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
      dispatch(
        addMessage({
          _id: Date.now(),
          senderId: trainer?._id,
          receiverId: selectedUserId,
          message: input,
          createdAt: new Date().toISOString(),
        })
      );
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
    <Box sx={{ height: "100vh", maxHeight: "600px" }}>
      {chatLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <ReusableChat
            contacts={fetchedSubscribers}
            messages={messages}
            selectedId={selectedUserId as string}
            input={input!! as string}
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
      )}
    </Box>
  );
};

export default ChatPage;
