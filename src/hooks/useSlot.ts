import { useFormik } from "formik";
import { useModal } from "./useModal";
import { addBookingSlot, deleteAvailableBookingSlot } from "../redux/booking/bookingThunk";
import { showErrorToast, showSuccessToast } from "../utils/toast";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { createSlotSchema } from "../utils/validationSchema";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const useSlot = () => {
  const {
    handleClose: modalHandleClose,
    handleOpen: modalHandleOpen,
    open: modalOpen,
  } = useModal()

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
    
    

  const {slots} = useSelector((state:RootState)=>state.bookingSlot)

  const dispatch = useDispatch<AppDispatch>();

  const timeOptions = [
    "12:00 AM", "12:30 AM",
    "01:00 AM", "01:30 AM",
    "02:00 AM", "02:30 AM",
    "03:00 AM", "03:30 AM",
    "04:00 AM", "04:30 AM",
    "05:00 AM", "05:30 AM",
    "06:00 AM", "06:30 AM",
    "07:00 AM", "07:30 AM",
    "08:00 AM", "08:30 AM",
    "09:00 AM", "09:30 AM",
    "10:00 AM", "10:30 AM",
    "11:00 AM", "11:30 AM",
    "12:00 PM", "12:30 PM",
    "01:00 PM", "01:30 PM",
    "02:00 PM", "02:30 PM",
    "03:00 PM", "03:30 PM",
    "04:00 PM", "04:30 PM",
    "05:00 PM", "05:30 PM",
    "06:00 PM", "06:30 PM",
    "07:00 PM", "07:30 PM",
    "08:00 PM", "08:30 PM",
    "09:00 PM", "09:30 PM",
    "10:00 PM", "10:30 PM",
    "11:00 PM", "11:30 PM"
  ]

  const [filteredTimeOptions, setFilteredTimeOptions] = useState(timeOptions);


  const slotFormik = useFormik({
    initialValues: {
      date: "",
      time: "",
    },
    validationSchema: createSlotSchema,
    onSubmit: async (values) => {
      try {
        const response = await dispatch(addBookingSlot({date: values.date,time: values.time})).unwrap();
        showSuccessToast(response.message);
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

  useEffect(()=>{
    if (!slotFormik.values.date) {
      setFilteredTimeOptions(timeOptions);
      return;
    }
    const pickedDate = new Date(slotFormik.values.date).toDateString();

    const bookedTimes = slots
    .filter((slot) => new Date(slot.date).toDateString() === pickedDate)
    .map((slot) => slot.time);

    const newAvailableTimes = timeOptions.filter((time) => !bookedTimes.includes(time));
    setFilteredTimeOptions(newAvailableTimes);

  },[slotFormik.values.date, slots])

  
    const deleteAvailableSlot = async(_id: string) => {
      try {
        const response = await dispatch(deleteAvailableBookingSlot({bookingSlotId:_id})).unwrap()
         showSuccessToast(response.message)
      } catch (error) {
        console.error("API Error:", error);
        showErrorToast(`${error}`);
      }
      handleAvailableSlotCloseMenu()
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
    handleAvailableSlotCloseMenu

  };
};

export default useSlot;