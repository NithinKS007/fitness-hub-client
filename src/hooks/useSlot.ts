import { useFormik } from "formik";
import { useModal } from "./useModal";
import {
  addBookingSlot,
  deleteAvailableBookingSlot,
  fetchAvailableSlots,
} from "../redux/booking/bookingThunk";
import { showErrorToast, showSuccessToast } from "../utils/toast";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { createSlotSchema } from "../utils/validationSchema";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import useSearchFilter from "./useSearchFilter";
import { timeOptions } from "../utils/timeOptions";

const useSlot = () => {
  const {
    handleClose: modalHandleClose,
    handleOpen: modalHandleOpen,
    open: modalOpen,
  } = useModal();

  const [anchorAvailableSlotEl, setAnchorAvailableSlotEl] =
    useState<null | HTMLElement>(null);
  const [selectedAvailableSlotId, setSelectedAvailableSlotId] = useState<
    string | null
  >(null);

  const handleAvailableSlotMenuClick = (
    event: React.MouseEvent<HTMLElement>,
    id: string
  ) => {
    setAnchorAvailableSlotEl(event.currentTarget);
    setSelectedAvailableSlotId(id);
  };

  const handleAvailableSlotCloseMenu = () => {
    setAnchorAvailableSlotEl(null);
    setSelectedAvailableSlotId(null);
  };

  const { getQueryParams } = useSearchFilter();
  const { slots } = useSelector((state: RootState) => state.bookingSlot);

  const dispatch = useDispatch<AppDispatch>();

  const [filteredTimeOptions, setFilteredTimeOptions] = useState(timeOptions);

  const slotFormik = useFormik({
    initialValues: {
      date: "",
      time: "",
    },
    validationSchema: createSlotSchema,
    onSubmit: async (values) => {
      try {
        const response = await dispatch(
          addBookingSlot({ date: values.date, time: values.time })
        ).unwrap();
        showSuccessToast(response.message);
        dispatch(fetchAvailableSlots(getQueryParams()));
        modalHandleClose();
        slotFormik.resetForm();
      } catch (error) {
        console.log(`API Error ${error}`);
        showErrorToast(`${error}`);
      }
    },
  });

  const handleDateChange = (date: string) => {
    slotFormik.setFieldValue("date", date);
  };

  useEffect(() => {
    if (!slotFormik.values.date) {
      setFilteredTimeOptions(timeOptions);
      return;
    }
    const pickedDate = new Date(slotFormik.values.date).toDateString();

    const bookedTimes = slots
      .filter((slot) => new Date(slot.date).toDateString() === pickedDate)
      .map((slot) => slot.time);

    const newAvailableTimes = timeOptions.filter(
      (time) => !bookedTimes.includes(time)
    );
    setFilteredTimeOptions(newAvailableTimes);
  }, [slotFormik.values.date, slots]);

  const deleteAvailableSlot = async (_id: string) => {
    try {
      const response = await dispatch(
        deleteAvailableBookingSlot({ bookingSlotId: _id })
      ).unwrap();
      showSuccessToast(response.message);
    } catch (error) {
      console.error("API Error:", error);
      showErrorToast(`${error}`);
    }
    handleAvailableSlotCloseMenu();
  };

  return {
    modalHandleOpen,
    modalHandleClose,
    modalOpen,
    slotFormik,
    timeOptions: filteredTimeOptions,
    handleDateChange,
    deleteAvailableSlot,
    anchorAvailableSlotEl,
    setAnchorAvailableSlotEl,
    selectedAvailableSlotId,
    setSelectedAvailableSlotId,
    handleAvailableSlotMenuClick,
    handleAvailableSlotCloseMenu,
  };
};

export default useSlot;
