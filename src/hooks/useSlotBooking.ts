import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useState } from "react";
import { Dayjs } from "dayjs";
import { useDispatch } from "react-redux";
import { bookSlot } from "../redux/booking/bookingThunk";
import { AppDispatch } from "../redux/store";
import { showErrorToast, showSuccessToast } from "../utils/toast";
import { formatDateToYYYYMMDD } from "../utils/conversion";

const useSlotBooking = () => {
  const availableSlots = useSelector((state: RootState) => state.bookingSlot.slots);
  const [selectedSlotId, setSelectedSlotId] = useState<string>("");

  const selectedSlot = availableSlots.find((slot) => slot._id === selectedSlotId);
  const availableDates = availableSlots.map((slot) =>formatDateToYYYYMMDD(slot.date));

  const handleDateChange = (newDate: Dayjs) => {
    if (!newDate) return;
    const formattedDate = formatDateToYYYYMMDD(newDate)
    const matchingSlot = availableSlots.find((slot) =>formatDateToYYYYMMDD(slot.date)=== formattedDate);
    if (matchingSlot) {
      setSelectedSlotId(matchingSlot._id);
    }
  };

  const shouldDisableDate = (date: Dayjs) => {
    const formattedDate = formatDateToYYYYMMDD(date)
    return !availableDates.includes(formattedDate);
  };

  const getFilteredTimeSlots = () => {
    return availableSlots.filter((slot) => formatDateToYYYYMMDD(slot.date) === 
    formatDateToYYYYMMDD(selectedSlot?.date as Date));
  };

  const handleTimeChange = (newTime: string) => {
    const matchingSlot = availableSlots.find((slot) =>
        slot.time === newTime &&
          formatDateToYYYYMMDD(slot.date) ===
          formatDateToYYYYMMDD(selectedSlot?.date as Date)
    );
    if (matchingSlot) {
      setSelectedSlotId(matchingSlot._id);
    }
  };
  const dispatch = useDispatch<AppDispatch>();
  const handleBooking = async () => {
    try {
      const response = await dispatch(
        bookSlot({ slotId: selectedSlotId as string })
      ).unwrap();
      console.log("response for booking slot", response);
      showSuccessToast(`${response.message}`);
    } catch (error) {
      console.log(`API Error ${error}`);
      showErrorToast(`${error}`);
    }
  };

  return {
    selectedSlotId,
    selectedSlot,
    availableDates,
    handleDateChange,
    shouldDisableDate,
    getFilteredTimeSlots,
    handleTimeChange,
    handleBooking,
  };
};

export default useSlotBooking;
