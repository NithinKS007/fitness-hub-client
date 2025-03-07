import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axios";

export const getApprovedTrainers = createAsyncThunk(
  "user/getApprovedTrainers",
  async ({ searchParams }: { searchParams: any }, { rejectWithValue }) => {
    try {
      console.log("params for sending data", searchParams);
      const formattedParams = { ...searchParams }

      const response = await axiosInstance.get("user/trainers", {
        params: formattedParams,
      });

      console.log("response", response.data);
      return response.data;
    } catch (error: any) {
      console.log(error);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Failed to get approved trainers list");
      }
    }
  }
);
export const getTrainerDetailsWithSubscription = createAsyncThunk(
  "user/getTrainerDetailsWithSubscription",
  async (_id: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`user/trainers/${_id}`);
      return response.data;
    } catch (error: any) {
      console.log(error);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Failed to get approved trainers list");
      }
    }
  }
);

//   export const trainerSearchSuggestions = createAsyncThunk(
// "user/trainerSearchSuggestions",
//     async (query:string, { rejectWithValue }) => {
//       console.log("quey",query)
//       try {
//         const response = await axiosInstance.get(`user/trainer-suggestions?query=${query}`,);
//         return response.data
//       } catch (error: any) {
//         console.log(error);
//         if (error.response && error.response.data.message) {
//           return rejectWithValue(error.response.data.message);
//         } else {
//           return rejectWithValue("Failed to get suggestion list");
//         }
//       }
//     }
//   );

// export const searchWithFilterTrainer = createAsyncThunk(
//   "user/searchWithFilterTrainer",
//   async ({ searchParams }: { searchParams: Record<any, any> }, { rejectWithValue }) => {
//     try {
//       console.log("Search Params:", searchParams);
//       const response = await axiosInstance.get("user/trainer-search", {
//         params: searchParams,
//       });

//       return response.data;
//     } catch (error: any) {
//       console.log(error);
//       if (error.response && error.response.data.message) {
//         return rejectWithValue(error.response.data.message);
//       } else {
//         return rejectWithValue("Failed to get search with filter of trainers");
//       }
//     }
//   }
// );
