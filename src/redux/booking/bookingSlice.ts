import { createSlice } from "@reduxjs/toolkit";
import { bookingSlotState } from "./bookingTypes";
import {
  addBookingSlot,
  fetchAvailableSlots,
  fetchTrainerSlots,
  bookSlot,
  fetchBookingRequests,
  approveRejectAppointmentBooking,
  getScheduledAppointments,
  cancelAppointmentScheduleByTrainer,
  getScheduledAppointmentsUser,
  cancelAppointmentScheduleByUser,
  deleteAvailableBookingSlot,
  getAppointmentVideoCallLogsTrainer,
  getAppointmentVideoCallLogsUser,
} from "./bookingThunk";

const initialState: bookingSlotState = {
  isLoading: false,
  error: null,
  slots: [],
  appointMentRequests: [],
  scheduledAppointmentsTrainer:[],
  scheduledAppointmentsUser:[],
  appointmentVideoCallLogsUser:[],
  appointmentVideoCallLogsTrainer:[],
  pagination:{ totalPages: 0, currentPage: 1}
};

const bookingSlot = createSlice({
  name: "bookingSlot",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // create slot
      .addCase(addBookingSlot.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addBookingSlot.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.slots.push(action.payload.data);
      })
      .addCase(addBookingSlot.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to add slot";
      })

      //get added slots from trainer side
      .addCase(fetchAvailableSlots.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAvailableSlots.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.slots = action.payload.data.availableSlotsList
        state.pagination.currentPage = action.payload.data.paginationData.currentPage
        state.pagination.totalPages = action.payload.data.paginationData.totalPages
      })
      .addCase(fetchAvailableSlots.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to fetch available slots";
      })
      // fetch slots for user for booking
      .addCase(fetchTrainerSlots.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTrainerSlots.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.slots = action.payload.data;
      })
      .addCase(fetchTrainerSlots.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to fetch available slots for the user";
      })

      //user slot booking
      .addCase(bookSlot.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(bookSlot.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(bookSlot.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to book slots";
      })

      //booking requests for trainer
      .addCase(fetchBookingRequests.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchBookingRequests.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.appointMentRequests = action.payload.data.bookingRequestsList
        state.pagination.currentPage = action.payload.data.paginationData.currentPage
        state.pagination.totalPages = action.payload.data.paginationData.totalPages

      })
      .addCase(fetchBookingRequests.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to get booking requests";
      })

      // approve or reject booking by the trainer
      .addCase(approveRejectAppointmentBooking.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(approveRejectAppointmentBooking.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const appointmentId = action.payload.data._id;
        state.appointMentRequests = state.appointMentRequests.filter(
          (appointment) => appointment._id.toString() !== appointmentId.toString()
        );
      })
      .addCase(approveRejectAppointmentBooking.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to approve or reject the appointment";
      })

      //get scheduled meetings trainer for calling
      .addCase(getScheduledAppointments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getScheduledAppointments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.scheduledAppointmentsTrainer = action.payload.data.trainerBookingSchedulesList
        state.pagination.currentPage = action.payload.data.paginationData.currentPage
        state.pagination.totalPages = action.payload.data.paginationData.totalPages

      })
      .addCase(getScheduledAppointments.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to get appointment schedules";
      })

      //cancel appointment schedule
      .addCase(cancelAppointmentScheduleByTrainer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(cancelAppointmentScheduleByTrainer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.scheduledAppointmentsTrainer = state.scheduledAppointmentsTrainer?.filter((appointment)=>
            appointment._id.toString()!==action.payload.data._id.toString())
      })
      .addCase(cancelAppointmentScheduleByTrainer.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to cancel appointment schedule";
      })

      //get user side scheduled appointments
      .addCase(getScheduledAppointmentsUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getScheduledAppointmentsUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.scheduledAppointmentsUser = action.payload.data.appointmentList
        state.pagination.currentPage = action.payload.data.paginationData.currentPage
        state.pagination.totalPages = action.payload.data.paginationData.totalPages

      })
      .addCase(getScheduledAppointmentsUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to get appointment schedules ";
      })

      //cancel appointement by user
      .addCase(cancelAppointmentScheduleByUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(cancelAppointmentScheduleByUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.scheduledAppointmentsUser = state.scheduledAppointmentsUser?.filter((appointment)=>
            appointment._id.toString()!==action.payload.data._id.toString())
      })
      .addCase(cancelAppointmentScheduleByUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to cancel appointment schedule";
      })

      //delete booking slot by trainer
      .addCase(deleteAvailableBookingSlot.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAvailableBookingSlot.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.slots = state.slots?.filter((slot)=>
          slot._id.toString()!==action.payload.data._id.toString())
      })
      .addCase(deleteAvailableBookingSlot.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to delete booking slot";
      })

      //appointment call logs for trainer
      .addCase(getAppointmentVideoCallLogsTrainer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAppointmentVideoCallLogsTrainer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.appointmentVideoCallLogsTrainer = action.payload.data.trainerVideoCallLogList
        state.pagination.currentPage = action.payload.data.paginationData.currentPage
        state.pagination.totalPages = action.payload.data.paginationData.totalPages

      })
      .addCase(getAppointmentVideoCallLogsTrainer.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to get appointment call logs for trainer";
      })

      //appointment call logs for user

      .addCase(getAppointmentVideoCallLogsUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAppointmentVideoCallLogsUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.appointmentVideoCallLogsUser = action.payload.data.userVideoCallLogList
        state.pagination.currentPage = action.payload.data.paginationData.currentPage
        state.pagination.totalPages = action.payload.data.paginationData.totalPages
      })
      .addCase(getAppointmentVideoCallLogsUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to get appointment call logs for user";
      })
  },
});

export default bookingSlot.reducer;
