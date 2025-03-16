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
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          maxWidth: "600px",
          width: "100%",
          borderRadius: 3,
          p: 4,
          position: "relative",
          backgroundColor: "#fff",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 12,
            right: 12,
            color: "#757575",
            "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.04)" },
          }}
        >
          <CloseIcon />
        </IconButton>

        <Typography
          variant="h6"
          sx={{
            fontWeight: 500,
            mb: 2,
            color: "#202124",
          }}
        >
          {isEditMode ? "EDIT PLAYLIST" : "ADD NEW PLAYLIST"}
        </Typography>

        <Divider sx={{ mb: 3, borderColor: "rgba(0, 0, 0, 0.12)" }} />

        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
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
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
          />
        </Box>

        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
          <Button
            variant="contained"
            onClick={onClose}
            sx={{
              mr: 2,
              backgroundColor: "#f1f3f4",
              color: "#202124",
              textTransform: "none",
              borderRadius: 2,
            }}
          >
            CANCEL
          </Button>
          <Button
            variant="contained"
            onClick={formik.handleSubmit}
            sx={{
              backgroundColor: "#1d4ed8",
              color: "white",
              textTransform: "none",
              borderRadius: 2,
            }}
          >
            {isEditMode ? "UPDATE PLAYLIST" : "ADD PLAYLIST"}
          </Button>
        </Box>
      </Paper>
    </Modal>
  );
};

export default PlayList;
