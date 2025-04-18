import dayjs, { Dayjs } from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(duration);
dayjs.extend(relativeTime);

const getRelativeTime  = (date: Date) => {
  return dayjs(date).fromNow();
}

const formatVideoDuration = (decimalSeconds: number | undefined): string => {
  if (!decimalSeconds || isNaN(decimalSeconds) || decimalSeconds < 0) {
    return "0:00";
  }
  const dur = dayjs.duration(Math.round(decimalSeconds), "seconds");
  const minutes = Math.floor(dur.asMinutes());
  const seconds = Math.floor(dur.seconds());
  return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
};

const formatTime = (seconds: any) => {
  return dayjs.duration(seconds, "seconds").format("HH:mm:ss");
};

const formatDateToYYYYMMDD = (date: Date | Dayjs) => {
  return dayjs(date).format("YYYY-MM-DD");
};

const getFormattedTimeRange = (time: Date) => {
  return time
    ? new Date(time).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
    : "N/A";
}

const formatDateTodddMMMDYYYY = (date:Date) =>{
  return dayjs(date).format("ddd, MMM D, YYYY");
} 

const formatCurrency = (amount: number,maxLength:number) => {
  const fixed = amount.toFixed(2);
  return `USD : ${fixed.padStart(maxLength, " ")}`;
};


export {
  getRelativeTime ,
  formatVideoDuration,
  formatTime,
  getFormattedTimeRange,
  formatDateTodddMMMDYYYY,
  formatDateToYYYYMMDD,
  formatCurrency
};
