export interface bookingSlotState {
  isLoading: boolean;
  error: string | null;
  slots: bookingSlots[];
  appointMentRequests: AppointmentRequests[];
  scheduledAppointmentsTrainer: ScheduledAppointmentsTrainer[] ;
  scheduledAppointmentsUser: ScheduledAppointmentsUser[]
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

export interface RequestDeleteBookingSlot{
  bookingSlotId:string
}