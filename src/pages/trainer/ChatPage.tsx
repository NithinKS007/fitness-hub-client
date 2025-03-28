import React, { useState, useEffect, useRef } from "react";
import { socket } from "../../config/socket";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { getTrainerSubscribedUsers } from "../../redux/subscription/subscriptionThunk";
import { fetchChatMessages } from "../../redux/chat/chatThunk";
import { addMessage } from "../../redux/chat/chatSlice";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemAvatar,
  Avatar,
  ListItemText,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import Picker from "emoji-picker-react";
const ChatPage = () => {
  const [input, setInput] = useState("");
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [showPicker, setShowPicker] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch<AppDispatch>();
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
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const fetchSubscribersOfTrainer = async () => {
    dispatch(getTrainerSubscribedUsers());
  };
  const onEmojiClick = (emojiObject) => {
    setInput((prev) => prev + emojiObject.emoji);
  };

  useEffect(() => {
    fetchSubscribersOfTrainer();
  }, [dispatch]);

  const { subscribersOfTrainer, isLoading: subLoading } = useSelector(
    (state: RootState) => state.subscription
  );

  console.log("subs of trainer", subscribersOfTrainer);
  const fetchedSubscribers = subscribersOfTrainer.map((user) => ({
    _id: user._id,
    trainerId: user.trainerId,
    userId: user.userId,
    name: `${user.subscribedUserData.fname} ${user.subscribedUserData.lname}`,
    profilePic: user.subscribedUserData.profilePic,
    planStatus: `${user.isActive}`,
  }));

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { ChatMessages: messages, isLoading: chatLoading } = useSelector(
    (state: RootState) => state.chat
  );

  const { trainer } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (selectedUserId && trainer?._id) {
      socket.emit("join", trainer?._id);
      dispatch(
        fetchChatMessages({
          senderId: trainer?._id,
          receiverId: selectedUserId,
        })
      );

      socket.on("receiveMessage", (message: any) => {
        dispatch(
          addMessage({
            ...message,
            createdAt: new Date(message.createdAt),
          })
        );
      });

      return () => {
        socket.off("receiveMessage");
      };
    }
  }, [dispatch, trainer?._id, selectedUserId]);

  const handleSendMessage = () => {
    if (input && selectedUserId && trainer?._id) {
      const message = {
        senderId: trainer._id,
        receiverId: selectedUserId,
        message: input,
        createdAt: new Date(),
      };
      socket.emit("sendMessage", message);
      dispatch(
        addMessage({
          _id: Date.now(),
          senderId: trainer?._id,
          receiverId: selectedUserId,
          message: input,
          createdAt: new Date(),
        })
      );
      setInput("");
    }
  };

  const handleUserClick = (otherUserId: string) => {
    setSelectedUserId(otherUserId);
  };
  const selectedUser = fetchedSubscribers.find(
    (user) => user.userId === selectedUserId
  );
  const isPlanActive = selectedUser?.planStatus === "active";
  useEffect(() => {
    if (messagesEndRef.current && !chatLoading) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, selectedUserId, chatLoading]);

  return (
    <Box
      sx={{
        height: "100vh",
        maxHeight: "600px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {chatLoading || subLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            flex: 1,
            bgcolor: "grey.300",
            borderRadius: 5,
            border: 1,
            borderColor: "grey.300",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              width: { xs: "100%", md: "250px" },
              bgcolor: "white",
              border: 1,
              borderColor: "grey.300",
              overflowY: "auto",
              scrollbarWidth: "none",
            }}
          >
            <Typography
              variant="h6"
              sx={{ p: 2, fontWeight: "bold", color: "grey.700" }}
            >
              Messages
            </Typography>
            <List sx={{ p: 0 }}>
              {fetchedSubscribers.map((contact) => (
                <ListItem key={contact._id} disablePadding>
                  <ListItemButton
                    onClick={() => handleUserClick(contact.userId)}
                    sx={{
                      backgroundColor:
                        selectedUserId === contact.userId
                          ? "grey.300"
                          : "inherit",
                      "&:hover": {
                        backgroundColor:
                          selectedUserId === contact.userId
                            ? "grey.400"
                            : "grey.200",
                      },
                      borderRadius: 1,
                      mx: 1,
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar src={contact?.profilePic ?? undefined}>
                        {!contact?.profilePic && contact?.name.charAt(0)}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={contact.name}
                      secondary={
                        <Typography
                          component="span"
                          variant="body2"
                          color={
                            contact.planStatus === "active"
                              ? "success.main"
                              : "error.main"
                          }
                        >
                          {contact.planStatus === "active"
                            ? ""
                            : "Plan Expired"}
                        </Typography>
                      }
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
          <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <Box
              sx={{
                p: 2,
                bgcolor: "white",
                borderBottom: 1,
                borderColor: "grey.200",
                display: "flex",
                alignItems: "center",
              }}
            >
              {selectedUserId ? (
                <Avatar
                  src={
                    selectedUserId
                      ? (fetchedSubscribers.find(
                          (user) => user.userId === selectedUserId
                        )?.profilePic ?? undefined)
                      : ""
                  }
                  alt="User Image"
                  sx={{ mr: 2 }}
                >
                  {selectedUserId
                    ? fetchedSubscribers
                        .find((user) => user.userId === selectedUserId)
                        ?.name?.charAt(0)
                    : ""}
                </Avatar>
              ) : (
                ""
              )}
              <Typography variant="h6" color="grey.700">
                {selectedUserId
                  ? fetchedSubscribers.find(
                      (user) => user.userId === selectedUserId
                    )?.name
                  : ""}
              </Typography>
            </Box>

            <Box
              sx={{
                flex: 1,
                p: 2,
                overflowY: "auto",
                bgcolor: "grey.100",
                scrollbarWidth: "none",
              }}
            >
              {selectedUserId ? (
                messages.length > 0 ? (
                  messages.map((message) => (
                    <Box
                      ref={messagesEndRef}
                      key={message._id}
                      sx={{
                        display: "flex",
                        mb: 2,
                        justifyContent:
                          message.senderId.toString() ===
                          trainer?._id.toString()
                            ? "flex-end"
                            : "flex-start",
                      }}
                    >
                      <Box
                        sx={{
                          maxWidth: "70%",
                          p: 1,
                          borderRadius: 2,
                          bgcolor:
                            message.senderId.toString() ===
                            trainer?._id.toString()
                              ? "#1d4ed8"
                              : "grey.200",
                          color:
                            message.senderId.toString() ===
                            trainer?._id.toString()
                              ? "white"
                              : "black",
                          boxShadow: 1,
                        }}
                      >
                        <Typography variant="body2">
                          {message.message}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            display: "block",
                            textAlign: "right",
                            color:
                              message.senderId.toString() ===
                              trainer?._id.toString()
                                ? "rgba(255, 255, 255, 0.7)"
                                : "grey.600",
                            mt: 0.5,
                          }}
                        >
                          {new Date(message.createdAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </Typography>
                      </Box>
                    </Box>
                  ))
                ) : (
                  <Typography color="grey.500" align="center">
                    No messages yet
                  </Typography>
                )
              ) : (
                <Typography color="grey.500" align="center">
                  Please select a user to chat with
                </Typography>
              )}
            </Box>

            <Box
              sx={{
                p: 2,
                bgcolor: "white",
                borderTop: 1,
                borderColor: "grey.200",
                display: "flex",
                gap: 1,
                alignItems: "center",
              }}
            >
              <TextField
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                variant="outlined"
                size="small"
                fullWidth
                sx={{ bgcolor: "white" }}
                disabled={!isPlanActive}
              />
              <Box sx={{ position: "relative" }}>
                <Button
                  variant="outlined"
                  onClick={() => setShowPicker((prev) => !prev)}
                  sx={{ minWidth: "40px", p: 0.9 }}
                  disabled={!isPlanActive}
                >
                  😊
                </Button>
                {showPicker && (
                  <Box
                    ref={pickerRef}
                    sx={{
                      position: "absolute",
                      bottom: "50px",
                      right: 0,
                      zIndex: 1000,
                    }}
                  >
                    <Picker
                      onEmojiClick={onEmojiClick}
                      disableAutoFocus={true}
                      pickerStyle={{ width: "300px" }}
                    />
                  </Box>
                )}
              </Box>
              <Button
                variant="contained"
                endIcon={<SendIcon />}
                onClick={handleSendMessage}
                sx={{
                  borderRadius: 1,
                  backgroundColor: "#1d4ed8",
                  color: "white",
                }}
                disabled={!isPlanActive}
              >
                Send
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ChatPage;
