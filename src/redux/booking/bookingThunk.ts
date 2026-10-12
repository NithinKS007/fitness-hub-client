import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axios";
import {
  ApproveRejectBooking,
  AvailableSlotsQueryParams,
  CreateBookingSlot,
  FetchSlotsCalendar,
  HandleBookingRequestsQueryParams,
  RequestBookSlot,
  RequestCancelAppointmentSchedule,
  RequestDeleteBookingSlot,
  ScheduledAppointmentsQueryParams,
  VideoCallLogsQueryParams,
} from "./bookingTypes";

export const addBookingSlot = createAsyncThunk(
  "bookingSlot/addBookingSlot",
  async (bookingSlotData: CreateBookingSlot, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `slots/`,
        bookingSlotData
      );
      return response.data;
    } catch (error: any) {
      console.log(error);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(
          "An error occurred while adding the slot. Please try again later."
        );
      }
    }
  }
);

export const fetchSlotsTrainer = createAsyncThunk(
  "bookingSlot/fetchSlotsTrainer",
  async (params: AvailableSlotsQueryParams, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`slots/`, {
        params,
      });
      return response.data;
    } catch (error: any) {
      console.log(error);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(
          "An error occurred while loading the available slots. Please try again later."
        );
      }
    }
  }
);

export const fetchSlotsCalender = createAsyncThunk(
  "bookingSlot/fetchSlotsCalender",
  async (
    { trainerId, limit, fromDate, toDate }: FetchSlotsCalendar,
    { rejectWithValue }
  ) => {
    try {
      const params = { trainerId, limit, fromDate, toDate };
      const response = await axiosInstance.get(
        `trainers/${trainerId}/slots`,
        { params }
      );
      return response.data;
    } catch (error: any) {
      console.log(error);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(
          "An error occurred while loading the available slots. Please try again later."
        );
      }
    }
  }
);

export const fetchSlotsUser = createAsyncThunk(
  "bookingSlot/fetchSlotsUser",
  async (
    {
      trainerId,
      params,
    }: { trainerId: string; params: AvailableSlotsQueryParams },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.get(
        `trainers/${trainerId}/slots`,
        { params }
      );
      return response.data;
    } catch (error: any) {
      console.log(error);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Failed to get available slots for the user");
      }
    }
  }
);

export const bookSlot = createAsyncThunk(
  "bookingSlot/bookSlot",
  async ({ slotId }: RequestBookSlot, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `slots/${slotId}`
      );
      return response.data;
    } catch (error: any) {
      console.log(error);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Failed to book slot");
      }
    }
  }
);

export const fetchBookingRequests = createAsyncThunk(
  "bookingSlot/fetchBookingRequests",
  async (params: HandleBookingRequestsQueryParams, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`appointments/`, {
        params,
      });
      return response.data;
    } catch (error: any) {
      console.log(error);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Failed to get booking requests");
      }
    }
  }
);
export const approveRejectAppointmentBooking = createAsyncThunk(
  "bookingSlot/approveRejectAppointmentBooking",
  async (
    { appointmentId, bookingSlotId, action }: ApproveRejectBooking,
    { rejectWithValue }
  ) => {
    console.log("Thunk triggered with:", {
      appointmentId,
      bookingSlotId,
      action,
    });

    try {
      const response = await axiosInstance.patch(`appointments/${appointmentId}`, {
        appointmentId,
        bookingSlotId,
        action,
      });
      return response.data;
    } catch (error: any) {
      console.log(error);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Failed to approve or reject the appointment");
      }
    }
  }
);

export const getScheduledAppointments = createAsyncThunk(
  "bookingSlot/getScheduledAppointments",
  async (params: ScheduledAppointmentsQueryParams, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`appointments/`, {
        params,
      });
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Failed to get scheduled meetings");
      }
    }
  }
);

export const cancelAppointmentScheduleByTrainer = createAsyncThunk(
  "bookingSlot/cancelAppointmentScheduleByTrainer",
  async (
    { appointmentId }: RequestCancelAppointmentSchedule,
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.patch(
        `appointments/${appointmentId}`
      );
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Failed to cancel appointment schedule");
      }
    }
  }
);

export const cancelAppointmentScheduleByUser = createAsyncThunk(
  "bookingSlot/cancelAppointmentScheduleByUser",
  async (
    { appointmentId }: RequestCancelAppointmentSchedule,
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.patch(
        `appointments/${appointmentId}`
      );
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Failed to cancel appointment schedule");
      }
    }
  }
);

export const getScheduledAppointmentsUser = createAsyncThunk(
  "bookingSlot/getScheduledAppointmentsForUser",
  async (params: ScheduledAppointmentsQueryParams, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`appointments/`, {
        params,
      });
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Failed to get scheduled meetings");
      }
    }
  }
);

export const deleteAvailableBookingSlot = createAsyncThunk(
  "bookingSlot/deleteAvailableBookingSlot",
  async ({ bookingSlotId }: RequestDeleteBookingSlot, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(
        `slots/${bookingSlotId}`
      );
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Failed to delete booking slot");
      }
    }
  }
);

export const appointmentVideoCallLogsUser = createAsyncThunk(
  "bookingSlot/appointmentVideoCallLogsUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`video-call-logs/`);
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Failed to get video call logs for user");
      }
    }
  }
);

export const getAppointmentVideoCallLogsTrainer = createAsyncThunk(
  "bookingSlot/getAppointmentVideoCallLogsTrainer",
  async (params: VideoCallLogsQueryParams, { rejectWithValue }) => {
    try {
      console.log("api triggering", params);
      const response = await axiosInstance.get(`video-call-logs/`, {
        params,
      });
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Failed to get video call logs for trainer");
      }
    }
  }
);

export const getAppointmentVideoCallLogsUser = createAsyncThunk(
  "bookingSlot/getAppointmentVideoCallLogsUser",
  async (params: VideoCallLogsQueryParams, { rejectWithValue }) => {
    try {
      console.log("api triggering for user call lgos");
      const response = await axiosInstance.get(`video-call-logs/`, {
        params,
      });
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Failed to get video call logs for user");
      }
    }
  }
);

export const createZegocloudToken = createAsyncThunk(
  "bookingSlot/createZegocloudToken",
  async (_, { rejectWithValue }) => {
    try {
      console.log("api triggering for creating tokens for video call");
      const response = await axiosInstance.get(`zegocloud/token/`);
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Failed to get token");
      }
    }
  }
);
