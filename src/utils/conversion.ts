import dayjs from "dayjs";

const formatRelativeTime = (date: Date) => {
  return dayjs(date).fromNow();
};
const formatDuration = (decimalMinutes: number | undefined): string => {
  if (!decimalMinutes) return "0:00";
  const minutes = Math.floor(decimalMinutes);
  const seconds = Math.round((decimalMinutes % 1) * 60);
  return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
};

import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

const formatTime = (seconds:any) => {
  return dayjs.duration(seconds, 'seconds').format('HH:mm:ss');
}

export { formatRelativeTime ,formatDuration, formatTime};
