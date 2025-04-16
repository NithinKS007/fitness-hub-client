import { useState, useEffect, useRef } from "react";
import { socket } from "../../config/socket";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { fetchChatMessages, getUserChatList } from "../../redux/chat/chatThunk";
import { addMessage } from "../../redux/chat/chatSlice";
import { Box } from "@mui/material";
import ReusableChat from "../../components/ReusableChat";
import Picker from "emoji-picker-react";
import LoadingSpinner from "../../components/LoadingSpinner";

const UserChatsPage = () => {
  const [input, setInput] = useState("");
  const [selectedTrainerId, setSelectedTrainerId] = useState<string | null>(
    null
  );
  const [showPicker, setShowPicker] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);
  const [isOnline, setIsOnline] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [typing, setTyping] = useState<string | null>(null);
  const typingIndicatorRef = useRef<HTMLDivElement>(null)
  const typingTimeoutRef = useRef<number | null>(null);
  
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getUserChatList());
  }, [dispatch]);

  const {
    userChatList,
    ChatMessages: messages,
    isLoading: chatLoading,
  } = useSelector((state: RootState) => state.chat);
  const { user } = useSelector((state: RootState) => state.auth);

  const fetchedUserSubscriptionData = userChatList.map((trainer) => ({
    _id: trainer._id,
    contactId: trainer.trainerId,
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
    if (selectedTrainerId && user?._id) {
      dispatch(
        fetchChatMessages({
          senderId: user?._id,
          receiverId: selectedTrainerId,
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
          if (message.senderId === selectedTrainerId) {
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
          if (userId === selectedTrainerId) setIsOnline(isOnline);
        }
      );

      socket.on("typing", ({ senderId }: { senderId: string }) => {
        if (senderId === selectedTrainerId) {
          setTyping(senderId);
        }
      });

      socket.on("stopTyping", ({ senderId }: { senderId: string }) => {
        if (senderId === selectedTrainerId) {
          setTyping(null);
        }
      });
      return () => {
        socket.off("receiveMessage");
        socket.off("onlineStatusResponse");
        socket.off("typing");
        socket.off("stopTyping");
      };
    }
  }, [dispatch, user?._id, selectedTrainerId]);

  useEffect(() => {
   if (typing && typingIndicatorRef.current && !chatLoading) {
    typingIndicatorRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (messagesEndRef.current && !chatLoading && !typing) {
      messagesEndRef.current.scrollIntoView();
    }
  }, [messages, selectedTrainerId, chatLoading,typing]);

  const handleSendMessage = () => {
    if (input && selectedTrainerId && user?._id) {
      const message = {
        senderId: user._id,
        receiverId: selectedTrainerId,
        message: input,
        createdAt: new Date().toISOString(),
      };
      socket.emit("sendMessage", message);
      dispatch(
        addMessage({
          _id: Date.now(),
          senderId: user?._id,
          receiverId: selectedTrainerId,
          message: input,
          createdAt: new Date().toISOString(),
        })
      );
      setInput("");
      socket.emit("stopTyping", {
        senderId: user._id,
        receiverId: selectedTrainerId,
      });
    }
  };

  const handleTrainerClick = (trainerId: string) => {
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
    if (selectedTrainer && user?._id) {
      socket.emit("typing", {
        senderId: user._id,
        receiverId: selectedTrainerId,
      });
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
  
      typingTimeoutRef.current = window.setTimeout(() => {
        socket.emit("stopTyping", {
          senderId: user._id,
          receiverId: selectedTrainerId,
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
            contacts={fetchedUserSubscriptionData}
            messages={messages}
            selectedId={selectedTrainerId as null | string}
            input={input}
            isPlanActive={selectedTrainer?.planStatus === "active"}
            isOnline={isOnline as boolean}
            onContactClick={handleTrainerClick}
            onInputChange={setInput}
            onSendClick={handleSendMessage}
            onEmojiClick={() => setShowPicker((prev) => !prev)}
            messagesEndRef={messagesEndRef}
            currentUserId={user?._id || ""}
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

export default UserChatsPage;
