import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../redux/store";
import {
  fetchSlotsCalender,
  fetchSlotsUser,
} from "../../redux/booking/bookingThunk";
import Tabs from "../../components/Tabs";
import Error from "../../components/shared/Error";
import { Box } from "@mui/material";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useSelector } from "react-redux";
import useIsUserSubscribedToTrainer from "../../hooks/useIsUserSubscribedToTrainer";
import { isSubscribedToTheTrainer } from "../../redux/subscription/subscriptionThunk";
import useSearchFilter from "../../hooks/useSearchFilter";
import ReuseTable from "../../components/table/ReuseTable";
import PaginationTable from "../../components/Pagination";
import { TableColumn } from "../../types/tableTypes";
import dayjs, { Dayjs } from "dayjs";
import DateAndTimeFilter from "../../components/table/DateFilter";
import useSlotBooking from "../../hooks/useSlotBooking";
import Calendar from "../../components/slot-booking/Calender";
import TimeSelector from "../../components/slot-booking/TimeSelector";
import Summary from "../../components/slot-booking/Summary";

const availableSlotColumns: TableColumn[] = [
  { label: "Sl No", field: "slno" },
  { label: "Available Dates", field: "date" },
  { label: "Available Times", field: "time" },
  { label: "Published On", field: "dateOfPublishing" },
];
const styles = {
  loadingContainer: {
    height: "90vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  errorContainer: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  subscribeMessage: {
    fontSize: "18px",
    color: "#f44336",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: "20px",
    padding: "16px",
  },
};

const tabItems = [{ label: "Book Slot" }];

