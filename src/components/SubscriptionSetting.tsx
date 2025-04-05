import React from "react";
import {
  Box,
  Button,
  Modal,
  Paper,
  Typography,
  TextField,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  FormHelperText,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";

interface SubscriptionFormProps {
  open: boolean;
  onClose: () => void;
  subPeriods: string[];
  formik: any;
  isEditMode: boolean;
}

const TrainerSubscriptionForm: React.FC<SubscriptionFormProps> = ({
  open,
  onClose,
  subPeriods,
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
          {isEditMode ? "EDIT SUBSCRIPTION" : "ADD NEW PLAN"}
        </Typography>

        <Divider sx={{ mb: 3, borderColor: "rgba(0, 0, 0, 0.12)" }} />

        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <FormControl
            fullWidth
            size="small"
            error={formik.touched.subPeriod && Boolean(formik.errors.subPeriod)}
          >
            <InputLabel id="sub-period-label">Subscription Period</InputLabel>
            <Select
              labelId="sub-period-label"
              name="subPeriod"
              value={formik.values.subPeriod}
              label="Subscription Period"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              MenuProps={{
                PaperProps: {
                  sx: {
                    boxShadow: "none",
                    border: "1px solid gray",
                  },
                },
              }}
            >
              {subPeriods && subPeriods.length > 0 ? (
                subPeriods.map((period) => (
                  <MenuItem key={period} value={period}>
                    {period.charAt(0).toUpperCase() + period.slice(1)}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>No options available</MenuItem>
              )}
            </Select>
            {formik.touched.subPeriod && formik.errors.subPeriod && (
              <FormHelperText>{formik.errors.subPeriod}</FormHelperText>
            )}
          </FormControl>

          <TextField
            fullWidth
            label="Price"
            name="price"
            type="number"
            size="small"
            value={formik.values.price}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.price && Boolean(formik.errors.price)}
            helperText={formik.touched.price && formik.errors.price}
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
          />

          <TextField
            fullWidth
            label="Duration in Weeks"
            name="durationInWeeks"
            type="number"
            size="small"
            disabled
            value={formik.values.durationInWeeks}
            onBlur={formik.handleBlur}
            error={
              formik.touched.durationInWeeks &&
              Boolean(formik.errors.durationInWeeks)
            }
            helperText={
              formik.touched.durationInWeeks && formik.errors.durationInWeeks
            }
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
          />

          <TextField
            fullWidth
            label="Sessions per Week"
            name="sessionsPerWeek"
            type="number"
            size="small"
            value={formik.values.sessionsPerWeek}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.sessionsPerWeek &&
              Boolean(formik.errors.sessionsPerWeek)
            }
            helperText={
              formik.touched.sessionsPerWeek && formik.errors.sessionsPerWeek
            }
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
          />

          <TextField
            fullWidth
            label="Total Sessions"
            name="totalSessions"
            type="number"
            size="small"
            disabled
            value={formik.values.totalSessions}
            onBlur={formik.handleBlur}
            error={
              formik.touched.totalSessions &&
              Boolean(formik.errors.totalSessions)
            }
            helperText={
              formik.touched.totalSessions && formik.errors.totalSessions
            }
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
              backgroundColor: "black",
              color: "white",
              textTransform: "none",
              borderRadius: 2,
            }}
          >
            {isEditMode ? "UPDATE SUBSCRIPTION" : "ADD SUBSCRIPTION"}
          </Button>
        </Box>
      </Paper>
    </Modal>
  );
};

export default TrainerSubscriptionForm;
