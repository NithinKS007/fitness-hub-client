import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axios";
import { GetworkoutsQuery, AddnewWorkout } from "./workoutType";

export const addWorkout = createAsyncThunk(
  "workouts/addWorkout",
  async (workouts:AddnewWorkout, { rejectWithValue }) => {
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

export const getWorkouts = createAsyncThunk(
    "workouts/getWorkouts",
    async (params:GetworkoutsQuery, { rejectWithValue }) => {
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

  export const deleteSet = createAsyncThunk(
    "workouts/deleteSet",
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
  

  export const markCompleted = createAsyncThunk(
    "workouts/markCompleted",
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
  
