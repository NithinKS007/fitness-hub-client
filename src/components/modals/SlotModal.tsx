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

interface SlotModalProps {
  open: boolean;
  handleClose: () => void;
  formik: any;
  timeOptions: string[];
  handleDateChange: (date: string) => void;
}

const modalBoxStyles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", sm: 500, md: 650 },
  maxHeight: "80vh",
  bgcolor: "white",
  borderRadius: 2,
  boxShadow: 24,
  p: { xs: 2, sm: 3, md: 4 },
  overflowY: "auto",
};

const headerBoxStyles = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  mb: 3,
};

const typographyStyles = {
  display: "flex",
  alignItems: "center",
  font: "message-box",
};

const closeButtonStyles = {
  p: 0,
};

const textFieldStyles = {
  mb: 2,
};

const selectBoxStyles = {
  mb: 2,
};

const menuPropsStyles = {
  PaperProps: {
    sx: {
      boxShadow: "none",
      border: "1px solid",
      borderColor: "grey.400",
      borderRadius: 2,
      maxHeight: "200px",
      marginTop: 1,
    },
  },
};

const menuItemStyles = {
  height: "36px",
};

const helperTextStyles = {
  m: 0,
  ml: "14px",
  mt: "3px",
};

const buttonContainerStyles = {
  display: "flex",
  gap: 2,
  justifyContent: "flex-end",
  flexDirection: { xs: "column", sm: "row" },
};

const cancelButtonStyles = {
  width: { xs: "100%", sm: "auto" },
};

const submitButtonStyles = {
  width: { xs: "100%", sm: "auto" },
  backgroundColor: "#1f2937",
  color: "white",
};

const SlotModal: React.FC<SlotModalProps> = ({
  open,
  handleClose,
  formik,
  timeOptions,
  handleDateChange,
}) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalBoxStyles}>
        <Box sx={headerBoxStyles}>
          <Typography sx={typographyStyles}>
            <AddCircleIcon fontSize="small" style={{ marginRight: "8px" }} />
            ADD NEW BOOKING SLOT
          </Typography>
          <IconButton onClick={handleClose} sx={closeButtonStyles}>
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
          sx={textFieldStyles}
          error={formik.touched.date && Boolean(formik.errors.date)}
          helperText={formik.touched.date && formik.errors.date}
        />

        <Box sx={selectBoxStyles}>
          <Select
            name="time"
            value={formik.values.time}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            fullWidth
            displayEmpty
            MenuProps={menuPropsStyles}
            error={formik.touched.time && Boolean(formik.errors.time)}
          >
            <MenuItem value="" sx={menuItemStyles}>
              Select Time
            </MenuItem>
            {timeOptions.map((time) => (
              <MenuItem key={time} value={time} sx={menuItemStyles}>
                {time}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText
            error={formik.touched.time && Boolean(formik.errors.time)}
            sx={helperTextStyles}
          >
            {formik.touched.time && formik.errors.time}
          </FormHelperText>
        </Box>

        <Box sx={buttonContainerStyles}>
          <Button
            variant="outlined"
            onClick={handleClose}
            sx={cancelButtonStyles}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={formik.handleSubmit}
            disabled={formik.isSubmitting}
            sx={submitButtonStyles}
          >
            Add Slot
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default SlotModal;
