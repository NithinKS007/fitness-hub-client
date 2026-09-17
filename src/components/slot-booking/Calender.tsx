import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { Dayjs } from "dayjs";

interface CalendarProps {
  selectedDate: Dayjs | null;
  handleDateChange: (newDate: Dayjs) => void;
  shouldDisableDate: (date: Dayjs) => boolean;
  handleMonthChange: (newMonth: Dayjs) => void;
  displayMonth: Dayjs;
}

const Calendar: React.FC<CalendarProps> = ({
  // selectedDate,
  handleDateChange,
  shouldDisableDate,
  handleMonthChange,
  displayMonth,
}) => (
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <DateCalendar
      value={displayMonth}
      onChange={handleDateChange}
      shouldDisableDate={shouldDisableDate}
      onMonthChange={handleMonthChange}
    />
  </LocalizationProvider>
);

export default Calendar;
