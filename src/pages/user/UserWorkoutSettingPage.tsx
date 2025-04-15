import React, { useEffect, useState } from "react";
import { Button, Box, IconButton, MenuItem, Menu } from "@mui/material";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import useWorkouts from "../../hooks/useWorkouts";
import WorkOutModal from "../../components/modals/WorkOutModal";
import ReuseTable from "../../components/ReuseTable";
import ShimmerTableLoader from "../../components/ShimmerTable";
import { Filter, TableColumn } from "../../types/tableTypes";
import SearchBarTable from "../../components/SearchBarTable";
import PaginationTable from "../../components/PaginationTable";
import DateAndTimeFilter from "../../components/DateAndTimeFilter";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import useSearchFilter from "../../hooks/useSearchFilterTable";
import { getWorkouts } from "../../redux/workout/workoutThunk";
import { useDispatch } from "react-redux";
import TableFilter from "../../components/TableFilter";
import { Dayjs } from "dayjs";
import ConfirmationModalDialog from "../../components/modals/ConfirmationModalDialog";

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

const filter: Filter[] = [{ value: "Completed" }, { value: "Pending" }];

const UserWorkoutsPage: React.FC = () => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openCompleteModal, setOpenCompleteModal] = useState(false);
  const [selectedWorkoutId, setSelectedWorkoutId] = useState<string | null>(
    null
  );

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
  const dispatch = useDispatch<AppDispatch>();
  const {
    handlePageChange,
    searchTerm,
    handleSearchChange,
    selectedFilter,
    handleFilterChange,
    getQueryParams,
    fromDate,
    toDate,
    handleFromDateChange,
    handleToDateChange,
    handleResetDates,
  } = useSearchFilter();

  useEffect(() => {
    dispatch(getWorkouts(getQueryParams()));
  }, [
    dispatch,
    getQueryParams().page,
    getQueryParams().search,
    getQueryParams().filters,
    getQueryParams().fromDate,
    getQueryParams().toDate,
  ]);
  const handleConfirmDelete = () => {
    if (selectedWorkoutId) {
      handleDelete(selectedWorkoutId);
      setOpenDeleteModal(false);
      setSelectedWorkoutId(null);
    }
  };

  const handleConfirmComplete = () => {
    if (selectedWorkoutId) {
      handleComplete(selectedWorkoutId);
      setOpenCompleteModal(false);
      setSelectedWorkoutId(null);
    }
  };

  const { workouts, isLoading, pagination } = useSelector(
    (state: RootState) => state.workout
  );

  const { totalPages, currentPage } = pagination;
  const mapWorkoutData = (workouts: any[]) => {
    if (workouts.length === 0) return [];
    const groupedWorkouts = workouts.reduce((acc, workout) => {
      const formattedDate = new Date(workout.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      const key = `${formattedDate}-${workout.exerciseName}`;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(workout);
      return acc;
    }, {});

    return Object.values(groupedWorkouts).flatMap((group: any) =>
      group.map((workout: any, index: number) => ({
        date: new Date(workout.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        bodyPart: workout.bodyPart,
        exerciseName: workout.exerciseName,
        setNumber: `Set ${index + 1}`,
        setStatus: (
          <>
            {workout.isCompleted ? (
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
                <AccessTimeIcon
                  sx={{
                    color: "red",
                    fontSize: "20px",
                    marginRight: "5px",
                  }}
                />
                Pending
              </>
            )}
          </>
        ),
        kg: workout.kg,
        reps: workout.reps,
        time: workout.time,
        actions: (
          <>
            <IconButton
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={(event) =>
                handleMenuClick(event, workout._id.toString())
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
                selectedWorkoutSetId === workout._id.toString()
              }
              onClose={handleMenuClose}
            >
              <MenuItem
                onClick={() => {
                  setSelectedWorkoutId(workout._id.toString());
                  setOpenDeleteModal(true);
                }}
              >
                Delete
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setSelectedWorkoutId(workout._id.toString());
                  setOpenCompleteModal(true);
                }}
                disabled={workout.isCompleted}
              >
                Mark Complete
              </MenuItem>
            </Menu>
          </>
        ),
      }))
    );
  };

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
        <SearchBarTable
          searchTerm={searchTerm as string}
          handleSearchChange={handleSearchChange}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "end",
            gap: 2,
            alignItems: "center",
            width: "100%",
          }}
        >
          <TableFilter
            selectedFilter={selectedFilter as string[]}
            handleFilterChange={handleFilterChange}
            filter={filter}
          />
          <DateAndTimeFilter
            fromDate={fromDate as Dayjs | null}
            toDate={toDate as Dayjs | null}
            onFromDateChange={handleFromDateChange}
            onToDateChange={handleToDateChange}
            onReset={handleResetDates}
          />
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
      ) : (
        <>
          <ReuseTable columns={columns} data={mapWorkoutData(workouts)} />
          <PaginationTable
            handlePageChange={handlePageChange}
            page={currentPage}
            totalPages={totalPages}
          />
        </>
      )}
      <WorkOutModal
        open={open as boolean}
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
      <ConfirmationModalDialog
        open={openDeleteModal}
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setOpenDeleteModal(false);
          setSelectedWorkoutId(null);
        }}
        content="Are you sure you want to delete this workout?"
        confirmText="Delete"
        cancelText="Cancel"
        confirmColor="error"
        cancelColor="primary"
      />

      <ConfirmationModalDialog
        open={openCompleteModal}
        onConfirm={handleConfirmComplete}
        onCancel={() => {
          setOpenCompleteModal(false);
          setSelectedWorkoutId(null);
        }}
        content="Mark this workout as complete? NB: You cannot mark future workouts as completed."
        confirmText="Yes"
        cancelText="No"
        confirmColor="success"
        cancelColor="primary"
      />
    </>
  );
};

export default UserWorkoutsPage;
