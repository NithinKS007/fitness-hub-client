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
import { FormikProps } from "formik";
import { SubFormik } from "../../../hooks/useSubscription";
import { styles } from "./styleSubscription";

interface SubscriptionModalProps {
  open: boolean;
  onClose: () => void;
  subPeriods: string[];
  formik: FormikProps<SubFormik>;
  isEditMode: boolean;
}

const SubscriptionModal: React.FC<SubscriptionModalProps> = ({
  open,
  onClose,
  subPeriods,
  formik,
  isEditMode,
}) => {
  return (
    <Modal open={open} onClose={onClose} sx={styles.modal}>
      <Paper elevation={3} sx={styles.paper}>
        <IconButton onClick={onClose} sx={styles.closeButton}>
          <CloseIcon />
        </IconButton>
        <Typography variant="h6" sx={styles.title}>
          {isEditMode ? "EDIT SUBSCRIPTION" : "ADD SUBSCRIPTION PLAN"}
        </Typography>

        <Divider sx={styles.divider} />
        <form onSubmit={formik.handleSubmit}>
          <Box sx={styles.formContainer}>
            <FormControl
              fullWidth
              size="small"
              error={
                formik.touched.subPeriod && Boolean(formik.errors.subPeriod)
              }
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
              sx={styles.textField}
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
              sx={styles.textField}
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
              sx={styles.textField}
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
              sx={styles.textField}
            />
          </Box>

          <Box sx={styles.actionButtons}>
            <Button
              variant="contained"
              onClick={onClose}
              sx={styles.cancelButton}
            >
              CANCEL
            </Button>
            <Button
              variant="contained"
              type="submit"
              disabled={formik.isSubmitting}
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

export default SubscriptionModal;
