import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { Dayjs } from "dayjs";

interface CalendarProps {
  selectedDate: Dayjs | null;
  handleDateChange: (newDate: Dayjs) => void;
  shouldDisableDate: (date: Dayjs) => boolean;
}

const Calendar: React.FC<CalendarProps> = ({
  selectedDate,
  handleDateChange,
  shouldDisableDate,
}) => (
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <DateCalendar
      value={selectedDate}
      onChange={handleDateChange}
      shouldDisableDate={shouldDisableDate}
    />
  </LocalizationProvider>
);

export default Calendar;
