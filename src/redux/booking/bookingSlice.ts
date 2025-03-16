import { createSlice } from "@reduxjs/toolkit";
import { bookingSlotState } from "./bookingTypes";
import {
  addBookingSlot,
  fetchAvailableSlots,
  fetchAvailableOfTrainerForUser,
  bookSlot,
  fetchBookingRequests,
  approveRejectAppointmentBooking,
  getScheduledAppointments,
  cancelAppointmentScheduleByTrainer,
  getScheduledAppointmentsUser,
  cancelAppointmentScheduleByUser,
  deleteAvailableBookingSlot,
} from "./bookingThunk";

const initialState: bookingSlotState = {
  isLoading: false,
  error: null,
  slots: [],
  appointMentRequests: [],
  scheduledAppointmentsTrainer:[],
  scheduledAppointmentsUser:[],
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
        state.slots = action.payload.data;
      })
      .addCase(fetchAvailableSlots.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to fetch available slots";
      })
      .addCase(fetchAvailableOfTrainerForUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAvailableOfTrainerForUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.slots = action.payload.data;
      })
      .addCase(fetchAvailableOfTrainerForUser.rejected, (state, action) => {
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
        state.appointMentRequests = action.payload.data;
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

      //get scheduled meetings
      .addCase(getScheduledAppointments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getScheduledAppointments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.scheduledAppointmentsTrainer = action.payload.data
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
        state.scheduledAppointmentsUser = action.payload.data
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

  },
});

export default bookingSlot.reducer;
