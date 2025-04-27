import { QueryParams } from "../reduxCommonTypes/tableTypes";

export interface bookingSlotState {
  isLoading: boolean;
  error: string | null;
  slots: bookingSlots[];
  appointMentRequests: AppointmentRequests[];
  scheduledAppointmentsTrainer: ScheduledAppointmentsTrainer[];
  scheduledAppointmentsUser: ScheduledAppointmentsUser[];
  appointmentVideoCallLogsUser: AppointmentVideoCallLogsUser[];
  appointmentVideoCallLogsTrainer: AppointmentVideoCallLogsTrainer[];
  pagination: Pagination;
}

export interface AppointmentVideoCallLogsUser {
  _id: string;
  slotBookedDate: Date;
  appointmentData: {
    appointmentDate: Date;
    appointmentTime: string;
    status: string;
  };

  callDuration: number;
  callStartTime: Date;
  callEndTime: Date;
  callStatus: string;
  trainerData: {
    fname: string;
    lname: string;
    email: string;
    profilePic: string;
  };
}

export interface AppointmentVideoCallLogsTrainer {
  _id: string;
  slotBookedDate: Date;
  appointmentData: {
    appointmentDate: Date;
    appointmentTime: string;
    status: string;
  };
  callDuration: number;
  callStartTime: Date;
  callEndTime: Date;
  callStatus: string;
  userData: { fname: string; lname: string; email: string; profilePic: string };
}

export interface bookingSlots {
  _id: string;
  trainerId: string;
  time: string;
  date: Date;
  status: "pending" | "booked" | "completed";
  createdAt: string;
}
export interface CreateBookingSlot {
  date: string;
  time: string;
}

export interface RequestTrainerAvailableSlot {
  trainerId: string;
}

export interface RequestBookSlot {
  slotId: string;
}

export interface AppointmentRequests {
  _id: string;
  appointmentDate: string;
  appointmentTime: string;
  trainerId: string;
  status: string;
  createdAt: string;
  userData: {
    _id: string;
    fname: string;
    lname: string;
    email: string;
    phone: string;
    profilePic: string;
  };
  bookingSlotData: {
    _id: string;
    createdAt: string;
  };
}

export interface ScheduledAppointmentsTrainer {
  _id: string;
  appointmentDate: string;
  appointmentTime: string;
  trainerId: string;
  status: string;
  createdAt: string;
  userData: {
    _id: string;
    fname: string;
    lname: string;
    email: string;
    phone: string;
    profilePic: string;
  };
  bookingSlotData: {
    _id: string;
    createdAt: string;
  };
}
export interface ScheduledAppointmentsUser {
  _id: string;
  appointmentDate: string;
  appointmentTime: string;
  trainerId: string;
  status: string;
  createdAt: string;
  trainerData: {
    _id: string;
    fname: string;
    lname: string;
    email: string;
    phone: string;
    profilePic: string;
  };
  bookingSlotData: {
    _id: string;
    createdAt: string;
  };
}

export interface ApproveRejectBooking {
  appointmentId: string;
  bookingSlotId: string;
  action: "approved" | "rejected";
}

export interface RequestCancelAppointmentSchedule {
  appointmentId: string;
}

export interface RequestDeleteBookingSlot {
  bookingSlotId: string;
}

export interface Pagination {
  currentPage: number;
  totalPages: number;
}

export type AvailableSlotsQueryParams = Omit<QueryParams, "filters" | "search">;
export type HandleBookingRequestsQueryParams = QueryParams;
export type ScheduledAppointmentsQueryParams = QueryParams;
export type VideoCallLogsQueryParams = QueryParams;
