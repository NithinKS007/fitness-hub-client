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

interface WorkOutModalProps {
  open: boolean;
  selectedDate: any;
  workoutData: any[];
  formik: any;
  handleClose: () => void;
  addWorkout: (bodyPart: string, exercise: string) => void;
  removeWorkout: (index: number) => void;
  addNewRow: (index: number) => void;
  handleDateChange: (date: any) => void;
  isExerciseDisabled: (bodyPart: string, exercise: string) => boolean;
  handleBodyPartChange: (event: any) => void;
}

const modalBoxStyles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", sm: 500, md: 1000 },
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
  mb: 2,
};

const closeButtonStyles = {
  p: 1,
};

const formContainerStyles = {
  display: "flex",
  flexDirection: "column",
  gap: 2,
};

const selectStyles = {
  mb: 1,
};

const exerciseContainerStyles = {
  display: "flex",
  flexWrap: "wrap",
  gap: 1,
  mt: 1,
};

const workoutListStyles = {
  mt: 3,
  mb: 2,
};

const noWorkoutsStyles = {
  mt: 1,
};

const workoutRowStyles = {
  display: "flex",
  alignItems: "flex-start",
  mb: 2,
  gap: 1,
};

const exerciseTextStyles = {
  flex: 1,
  mt: 1.5,
};

const kgFieldStyles = {
  minWidth: 100,
};

const repsFieldStyles = {
  minWidth: 100,
};

const timeFieldStyles = {
  minWidth: 120,
};

const addButtonStyles = {
  mt: 1,
};

const deleteButtonStyles = {
  mt: 1,
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

const saveButtonStyles = {
  width: { xs: "100%", sm: "auto" },
  backgroundColor: "#1f2937",
  color: "white",
};

const calendarIconStyles = {
  fontSize: "large",
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
}) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalBoxStyles}>
        <Box sx={headerBoxStyles}>
          <Typography variant="h6">Add Workout</Typography>
          <IconButton onClick={handleClose} sx={closeButtonStyles}>
            <CloseIcon />
          </IconButton>
        </Box>

        <form onSubmit={formik.handleSubmit}>
          <Box sx={formContainerStyles}>
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
                            <CalendarTodayIcon sx={calendarIconStyles} />
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
                sx={selectStyles}
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
                <Box sx={exerciseContainerStyles}>
                  {workoutData
                    .find(
                      (item) => item.bodyPart === formik.values.selectedBodyPart
                    )
                    ?.exercises.map((exercise: string) => (
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

          <Box sx={workoutListStyles}>
            {formik.values.workouts.length === 0 ? (
              <Typography color="text.secondary" sx={noWorkoutsStyles}>
                No workouts added yet.
              </Typography>
            ) : (
              formik.values.workouts.map((workout: any, index: number) => (
                <Box key={index} sx={workoutRowStyles}>
                  <Typography sx={exerciseTextStyles}>
                    {workout.exercise}
                  </Typography>
                  <Box sx={kgFieldStyles}>
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
                        Boolean(formik.errors.workouts?.[index]?.kg)
                      }
                      helperText={
                        formik.touched.workouts?.[index]?.kg &&
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
                  <Box sx={repsFieldStyles}>
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
                        Boolean(formik.errors.workouts?.[index]?.reps)
                      }
                      helperText={
                        formik.touched.workouts?.[index]?.reps &&
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
                  <Box sx={timeFieldStyles}>
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
                        Boolean(formik.errors.workouts?.[index]?.time)
                      }
                      helperText={
                        formik.touched.workouts?.[index]?.time &&
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
                    sx={addButtonStyles}
                    color="primary"
                  >
                    <AddIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    sx={deleteButtonStyles}
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

          <Box sx={buttonContainerStyles}>
            <Button
              variant="outlined"
              onClick={handleClose}
              sx={cancelButtonStyles}
            >
              Cancel
            </Button>
            <Button type="submit" variant="contained" sx={saveButtonStyles}>
              Save
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default WorkOutModal;
