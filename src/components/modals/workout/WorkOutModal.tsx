import React from "react";
import {
  Button,
  Modal,
  Box,
  Typography,
  Select,
  MenuItem,
  TextField,
  IconButton,
  FormControl,
  InputAdornment,
} from "@mui/material";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CloseIcon from "@mui/icons-material/Close";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { Dayjs } from "dayjs";
import { styles } from "./styleWorkout";
import {
  Workout,
  WorkoutFormik,
  WorkoutItem,
} from "../../../hooks/useWorkouts";
import { FormikErrors, FormikProps } from "formik";

interface WorkOutModalProps {
  open: boolean;
  selectedDate: Dayjs | null;
  workoutData: WorkoutItem[];
  formik: FormikProps<WorkoutFormik>;
  handleClose: () => void;
  addWorkout: (bodyPart: string, exercise: string) => void;
  removeWorkout: (index: number) => void;
  addNewRow: (index: number) => void;
  handleDateChange: (date: Dayjs | null) => void;
  isExerciseDisabled: (bodyPart: string, exercise: string) => boolean;
  handleBodyPartChange: (event: any) => void;
  selectedExercises: string[];
}

const isWorkoutError = (
  error: string | FormikErrors<Workout> | undefined
): error is FormikErrors<Workout> => {
  return typeof error === "object" && error !== null;
};

