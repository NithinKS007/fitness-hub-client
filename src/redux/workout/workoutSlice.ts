import { createSlice } from "@reduxjs/toolkit";
import { WorkoutState } from "./workoutType";
import { addWorkout, deleteSet, getWorkouts, markCompleted } from "./workoutThunk";

const initialState: WorkoutState = {
  isLoading: false,
  error: null,
  workouts:[],
  pagination:{ totalPages: 0, currentPage: 1}
}

const workoutSlice = createSlice({
  name: "workout",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // add workout
      .addCase(addWorkout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addWorkout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.workouts.push(...action.payload.data);
      })
      .addCase(addWorkout.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to add workout";
      })

      //get user workouts
      .addCase(getWorkouts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getWorkouts.fulfilled, (state, action) => {

        console.log("user workout sets",action.payload.data)
        state.isLoading = false;
        state.workouts = action.payload.data.workoutList
        state.pagination.currentPage = action.payload.data.paginationData.currentPage
        state.pagination.totalPages = action.payload.data.paginationData.totalPages
        state.error = null;
      })
      .addCase(getWorkouts.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to get user workout";
      })

      //delete user workout set
      .addCase(deleteSet.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteSet.fulfilled, (state, action) => {
        console.log("action data for deletion workout",action.payload.data)
        state.isLoading = false;
        state.error = null;
        const deletedWorkoutId = action.payload.data._id;
        state.workouts = state.workouts.filter(
          (workout) => workout._id !== deletedWorkoutId
        );
      })
      .addCase(deleteSet.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to delete workout";
      })

      //mark workout set as complete
      .addCase(markCompleted.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(markCompleted.fulfilled, (state, action) => {
        console.log("action data for mark as completed",action.payload.data)
        state.isLoading = false;
        const workoutId = action.payload.data._id;
        console.log("workoutId",workoutId)

        const updatedWorkout = action.payload.data;
        const workoutIndex = state.workouts.findIndex(
          workout => workout._id === updatedWorkout._id
        );
        
        if (workoutIndex !== -1) {
          state.workouts[workoutIndex] = updatedWorkout;
        }
        state.error = null;
      })
      .addCase(markCompleted.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to change workout status";
      })
  }
});

export default workoutSlice.reducer;
