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
  Stack,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

interface ChatContact {
  _id: string;
  contactId: string;
  name: string;
  profilePic: string | null;
  planStatus: string;
}

interface ChatMessage {
  _id: string;
  senderId: string;
  receiverId: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
}

interface ReusableChatProps {
  contacts: ChatContact[];
  messages: ChatMessage[];
  selectedId: string | null;
  input: string;
  isPlanActive: boolean;
  isOnline: boolean;
  onContactClick: (id: string) => void;
  onInputChange: (value: string) => void;
  onSendClick: () => void;
  onEmojiClick: () => void;
  messagesEndRef: React.RefObject<HTMLDivElement>;
  currentUserId: string;
  onTyping: () => void;
  typing: string | null;
  typingIndicatorRef: React.RefObject<HTMLDivElement>;
}

const ReusableChat = ({
  contacts,
  messages,
  selectedId,
  input,
  isPlanActive,
  isOnline,
  onContactClick,
  onInputChange,
  onSendClick,
  onEmojiClick,
  messagesEndRef,
  currentUserId,
  onTyping,
  typing,
  typingIndicatorRef,
}: ReusableChatProps) => {
  const selectedContact = contacts.find(
    (contact) => contact.contactId === selectedId
  );

  console.log("typing", typing);
  return (
    <Box
      sx={{
        height: "100vh",
        maxHeight: "620px",
        display: "flex",
        flexDirection: "column",
      }}
    >
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
            {contacts.map((contact) => (
              <ListItem key={contact._id} disablePadding>
                <ListItemButton
                  onClick={() => onContactClick(contact.contactId)}
                  sx={{
                    backgroundColor:
                      selectedId === contact.contactId ? "grey.300" : "inherit",
                    "&:hover": {
                      backgroundColor:
                        selectedId === contact.contactId
                          ? "grey.400"
                          : "grey.200",
                    },
                    borderRadius: 1,
                    mx: 1,
                    height: 64,
                    transition: "background-color 0.3s ease",
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
                        {contact.planStatus === "active" ? "" : "Plan Expired"}
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
            {selectedId && (
              <>
                <Avatar
                  src={selectedContact?.profilePic ?? undefined}
                  alt="Contact Image"
                  sx={{ mr: 2 }}
                >
                  {selectedContact?.name.charAt(0)}
                </Avatar>
                <Stack spacing={0} alignItems="flex-start">
                  <Typography variant="h6" color="grey.700">
                    {selectedContact?.name}
                  </Typography>
                  {selectedId && (
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
                        {isOnline ? "online" : "offline"}
                      </Typography>
                    </Stack>
                  )}
                </Stack>
              </>
            )}
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
            {selectedId ? (
              messages.length > 0 ? (
                <>
                  {messages.map((message) => (
                    <Box
                      key={message._id}
                      sx={{
                        display: "flex",
                        mb: 2,
                        justifyContent:
                          message.senderId.toString() === currentUserId
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
                            message.senderId.toString() === currentUserId
                              ? "#1f2937"
                              : "grey.200",
                          color:
                            message.senderId.toString() === currentUserId
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
                              message.senderId.toString() === currentUserId
                                ? "rgba(255, 255, 255, 0.7)"
                                : "grey.600",
                            mt: 0.5,
                          }}
                        >
                          {new Date(message.createdAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                          {message.senderId.toString() === currentUserId ? (
                            <span style={{ marginLeft: "3px" }}>
                              {message?.isRead ? "✔✔" : "✔"}
                            </span>
                          ) : (
                            ""
                          )}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                  <div ref={messagesEndRef} />
                  {typing && (
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        mb: 2,
                      }}
                      ref={typingIndicatorRef}
                    >
                      <Box
                        sx={{
                          maxWidth: "70%",
                          p: 1,
                          borderRadius: 2,
                          bgcolor: "grey.200",
                          color: "grey.600",
                          boxShadow: 1,
                        }}
                      >
                        <Typography variant="body2">Typing...</Typography>
                      </Box>
                    </Box>
                  )}
                </>
              ) : (
                <Typography color="grey.500" align="center">
                  No messages yet
                </Typography>
              )
            ) : (
              <Typography color="grey.500" align="center">
                Please select a contact to chat with
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
              onChange={(e) => {
                onInputChange(e.target.value);
                onTyping();
              }}
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
                onClick={onEmojiClick}
                sx={{ minWidth: "40px", p: 0.9 }}
                disabled={!isPlanActive}
              >
                😊
              </Button>
            </Box>
            <Button
              variant="contained"
              endIcon={<SendIcon />}
              onClick={onSendClick}
              sx={{
                borderRadius: 1,
                backgroundColor: "#1f2937",
                color: "white",
              }}
              disabled={!isPlanActive}
            >
              Send
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ReusableChat;
