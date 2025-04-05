import React from "react";
import { Button, Box, IconButton, MenuItem, Menu } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import useWorkouts from "../../hooks/useWorkouts";
import WorkOutModal from "../../components/WorkOutModal";
import ReuseTable from "../../components/ReuseTable";
import ShimmerTableLoader from "../../components/ShimmerTable";
import { TableColumn } from "../../types/tableTypes";
import SearchBarTable from "../../components/SearchBarTable";
import PaginationTable from "../../components/PaginationTable";
import DateFilter from "../../components/DateAndTimeFilter";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AccessTimeIcon from '@mui/icons-material/AccessTime'; 

const columns: TableColumn[] = [
  { label: "Date", field: "date" },
  { label: "Body Part", field: "bodyPart" },
  { label: "Exercise Name", field: "exerciseName" },
  { label: "Set Number", field: "setNumber" },
  { label: "Kg", field: "kg" },
  { label: "Reps", field: "reps" },
  { label: "Time (s)", field: "time" },
  { label: "Status", field: "setStatus" },
  { label: "More", field: "actions" },
];

const UserWorkoutsPage: React.FC = () => {
  const {
    open,
    selectedDate,
    workoutData,
    formik,
    handleOpen,
    handleClose,
    addWorkout,
    removeWorkout,
    addNewRow,
    handleDateChange,
    isExerciseDisabled,
    handleBodyPartChange,
    handleMenuClick,
    handleMenuClose,
    handleComplete,
    handleDelete,

    anchorEl,
    selectedWorkoutSetId,
  } = useWorkouts();

  const { workouts, isLoading, error } = useSelector(
    (state: RootState) => state.workout
  );

  console.log("work", workouts);

  const mapWorkoutData = (workouts: any) => {
    return workouts.flatMap((workout: any) => {
      const formattedDate = new Date(workout.date).toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
      });

      return workout.workouts.flatMap((workoutItem: any) =>
        workoutItem.exercises.flatMap((exercise: any) =>
          exercise.sets.map((set: any, setIndex: number) => {
            return {
              date: formattedDate,
              bodyPart: workoutItem.bodyPart,
              exerciseName: exercise.name,
              setNumber: `Set ${setIndex + 1}`,
              setStatus: (
                <>
                  {set.isCompleted ? (
                    <>
                      <CheckCircleIcon
                        sx={{
                          color: "green",
                          fontSize: "20px",
                          marginRight: "5px",
                        }}
                      />
                      Completed
                    </>
                  ) : (
                    <>
                    <AccessTimeIcon sx={{ color: "red", fontSize: "20px", marginRight: "5px" }} />
                    Pending
                  </>
                  )}
                </>
              ),
              kg: set.kg,
              reps: set.reps,
              time: set.time,
              actions: (
                <>
                  <IconButton
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={(event) =>
                      handleMenuClick(event, set._id.toString())
                    }
                    sx={{
                      padding: "2px",
                      minWidth: "0",
                      width: "25px",
                      height: "25px",
                    }}
                  >
                    <MoreVertIcon sx={{ fontSize: "20px" }} />
                  </IconButton>
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    sx={{
                      "& .MuiPaper-root": {
                        boxShadow: "none",
                        border: "1px solid",
                        borderColor: "grey.400",
                        borderRadius: 2,
                      },
                    }}
                    open={
                      Boolean(anchorEl) &&
                      selectedWorkoutSetId === set._id.toString()
                    }
                    onClose={handleMenuClose}
                  >
                    <MenuItem onClick={() => handleDelete(set._id.toString())}>
                      Delete
                    </MenuItem>
                    <MenuItem
                      onClick={() => handleComplete(set._id.toString())}
                      disabled={set.isCompleted}
                    >
                      Mark Complete
                    </MenuItem>
                  </Menu>
                </>
              ),
            };
          })
        )
      );
    });
  };

  const fetchedWorkoutData = mapWorkoutData(workouts);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          marginTop: 3,
        }}
      >
        {/* <SearchBarTable /> */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "end",
            gap: 2,
            alignItems: "center",
            width: "100%",
          }}
        >
          {/* <DateFilter /> */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "end",
            }}
          >
            <Button
              variant="contained"
              sx={{
                backgroundColor: "black",
                color: "white",
                textTransform: "none",
                borderRadius: 2,
              }}
              onClick={handleOpen}
            >
              Add Workout
            </Button>
          </Box>
        </Box>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }} />
      {isLoading ? (
        <ShimmerTableLoader columns={columns} />
      ) : error ? (
        <Box>{error}</Box>
      ) : (
        <>
          <ReuseTable columns={columns} data={fetchedWorkoutData} />

          {/* <PaginationTable /> */}
        </>
      )}
      <WorkOutModal
        open={open}
        selectedDate={selectedDate}
        workoutData={workoutData}
        formik={formik}
        handleClose={handleClose}
        addWorkout={addWorkout}
        removeWorkout={removeWorkout}
        addNewRow={addNewRow}
        handleDateChange={handleDateChange}
        isExerciseDisabled={isExerciseDisabled}
        handleBodyPartChange={handleBodyPartChange}
      />
    </>
  );
};

export default UserWorkoutsPage;
