import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axios";
import {
  ApproveRejectBooking,
  AvailableSlotsQueryParams,
  CreateBookingSlot,
  HandleBookingRequestsQueryParams,
  RequestBookSlot,
  RequestCancelAppointmentSchedule,
  RequestDeleteBookingSlot,
  RequestTrainerAvailableSlot,
  ScheduledAppointmentsQueryParams,
  VideoCallLogsQueryParams,
} from "./bookingTypes";

export const addBookingSlot = createAsyncThunk(
  "bookingSlot/addBookingSlot",
  async (bookingSlotData: CreateBookingSlot, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `trainer/add-slot/`,
        bookingSlotData
      );
      return response.data;
    } catch (error: any) {
      console.log(error);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Failed to add slot");
      }
    }
  }
);

export const fetchAvailableSlots = createAsyncThunk(
  "bookingSlot/fetchAvailableSlots",
  async (params: AvailableSlotsQueryParams, { rejectWithValue }) => {
    try {
      console.log("sending params", params);
      const response = await axiosInstance.get(`trainer/available-slots/`, {
        params,
      });
      return response.data;
    } catch (error: any) {
      console.log(error);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Failed to get available slots");
      }
    }
  }
);

export const fetchTrainerSlots = createAsyncThunk(
  "bookingSlot/fetchTrainerSlots",
  async ({ trainerId }: RequestTrainerAvailableSlot, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `user/booking-slots/${trainerId}`
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

export const fetchAvailableSlotsFromToday = createAsyncThunk(
  "bookingSlot/fetchAvailableSlotsFromToday",
  async (
    {
      trainerId,
      params,
    }: { trainerId: string; params: AvailableSlotsQueryParams },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.get(
        `user/available-slots/${trainerId}`,
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
      const response = await axiosInstance.post(`user/book-slot/${slotId}`);
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
      const response = await axiosInstance.get(`trainer/booking-requests/`, {
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
      const response = await axiosInstance.patch(
        `trainer/approve-reject-booking/`,
        { appointmentId, bookingSlotId, action }
      );
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
      const response = await axiosInstance.get(
        `trainer/appointment-schedules/`,
        { params }
      );
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
        `trainer/cancel-appointment-schedule/${appointmentId}`
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
        `user/cancel-appointment-schedule/${appointmentId}`
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
      const response = await axiosInstance.get(`user/appointment-schedules/`, {
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
        `trainer/delete-booking-slot/${bookingSlotId}`
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
      const response = await axiosInstance.delete(`user/video-call-logs/`);
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
      const response = await axiosInstance.get(`trainer/video-call-logs/`, {
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
      const response = await axiosInstance.get(`user/video-call-logs/`, {
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
