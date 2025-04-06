import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axios";
import { GetWorkoutsQuery, WorkoutPayload } from "./workoutType";

export const addUserWorkout = createAsyncThunk(
  "workouts/addUserWorkout",
  async (workouts:WorkoutPayload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("user/add-workout",workouts);
      return response.data;
    } catch (error: any) {
      console.log(error);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Failed to add workout");
      }
    }
  }
);

export const getUserWorkouts = createAsyncThunk(
    "workouts/getUserWorkouts",
    async (params:GetWorkoutsQuery, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.get("user/workouts",{params});
        return response.data;
      } catch (error: any) {
        console.log(error);
        if (error.response && error.response.data.message) {
          return rejectWithValue(error.response.data.message);
        } else {
          return rejectWithValue("Failed to get user workouts");
        }
      }
    }
  );

  export const deleteWorkoutSet = createAsyncThunk(
    "workouts/deleteWorkoutSet",
    async (setId:string, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.delete(`user/delete-workout-set/${setId}`);
        return response.data;
      } catch (error: any) {
        console.log(error);
        if (error.response && error.response.data.message) {
          return rejectWithValue(error.response.data.message);
        } else {
          return rejectWithValue("Failed to delete workout set");
        }
      }
    }
  );
  

  export const markSetAsCompleted = createAsyncThunk(
    "workouts/markSetAsCompleted",
    async (setId:string, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.patch(`user/complete-workout-set/${setId}`);
        return response.data;
      } catch (error: any) {
        console.log(error);
        if (error.response && error.response.data.message) {
          return rejectWithValue(error.response.data.message);
        } else {
          return rejectWithValue("Failed to change set status");
        }
      }
    }
  );
  
