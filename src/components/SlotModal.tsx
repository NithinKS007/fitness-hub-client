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

const SlotModal: React.FC<SlotModalProps> = ({
  open,
  handleClose,
  formik,
  timeOptions,
  handleDateChange,
}) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
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
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography
            sx={{ display: "flex", alignItems: "center", font: "message-box" }}
          >
            <AddCircleIcon fontSize="small" style={{ marginRight: "8px" }} />
            ADD NEW BOOKING SLOT
          </Typography>
          <IconButton onClick={handleClose} sx={{ p: 0 }}>
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
          sx={{ mb: 2 }}
          error={formik.touched.date && Boolean(formik.errors.date)}
          helperText={formik.touched.date && formik.errors.date}
        />

        <Box sx={{ mb: 2 }}>
          <Select
            name="time"
            value={formik.values.time}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            fullWidth
            displayEmpty
            MenuProps={{
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
            }}
            error={formik.touched.time && Boolean(formik.errors.time)}
          >
            <MenuItem value="" sx={{ height: "36px" }}>
              Select Time
            </MenuItem>
            {timeOptions.map((time) => (
              <MenuItem key={time} value={time} sx={{ height: "36px" }}>
                {time}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText
            error={formik.touched.time && Boolean(formik.errors.time)}
            sx={{
              m: 0,
              ml: "14px",
              mt: "3px",
            }}
          >
            {formik.touched.time && formik.errors.time}
          </FormHelperText>
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: 2,
            justifyContent: "flex-end",
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <Button
            variant="outlined"
            onClick={handleClose}
            sx={{ width: { xs: "100%", sm: "auto" } }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={formik.handleSubmit}
            disabled={formik.isSubmitting}
            sx={{
              width: { xs: "100%", sm: "auto" },
              backgroundColor: "#1d4ed8",
              color: "white",
            }}
          >
            Add Slot
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default SlotModal;
