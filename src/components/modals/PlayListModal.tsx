import React from "react";
import {
  Box,
  Button,
  Modal,
  Paper,
  Typography,
  TextField,
  Divider,
  IconButton,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";

interface PlayListProps {
  open: boolean;
  onClose: () => void;
  formik: any;
  isEditMode: boolean;
}

const modalStyles = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const paperStyles = {
  maxWidth: "600px",
  width: "100%",
  borderRadius: 3,
  p: 4,
  position: "relative",
  backgroundColor: "#fff",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
};

const closeButtonStyles = {
  position: "absolute",
  top: 12,
  right: 12,
  color: "#757575",
  "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.04)" },
};

const titleStyles = {
  fontWeight: 500,
  mb: 2,
  color: "#202124",
};

const dividerStyles = {
  mb: 3,
  borderColor: "rgba(0, 0, 0, 0.12)",
};

const formContainerStyles = {
  display: "flex",
  flexDirection: "column",
  gap: 3,
};

const textFieldStyles = {
  "& .MuiOutlinedInput-root": { borderRadius: 2 },
};

const buttonContainerStyles = {
  display: "flex",
  justifyContent: "flex-end",
  mt: 4,
};

const cancelButtonStyles = {
  mr: 2,
  backgroundColor: "#f1f3f4",
  color: "#202124",
  textTransform: "none",
  borderRadius: 2,
};

const submitButtonStyles = {
  backgroundColor: "#1f2937",
  color: "white",
  textTransform: "none",
  borderRadius: 2,
};

const PlayList: React.FC<PlayListProps> = ({
  open,
  onClose,
  formik,
  isEditMode,
}) => {
  return (
    <Modal
      open={open}
      onClose={() => {
        onClose();
        formik.resetForm();
      }}
      sx={modalStyles}
    >
      <Paper elevation={3} sx={paperStyles}>
        <IconButton onClick={onClose} sx={closeButtonStyles}>
          <CloseIcon />
        </IconButton>

        <Typography variant="h6" sx={titleStyles}>
          {isEditMode ? "EDIT PLAYLIST" : "ADD NEW PLAYLIST"}
        </Typography>

        <Divider sx={dividerStyles} />

        <Box sx={formContainerStyles}>
          <TextField
            fullWidth
            label="Playlist Name"
            name="title"
            size="small"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
            sx={textFieldStyles}
          />
        </Box>

        <Box sx={buttonContainerStyles}>
          <Button variant="contained" onClick={onClose} sx={cancelButtonStyles}>
            CANCEL
          </Button>
          <Button
            variant="contained"
            onClick={formik.handleSubmit}
            sx={submitButtonStyles}
          >
            {isEditMode ? "UPDATE PLAYLIST" : "ADD PLAYLIST"}
          </Button>
        </Box>
      </Paper>
    </Modal>
  );
};

export default PlayList;