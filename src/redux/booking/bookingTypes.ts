import { QueryParams } from "../commonTypes/tableTypes";

export interface BookingSlotState {
  isLoading: boolean;
  error: string | null;
  slots: BookingSlots[];
  slotsCalender: BookingSlots[];
  appointMentRequests: AppointmentRequests[];
  scheduledAppointmentsTrainer: ScheduledAppointmentsTrainer[];
  scheduledAppointmentsUser: ScheduledAppointmentsUser[];
  appointmentVideoCallLogsUser: AppointmentVideoCallLogsUser[];
  appointmentVideoCallLogsTrainer: AppointmentVideoCallLogsTrainer[];
  pagination: Pagination;
}

export interface AppointmentVideoCallLogsUser {
  id: string;
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
  id: string;
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

export interface BookingSlots {
  id: string;
  trainerId: string;
  time: string;
  date: Date;
  status: "pending" | "booked" | "completed";
  createdAt: Date;
}
export interface CreateBookingSlot {
  date: string;
  time: string;
}

export type FetchSlotsCalendar = Omit<QueryParams, "filters" | "search" | "page"> & {
  trainerId: string;
};

export interface RequestBookSlot {
  slotId: string;
  trainerId: string;
}

export interface AppointmentRequests {
  id: string;
  appointmentDate: string;
  appointmentTime: string;
  trainerId: string;
  status: string;
  createdAt: Date;
  userData: {
    id: string;
    fname: string;
    lname: string;
    email: string;
    phone: string;
    profilePic: string;
  };
  bookingSlotData: {
    id: string;
    createdAt: Date;
  };
}

export interface ScheduledAppointmentsTrainer {
  id: string;
  appointmentDate: string;
  appointmentTime: string;
  trainerId: string;
  status: string;
  createdAt: Date;
  userData: {
    id: string;
    fname: string;
    lname: string;
    email: string;
    phone: string;
    profilePic: string;
  };
  bookingSlotData: {
    id: string;
    createdAt: Date;
  };
}
export interface ScheduledAppointmentsUser {
  id: string;
  appointmentDate: string;
  appointmentTime: string;
  trainerId: string;
  status: string;
  createdAt: Date;
  trainerData: {
    id: string;
    fname: string;
    lname: string;
    email: string;
    phone: string;
    profilePic: string;
  };
  bookingSlotData: {
    id: string;
    createdAt: Date;
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
