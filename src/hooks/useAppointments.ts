import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import {
  approveRejectAppointmentBooking,
  cancelAppointmentScheduleByTrainer,
  cancelAppointmentScheduleByUser,
} from "../redux/booking/bookingThunk";
import { showErrorToast, showSuccessToast } from "../utils/toast";

const useAppointments = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [anchorAppointmentSchedulesEl, setAnchorAppointmentSchedulesEl] =
    useState<null | HTMLElement>(null);
  const [selectedAppointmentScheduleId, setSelectedAppointmentScheduleId] =
    useState<string | null>(null);
  const open = Boolean(anchorAppointmentSchedulesEl);

  const handleAppointmentSchedulesMenuClick = (
    event: React.MouseEvent<HTMLElement>,
    id: string
  ) => {
    setAnchorAppointmentSchedulesEl(event.currentTarget);
    setSelectedAppointmentScheduleId(id);
  };

  const handleAppointmentSchedulesCloseMenu = () => {
    setAnchorAppointmentSchedulesEl(null);
    setSelectedAppointmentScheduleId(null);
  };

  const handleCancelAppointmentSchedule = async (_id: string) => {
    try {
      const response = await dispatch(
        cancelAppointmentScheduleByTrainer({ appointmentId: _id })
      ).unwrap();
      showSuccessToast(response.message);
    } catch (error) {
      console.error("API Error:", error);
      showErrorToast(`${error}`);
    }

    handleAppointmentSchedulesCloseMenu();
  };

  const handleAppointmentApproveOrReject = async (
    appointmentId: string,
    bookingSlotId: string,
    action: "approved" | "rejected"
  ) => {
    try {
      const response = await dispatch(
        approveRejectAppointmentBooking({
          appointmentId,
          bookingSlotId,
          action,
        })
      ).unwrap();
      console.log("Response for approve reject approval", response);
      showSuccessToast(`${response.message}`);
    } catch (error) {
      console.log(`API Error ${error}`);
      showErrorToast(`${error}`);
    }
  };

  const handleCancelAppointmentScheduleUser = async (_id: string) => {
    try {
      const response = await dispatch(
        cancelAppointmentScheduleByUser({ appointmentId: _id })
      ).unwrap();
      showSuccessToast(response.message);
    } catch (error) {
      console.error("API Error:", error);
      showErrorToast(`${error}`);
    }
    handleAppointmentSchedulesCloseMenu();
  };

  return {
    anchorAppointmentSchedulesEl,
    selectedAppointmentScheduleId,
    open,

    handleAppointmentSchedulesMenuClick,
    handleAppointmentSchedulesCloseMenu,

    handleCancelAppointmentSchedule,
    handleAppointmentApproveOrReject,

    handleCancelAppointmentScheduleUser,
  };
};

export default useAppointments;
