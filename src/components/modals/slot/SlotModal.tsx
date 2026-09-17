import React from "react";
import {
  Box,
  Button,
  Modal,
  Typography,
  IconButton,
  TextField,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { FormikProps } from "formik";
import { SlotFormik } from "../../../hooks/useSlot";
import { styles } from "./styleSlot";

interface SlotModalProps {
  open: boolean;
  handleClose: () => void;
  formik: FormikProps<SlotFormik>;
  timeOptions: string[];
  handleDateChange: (date: string) => void;
}

const SlotModal: React.FC<SlotModalProps> = ({
  open,
  handleClose,
  formik,
  timeOptions,
  handleDateChange,
}) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <form onSubmit={formik.handleSubmit}>
        <Box sx={styles.modalBox}>
          <Box sx={styles.headerBox}>
            <Typography sx={styles.typography}>
              <AddCircleIcon fontSize="small" style={{ marginRight: "8px" }} />
              ADD NEW BOOKING SLOT
            </Typography>
            <IconButton onClick={handleClose} sx={styles.closeButton}>
              <Close />
            </IconButton>
          </Box>

          <TextField
            label="Date"
            type="date"
            value={formik.values.date}
            onChange={(e) => handleDateChange(e.target.value)}
            onBlur={formik.handleBlur}
            fullWidth
            slotProps={{
              inputLabel: { shrink: true },
              input: {
                inputProps: {
                  min: new Date().toISOString().split("T")[0],
                },
              },
            }}
            sx={styles.textField}
            error={formik.touched.date && Boolean(formik.errors.date)}
            helperText={formik.touched.date && formik.errors.date}
          />

          <Box sx={styles.selectBox}>
            <Select
              name="time"
              value={formik.values.time}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              fullWidth
              displayEmpty
              MenuProps={styles.menuProps}
              error={formik.touched.time && Boolean(formik.errors.time)}
            >
              <MenuItem value="" sx={styles.menuItem}>
                Select Time
              </MenuItem>
              {timeOptions.map((time) => (
                <MenuItem key={time} value={time} sx={styles.menuItem}>
                  {time}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText
              error={formik.touched.time && Boolean(formik.errors.time)}
              sx={styles.helperText}
            >
              {formik.touched.time && formik.errors.time}
            </FormHelperText>
          </Box>

          <Box sx={styles.buttonContainer}>
            <Button
              variant="outlined"
              onClick={handleClose}
              sx={styles.cancelButton}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={formik.isSubmitting}
              sx={styles.submitButton}
            >
              Add Slot
            </Button>
          </Box>
        </Box>
      </form>
    </Modal>
  );
};

export default SlotModal;
