import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axios";
import { ApproveRejectBooking, CreateBookingSlot, RequestBookSlot, RequestCancelAppointmentSchedule, RequestDeleteBookingSlot, RequestTrainerAvailableSlot } from "./bookingTypes";



export const addBookingSlot = createAsyncThunk(
    "bookingSlot/addBookingSlot",
    async (bookingSlotData:CreateBookingSlot, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.post(`trainer/add-slot/`,bookingSlotData);
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

export const fetchAvailableSlots = createAsyncThunk (
  "bookingSlot/fetchAvailableSlots",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`trainer/available-slots/`,);
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

export const fetchAvailableOfTrainerForUser = createAsyncThunk (
  "bookingSlot/fetchAvailableOfTrainerForUser",
  async ({trainerId}:RequestTrainerAvailableSlot, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`user/booking-slots/${trainerId}`,);
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
)

export const bookSlot = createAsyncThunk (
  "bookingSlot/bookSlot",
  async ({slotId}:RequestBookSlot, { rejectWithValue }) => {
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
)

export const fetchBookingRequests = createAsyncThunk (
  "bookingSlot/fetchBookingRequests",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`trainer/booking-requests/`);
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
)
export const approveRejectAppointmentBooking = createAsyncThunk (
  "bookingSlot/approveRejectAppointmentBooking",
  async ({appointmentId,bookingSlotId,action}:ApproveRejectBooking, { rejectWithValue }) => {

    console.log("Thunk triggered with:", { appointmentId, bookingSlotId, action });

    try {
      const response = await axiosInstance.patch(`trainer/approve-reject-booking/`,{appointmentId,bookingSlotId,action})
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
)

export const getScheduledAppointments = createAsyncThunk(
  "bookingSlot/getScheduledAppointments",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`trainer/appointment-schedules/`);
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
  async ({appointmentId}:RequestCancelAppointmentSchedule, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(`trainer/cancel-appointment-schedule/${appointmentId}`);
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
  async ({appointmentId}:RequestCancelAppointmentSchedule, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(`user/cancel-appointment-schedule/${appointmentId}`);
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
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`user/appointment-schedules/`);
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
  async ({bookingSlotId}:RequestDeleteBookingSlot, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`trainer/delete-booking-slot/${bookingSlotId}`);
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
