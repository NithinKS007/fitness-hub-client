import { useState, useEffect, useRef } from "react";
import { socket } from "../../config/socket";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { fetchChatMessages, getUserChatList } from "../../redux/chat/chatThunk";
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
  Stack,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import Picker from "emoji-picker-react";

const UserChatsPage = () => {
  const [input, setInput] = useState("");
  const [selectedTrainerId, setSelectedTrainerId] = useState<string | null>(
    null
  );
  const [showPicker, setShowPicker] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);
  const [isOnline, setIsOnline] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getUserChatList());
  }, [dispatch]);

  const { userChatList } = useSelector((state: RootState) => state.chat);

  const fetchedUserSubscriptionData = userChatList.map((trainer) => ({
    _id: trainer._id,
    trainerId: trainer.trainerId,
    userId: trainer.userId,
    name: `${trainer.subscribedTrainerData.fname} ${trainer.subscribedTrainerData.lname}`,
    profilePic: trainer.subscribedTrainerData.profilePic,
    planStatus: `${trainer.isActive}`,
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
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const { ChatMessages: messages, isLoading: chatLoading } = useSelector(
    (state: RootState) => state.chat
  );

  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (selectedTrainerId && user?._id) {
      dispatch(
        fetchChatMessages({
          senderId: user?._id,
          receiverId: selectedTrainerId,
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
      socket.on(
        "onlineStatusResponse",
        ({ userId, isOnline }: { userId: string; isOnline: boolean }) => {
          if (userId === selectedTrainerId) {
            setIsOnline(isOnline);
          }
        }
      );

      return () => {
        socket.off("receiveMessage");
        socket.off("onlineStatusResponse");
      };
    }
  }, [dispatch, user?._id, selectedTrainerId]);

  const handleSendMessage = () => {
    if (input && selectedTrainerId && user?._id) {
      const message = {
        senderId: user._id,
        receiverId: selectedTrainerId,
        message: input,
        createdAt: new Date(),
      };
      socket.emit("sendMessage", message);
      dispatch(
        addMessage({
          _id: Date.now(),
          senderId: user?._id,
          receiverId: selectedTrainerId,
          message: input,
          createdAt: new Date(),
        })
      );
      setInput("");
    }
  };

  const handleUserClick = (otherUserId: string) => {
    setSelectedTrainerId(otherUserId);
    setIsOnline(false);
    socket.emit("checkOnlineStatus", otherUserId);
  };

  const selectedTrainer = fetchedUserSubscriptionData.find(
    (trainer) => trainer.trainerId === selectedTrainerId
  );
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isPlanActive = selectedTrainer?.planStatus === "active";
  useEffect(() => {
    if (messagesEndRef.current && !chatLoading) {
      messagesEndRef.current.scrollIntoView();
    }
  }, [messages, selectedTrainerId, chatLoading]);

  const onEmojiClick = (emojiObject) => {
    setInput((prev) => prev + emojiObject.emoji);
  };
  return (
    <Box
      sx={{
        height: "100vh",
        maxHeight: "600px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {chatLoading ? (
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
            bgcolor: "black",
            borderRadius: 2,
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
              {fetchedUserSubscriptionData.map((contact) => (
                <ListItem key={contact._id} disablePadding>
                  <ListItemButton
                    onClick={() => handleUserClick(contact.trainerId)}
                    sx={{
                      backgroundColor:
                        selectedTrainerId === contact.trainerId
                          ? "grey.300"
                          : "inherit",
                      "&:hover": {
                        backgroundColor:
                          selectedTrainerId === contact.trainerId
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
              {selectedTrainerId ? (
                <Avatar
                  src={
                    selectedTrainerId
                      ? (fetchedUserSubscriptionData.find(
                          (trainer) => trainer.trainerId === selectedTrainerId
                        )?.profilePic ?? undefined)
                      : ""
                  }
                  alt="User Image"
                  sx={{ mr: 2 }}
                >
                  {selectedTrainerId
                    ? fetchedUserSubscriptionData
                        .find(
                          (trainer) => trainer.trainerId === selectedTrainerId
                        )
                        ?.name?.charAt(0)
                    : ""}
                </Avatar>
              ) : (
                ""
              )}
              <Stack alignItems="flex-start">
                <Typography variant="h6" color="grey.700">
                  {selectedTrainerId
                    ? fetchedUserSubscriptionData.find(
                        (trainer) => trainer.trainerId === selectedTrainerId
                      )?.name
                    : ""}
                </Typography>

                {selectedTrainerId && (
                   <Stack direction="row" alignItems="center" spacing={0.5}>
                        <span
                          style={{
                            width: 8,
                            height: 8,
                            borderRadius: "50%",
                            backgroundColor: isOnline ? "green" : "grey",
                          }}
                        ></span>
                  <Typography
                    variant="body2"
                    color={isOnline ? "success.main" : "grey.500"}
                  >
                    {isOnline ? "Online" : "Offline"}
                  </Typography>
                  </Stack>
                )}
              </Stack>
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
              {selectedTrainerId ? (
                messages && messages.length > 0 ? (
                  messages.map((message) => (
                    <Box
                      ref={messagesEndRef}
                      key={message._id}
                      sx={{
                        display: "flex",
                        mb: 2,
                        justifyContent:
                          message.senderId.toString() === user?._id.toString()
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
                            message.senderId.toString() === user?._id.toString()
                              ? "black"
                              : "grey.200",
                          color:
                            message.senderId.toString() === user?._id.toString()
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
                              user?._id.toString()
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
                  Please select a trainer to chat with
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
                  backgroundColor: "black",
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

export default UserChatsPage;
