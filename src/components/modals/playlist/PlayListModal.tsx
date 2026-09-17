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
import { FormikProps } from "formik";
import { PlayListFormik } from "../../../hooks/useTrainerContent";
import { styles } from "./stylePlaylist";

interface PlayListProps {
  open: boolean;
  onClose: () => void;
  formik: FormikProps<PlayListFormik>;
  isEditMode: boolean;
}

const PlayList: React.FC<PlayListProps> = ({
  open,
  onClose,
  formik,
  isEditMode,
}) => {
  return (
    <Modal open={open} onClose={close} sx={styles.modal}>
      <Paper elevation={3} sx={styles.paper}>
        <IconButton onClick={onClose} sx={styles.closeButton}>
          <CloseIcon />
        </IconButton>

        <Typography variant="h6" sx={styles.title}>
          {isEditMode ? "EDIT PLAYLIST" : "ADD PLAYLIST"}
        </Typography>

        <Divider sx={styles.divider} />
        <form onSubmit={formik.handleSubmit}>
          <Box sx={styles.formContainer}>
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
              sx={styles.textField}
            />
          </Box>

          <Box sx={styles.buttonContainer}>
            <Button
              variant="contained"
              onClick={onClose}
              sx={styles.cancelButton}
            >
              CANCEL
            </Button>
            <Button
              disabled={formik.isSubmitting}
              type="submit"
              variant="contained"
              sx={styles.submitButton}
            >
              {isEditMode ? "UPDATE" : "ADD"}
            </Button>
          </Box>
        </form>
      </Paper>
    </Modal>
  );
};

export default PlayList;