const WorkOutModal: React.FC<WorkOutModalProps> = ({
  open,
  selectedDate,
  workoutData,
  formik,
  handleClose,
  addWorkout,
  removeWorkout,
  addNewRow,
  handleDateChange,
  isExerciseDisabled,
  handleBodyPartChange,
  selectedExercises,
}) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={styles.modalBox}>
        <Box sx={styles.headerBox}>
          <Typography variant="h6">ADD WORKOUT</Typography>
          <IconButton onClick={handleClose} sx={styles.closeButton}>
            <CloseIcon />
          </IconButton>
        </Box>

        <form onSubmit={formik.handleSubmit}>
          <Box sx={styles.formContainer}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <FormControl fullWidth>
                <MobileDatePicker
                  label="Select Date"
                  orientation="landscape"
                  value={selectedDate}
                  onAccept={handleDateChange}
                  slots={{ textField: TextField }}
                  slotProps={{
                    textField: {
                      size: "medium",
                      variant: "outlined",
                      InputProps: {
                        endAdornment: (
                          <InputAdornment position="end">
                            <CalendarTodayIcon sx={styles.calendarIcon} />
                          </InputAdornment>
                        ),
                      },
                    },
                  }}
                />
              </FormControl>
            </LocalizationProvider>

            <Box>
              <Select
                name="selectedBodyPart"
                value={formik.values.selectedBodyPart || ""}
                onChange={handleBodyPartChange}
                onBlur={formik.handleBlur}
                displayEmpty
                fullWidth
                size="medium"
                sx={styles.select}
                renderValue={(selected) =>
                  selected ? selected : "Select a Body Part"
                }
                error={
                  formik.touched.selectedBodyPart &&
                  Boolean(formik.errors.selectedBodyPart)
                }
              >
                {workoutData.map((item) => (
                  <MenuItem key={item.bodyPart} value={item.bodyPart}>
                    {item.bodyPart}
                  </MenuItem>
                ))}
              </Select>
              {formik.touched.selectedBodyPart &&
                formik.errors.selectedBodyPart && (
                  <Typography color="error" variant="caption">
                    {formik.errors.selectedBodyPart}
                  </Typography>
                )}

              {formik.values.selectedBodyPart && (
                <Box sx={styles.exerciseContainer}>
                  {selectedExercises.map((exercise: string) => (
                    <Button
                      key={`${formik.values.selectedBodyPart}-${exercise}`}
                      onClick={() =>
                        addWorkout(formik.values.selectedBodyPart, exercise)
                      }
                      variant="outlined"
                      size="medium"
                      disabled={isExerciseDisabled(
                        formik.values.selectedBodyPart,
                        exercise
                      )}
                    >
                      {exercise}
                    </Button>
                  ))}
                </Box>
              )}
            </Box>
          </Box>

          <Box sx={styles.workoutList}>
            {formik.values.workouts.length === 0 ? (
              <Typography color="text.secondary" sx={styles.noWorkouts}>
                No workouts added yet.
              </Typography>
            ) : (
              formik.values.workouts.map((workout: Workout, index: number) => (
                <Box key={index} sx={styles.workoutRow}>
                  <Typography sx={styles.exerciseText}>
                    {workout.exercise}
                  </Typography>
                  <Box sx={styles.kgField}>
                    <TextField
                      label="Kg"
                      type="number"
                      name={`workouts[${index}].kg`}
                      value={workout.kg}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      size="medium"
                      fullWidth
                      error={
                        formik.touched.workouts?.[index]?.kg &&
                        isWorkoutError(formik.errors.workouts?.[index]) &&
                        Boolean(formik.errors.workouts?.[index]?.kg)
                      }
                      helperText={
                        formik.touched.workouts?.[index]?.kg &&
                        isWorkoutError(formik.errors.workouts?.[index]) &&
                        formik.errors.workouts?.[index]?.kg ? (
                          formik.errors.workouts[index].kg
                        ) : (
                          <span style={{ visibility: "hidden" }}>
                            Placeholder
                          </span>
                        )
                      }
                    />
                  </Box>
                  <Box sx={styles.repsField}>
                    <TextField
                      label="Reps"
                      type="number"
                      name={`workouts[${index}].reps`}
                      value={workout.reps}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      size="medium"
                      fullWidth
                      error={
                        formik.touched.workouts?.[index]?.reps &&
                        isWorkoutError(formik.errors.workouts?.[index]) &&
                        Boolean(formik.errors.workouts?.[index]?.reps)
                      }
                      helperText={
                        formik.touched.workouts?.[index]?.reps &&
                        isWorkoutError(formik.errors.workouts?.[index]) &&
                        formik.errors.workouts?.[index]?.reps ? (
                          formik.errors.workouts[index].reps
                        ) : (
                          <span style={{ visibility: "hidden" }}>
                            Placeholder
                          </span>
                        )
                      }
                    />
                  </Box>
                  <Box sx={styles.timeField}>
                    <TextField
                      label="Time (min)"
                      type="number"
                      name={`workouts[${index}].time`}
                      value={workout.time}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      size="medium"
                      fullWidth
                      error={
                        formik.touched.workouts?.[index]?.time &&
                        isWorkoutError(formik.errors.workouts?.[index]) &&
                        Boolean(formik.errors.workouts?.[index]?.time)
                      }
                      helperText={
                        formik.touched.workouts?.[index]?.time &&
                        isWorkoutError(formik.errors.workouts?.[index]) &&
                        formik.errors.workouts?.[index]?.time ? (
                          formik.errors.workouts[index].time
                        ) : (
                          <span style={{ visibility: "hidden" }}>
                            Placeholder
                          </span>
                        )
                      }
                    />
                  </Box>
                  <IconButton
                    onClick={() => addNewRow(index)}
                    sx={styles.addButton}
                    color="primary"
                  >
                    <AddIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    sx={styles.deleteButton}
                    onClick={() => removeWorkout(index)}
                    aria-label="remove workout"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ))
            )}
            {formik.touched.workouts &&
              formik.errors.workouts &&
              typeof formik.errors.workouts === "string" && (
                <Typography color="error" variant="caption">
                  {formik.errors.workouts}
                </Typography>
              )}
          </Box>

          <Box sx={styles.buttonContainer}>
            <Button
              variant="outlined"
              onClick={handleClose}
              sx={styles.cancelButton}
            >
              CANCEL
            </Button>
            <Button
              disabled={formik.isSubmitting}
              type="submit"
              variant="contained"
              sx={styles.saveButton}
            >
              ADD
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default WorkOutModal;
