import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../redux/store";
import {
  fetchAvailableSlotsFromToday,
  fetchTrainerSlots,
} from "../../redux/booking/bookingThunk";
import Tabs from "../../components/Tabs";
import Error from "../../components/shared/Error";
import { Box, Container, Paper } from "@mui/material";
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
import ShimmerTableLoader from "../../components/table/ShimmerTable";
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

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
    console.log("event", event);
  };

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

  useEffect(() => {
    if (trainerId) {
      const { page, limit, fromDate, toDate } = getQueryParams();
      dispatch(fetchTrainerSlots({ trainerId }));
      dispatch(isSubscribedToTheTrainer(trainerId));
      dispatch(
        fetchAvailableSlotsFromToday({
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

  const {
    slots,
    isLoading: SlotLoading,
    error: SlotError,
    pagination,
  } = useSelector((state: RootState) => state.bookingSlot);
  const { totalPages, currentPage } = pagination;

  const fetchedAddedSlots =
    slots.length > 0
      ? slots.map((slot, index) => {
          const dateObj = new Date(slot?.createdAt as string);
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

  const isSubscribed = useIsUserSubscribedToTrainer(trainerId as string);

  const renderContent = () => {
    switch (selectedTab) {
      case 0:
        if (isSubscribed) {
          if (SlotLoading) {
            return <ShimmerTableLoader columns={availableSlotColumns} />;
          }

          if (SlotError) {
            return <Box>{SlotError}</Box>;
          }

          if (fetchedAddedSlots.length === 0) {
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
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  mb: 1,
                }}
              >
                <DateAndTimeFilter
                  fromDate={fromDate as Dayjs | null}
                  toDate={toDate as Dayjs | null}
                  onFromDateChange={handleFromDateChange}
                  onToDateChange={handleToDateChange}
                  onReset={handleResetDates}
                />
              </Box>

              <ReuseTable
                columns={availableSlotColumns}
                data={fetchedAddedSlots}
              />
              <PaginationTable
                handlePageChange={handlePageChange}
                page={currentPage}
                totalPages={totalPages}
              />
              <Box sx={{ mb: 2, mt: 2 }}>
                <Container
                  sx={{
                    width: "100%",
                    maxWidth: "100%",
                    padding: { xs: 0, sm: 0 },
                    margin: 0,
                  }}
                  maxWidth={false}
                >
                  <Paper
                    sx={{
                      p: { xs: 1.5, sm: 2 },
                      borderRadius: "8px",
                      elevation: 3,
                      width: "100%",
                      maxWidth: "100%",
                      boxSizing: "border-box",
                      border: "2px solid #e0e0e0",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: { xs: "column", md: "row" },
                        gap: 3,
                        width: "100%",
                        boxSizing: "border-box",
                      }}
                    >
                      <Box
                        sx={{ flex: { xs: "100%", md: "50%" }, width: "100%" }}
                      >
                        <Calendar
                          selectedDate={
                            selectedSlot ? dayjs(selectedSlot.date) : null
                          }
                          handleDateChange={handleDateChange}
                          shouldDisableDate={shouldDisableDate}
                        />
                      </Box>
                      <Box
                        sx={{
                          flex: { xs: "100%", md: "50%" },
                          marginTop: { xs: 2, md: 2 },
                          width: "100%",
                        }}
                      >
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
                      </Box>
                    </Box>
                  </Paper>
                </Container>
              </Box>
            </>
          );
        } else {
          return (
            <Box sx={styles.subscribeMessage}>
              You need to subscribe to this trainer to book slots.
            </Box>
          );
        }
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
        value={selectedTab as number}
        handleChange={handleTabChange}
      />
      <Box sx={{ marginTop: 1, width: "100%" }}> {renderContent()}</Box>
    </>
  );
};

export default BookSlotPage;
