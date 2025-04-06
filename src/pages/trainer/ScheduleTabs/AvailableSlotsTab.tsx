import { useEffect, useState } from "react";
import { Box, Button} from "@mui/material";
import SlotModal from "../../../components/SlotModal";
import useSlot from "../../../hooks/useSlot";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import {
  fetchAvailableSlots,
} from "../../../redux/booking/bookingThunk";
import { IconButton, Menu, MenuItem } from "@mui/material";
import ReuseTable from "../../../components/ReuseTable";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ShimmerTableLoader from "../../../components/ShimmerTable";
import DateAndTimeFilter from "../../../components/DateAndTimeFilter";
import useSearchFilter from "../../../hooks/useSearchFilterTable";
import PaginationTable from "../../../components/PaginationTable";
import { useModal } from "../../../hooks/useModal";
import ConfirmationModalDialog from "../../../components/ConfirmationModalDialog";
import { TableColumn } from "../../../types/tableTypes";
import { Dayjs } from "dayjs";

const availableSlotColumns: TableColumn[] = [
  { label: "Sl No", field: "slno" },
  { label: "Date", field: "date" },
  { label: "Time", field: "time" },
  { label: "Slot Status", field: "status" },
  { label: "Date Of Publishing", field: "dateOfPublishing" },
  { label: "Actions", field: "actions" },
];

interface AvailableSlotsTabProps {
    isActive: boolean;
}

const AvailableSlotsTab:React.FC<AvailableSlotsTabProps> = ({isActive}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { slots, isLoading, error, pagination } = useSelector(
    (state: RootState) => state.bookingSlot
  );
  const { totalPages, currentPage } = pagination;
  const [selectedSlot, setSelectedSlot] = useState<any>(null);

  const {
    modalHandleOpen,
    modalHandleClose,
    modalOpen,
    slotFormik,
    timeOptions,
    handleDateChange,
    deleteAvailableSlot,
    anchorAvailableSlotEl,
    selectedAvailableSlotId,
    handleAvailableSlotMenuClick,
    handleAvailableSlotCloseMenu,
  } = useSlot();

  const {
    open: deleteModalOpen,
    handleOpen: handleDeleteModalOpen,
    handleClose: handleDeleteModalClose,
  } = useModal();

  const {
    handlePageChange,
    fromDate,
    toDate,
    handleFromDateChange,
    handleToDateChange,
    handleResetDates,
    getQueryParams,
  } = useSearchFilter();

  useEffect(() => {
    dispatch(fetchAvailableSlots(getQueryParams()));
  }, [
    dispatch,
    isActive,
    getQueryParams().page,
    getQueryParams().fromDate,
    getQueryParams().toDate,
  ]);

  const handleDeleteSlot = (slot: any) => {
    setSelectedSlot(slot);
    handleDeleteModalOpen();
  };

  const handleConfirmDelete = () => {
    if (selectedSlot) {
      deleteAvailableSlot(selectedSlot._id);
      handleDeleteModalClose();
      handleAvailableSlotCloseMenu();
    }
  };

  const fetchedAddedSlots = slots.map((slot, index) => {
    const dateObj = new Date(slot?.createdAt as string);
    const formattedDate = dateObj.toLocaleDateString("en-GB");
    const formattedTime = dateObj.toLocaleTimeString("en-GB");
    const slotDate = new Date(slot?.date);
    const formattedSlotDate = slotDate.toLocaleDateString("en-GB");

    return {
      ...slot,
      slno: index + 1 + (currentPage - 1) * 9,
      time: slot?.time,
      status: slot.status.charAt(0).toUpperCase() + slot.status.slice(1),
      date: formattedSlotDate,
      dateOfPublishing: `${formattedDate} ${formattedTime}`,
      actions: (
        <>
          <IconButton
            onClick={(event) => handleAvailableSlotMenuClick(event, slot._id)}
            sx={{ minWidth: "0", width: "25px", height: "25px" }}
          >
            <MoreVertIcon sx={{ fontSize: "20px" }} />
          </IconButton>
          <Menu
            anchorEl={anchorAvailableSlotEl}
            open={
              Boolean(anchorAvailableSlotEl) &&
              selectedAvailableSlotId === slot._id
            }
            onClose={handleAvailableSlotCloseMenu}
            sx={{
              "& .MuiPaper-root": {
                boxShadow: "none",
                border: "1px solid",
                borderColor: "grey.400",
                borderRadius: 2,
              },
            }}
          >
            <MenuItem onClick={() => handleDeleteSlot(slot)}>Delete</MenuItem>
          </Menu>
        </>
      ),
    };
  });
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 1,
          mb:1
        }}
      >
        <Button
          variant="contained"
          onClick={modalHandleOpen}
          sx={{
            backgroundColor: "black",
            color: "white",
            textTransform: "none",
            borderRadius: 2,
          }}
        >
          Add New Slot
        </Button>
        <DateAndTimeFilter
          fromDate={fromDate as Dayjs | null}
          toDate={toDate as Dayjs | null}
          onFromDateChange={handleFromDateChange}
          onToDateChange={handleToDateChange}
          onReset={handleResetDates}
        />
      </Box>
      {isLoading ? (
        <ShimmerTableLoader columns={availableSlotColumns} />
      ) : error ? (
        <Box>{error}</Box>
      ) : (
        <>
          <ReuseTable columns={availableSlotColumns} data={fetchedAddedSlots} />
          <PaginationTable
            handlePageChange={handlePageChange}
            page={currentPage}
            totalPages={totalPages}
          />
        </>
      )}
      <SlotModal
        open={modalOpen as boolean}
        handleClose={modalHandleClose}
        formik={slotFormik}
        timeOptions={timeOptions!! as string[]}
        handleDateChange={handleDateChange}
      />
      <ConfirmationModalDialog
        open={deleteModalOpen as boolean}
        content={
          selectedSlot &&
          `Are you sure you want to delete the slot for ${new Date(selectedSlot.date).toLocaleDateString()} at ${selectedSlot.time}?`
        }
        onConfirm={handleConfirmDelete}
        onCancel={handleDeleteModalClose}
        confirmText="Yes"
        cancelText="No"
        confirmColor="error"
        cancelColor="primary"
      />
    </>
  );
};

export default AvailableSlotsTab;