const BookSlotPage: React.FC = () => {
  const { trainerId } = useParams();
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const dispatch = useDispatch<AppDispatch>();

  const { isLoading: bookingSlotsLoading, error: bookingSlotsError } =
    useSelector((state: RootState) => state.bookingSlot);

  const { isLoading: subLoading, error: subError } = useSelector(
    (state: RootState) => state.subscription
  );

  const {
    slots,
    isLoading: SlotLoading,
    error: SlotError,
    pagination,
  } = useSelector((state: RootState) => state.bookingSlot);
  const { totalPages, currentPage } = pagination;

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
    console.log("event", event);
  };

  console.log("slots in bookslot page in listings", slots);

  const {
    handlePageChange,
    fromDate,
    toDate,
    handleFromDateChange,
    handleToDateChange,
    handleResetDates,
    getQueryParams,
  } = useSearchFilter();

  const {
    selectedSlotId,
    selectedSlot,
    handleDateChange,
    shouldDisableDate,
    getFilteredTimeSlots,
    handleTimeChange,
    handleBooking,
  } = useSlotBooking();

  const [monthRange, setMonthRange] = useState<{
    start: Dayjs;
    end: Dayjs;
  } | null>(null);

  const selectedMonthRef = useRef<Dayjs>(dayjs().startOf("month"));

  const handleMonthChange = (newMonth: Dayjs) => {
    const startOfMonth = newMonth.startOf("month");
    const endOfMonth = newMonth.endOf("month");
    setMonthRange({ start: startOfMonth, end: endOfMonth });
    selectedMonthRef.current = newMonth;
  };

  useEffect(() => {
    if (trainerId && monthRange) {
      const { start, end } = monthRange;
      const parsedFromDate = start ? dayjs(start) : null;
      const parsedToDate = end ? dayjs(end) : null;

      dispatch(
        fetchSlotsCalender({
          trainerId,
          fromDate: parsedFromDate,
          toDate: parsedToDate,
          limit: 31,
        })
      );
    }
  }, [monthRange, trainerId, dispatch]);

  useEffect(() => {
    if (trainerId) {
      dispatch(
        fetchSlotsCalender({
          trainerId,
          fromDate: dayjs().startOf("month"),
          toDate: dayjs().endOf("month"),
          limit: 31,
        })
      );
    }
  }, [trainerId]);

  useEffect(() => {
    if (trainerId) {
      const { page, limit, fromDate, toDate } = getQueryParams();
      dispatch(isSubscribedToTheTrainer(trainerId));
      dispatch(
        fetchSlotsUser({
          trainerId: trainerId,
          params: { page, limit, fromDate, toDate },
        })
      );
    }
  }, [
    dispatch,
    trainerId,
    getQueryParams().page,
    getQueryParams().fromDate,
    getQueryParams().toDate,
  ]);

  const fetchSlots =
    slots.length > 0
      ? slots.map((slot, index) => {
          const dateObj = new Date(slot?.createdAt);
          const formattedDate = dateObj.toLocaleDateString("en-GB");
          const formattedTime = dateObj.toLocaleTimeString("en-GB");
          const slotDate = new Date(slot?.date);
          const formattedSlotDate = slotDate.toLocaleDateString("en-GB");

          return {
            ...slot,
            slno: index + 1 + (currentPage - 1) * 9,
            time: slot?.time,
            date: formattedSlotDate,
            dateOfPublishing: `${formattedDate} ${formattedTime}`,
          };
        })
      : [];

  const isSubscribed = trainerId ? useIsUserSubscribedToTrainer(trainerId) : "";

  const renderContent = () => {
    switch (selectedTab) {
      case 0:
        if (!isSubscribed) {
          return (
            <Box sx={styles.subscribeMessage}>
              You need to subscribe to this trainer to book slots.
            </Box>
          );
        }

        if (fetchSlots.length === 0) {
          return (
            <Box
              sx={{
                textAlign: "center",
                fontSize: "18px",
                marginTop: "20px",
              }}
            >
              No slots available.
            </Box>
          );
        }

        return (
          <>
            <div className="flex justify-end items-center mb-1">
              <DateAndTimeFilter
                fromDate={fromDate}
                toDate={toDate}
                onFromDateChange={handleFromDateChange}
                onToDateChange={handleToDateChange}
                onReset={handleResetDates}
              />
            </div>

            <ReuseTable columns={availableSlotColumns} data={fetchSlots} />
            <PaginationTable
              handlePageChange={handlePageChange}
              page={currentPage}
              totalPages={totalPages}
            />
            <div className="mb-2 mt-2">
              <div className="w-full max-w-full p-0 sm:p-0 m-0">
                <div className="p-4 sm:p-5 rounded-lg shadow-md w-full max-w-full box-border border-2 border-gray-300">
                  <div className="flex flex-col md:flex-row gap-3 w-full box-border">
                    <div className="flex-1 w-full">
                      <Calendar
                        selectedDate={
                          selectedSlot ? dayjs(selectedSlot.date) : null
                        }
                        displayMonth={selectedMonthRef.current}
                        handleDateChange={handleDateChange}
                        shouldDisableDate={shouldDisableDate}
                        handleMonthChange={handleMonthChange}
                      />
                    </div>
                    <div className="flex-1 w-full mt-2 md:mt-0">
                      <TimeSelector
                        selectedSlotTime={selectedSlot?.time}
                        handleTimeChange={handleTimeChange}
                        filteredSlots={getFilteredTimeSlots()}
                      />
                      <Summary
                        selectedSlot={selectedSlot}
                        handleBooking={handleBooking}
                        selectedSlotId={selectedSlotId}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  if (subLoading || bookingSlotsLoading || SlotLoading) {
    return (
      <Box sx={styles.loadingContainer}>
        <LoadingSpinner />
      </Box>
    );
  }

  if (bookingSlotsError || subError || SlotError) {
    return (
      <Box sx={styles.errorContainer}>
        <Error message={bookingSlotsError || subError!!} />
      </Box>
    );
  }

  return (
    <>
      <Tabs
        tabItems={tabItems}
        value={selectedTab}
        handleChange={handleTabChange}
      />
      <Box sx={{ marginTop: 1, width: "100%" }}> {renderContent()}</Box>
    </>
  );
};

export default BookSlotPage;
