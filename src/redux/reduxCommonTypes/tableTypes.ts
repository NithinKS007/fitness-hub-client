import { Dayjs } from "dayjs";

export interface QueryParams {
    page: number;
    limit: number;
    search: string;
    filters: string[];
    fromDate: Dayjs | null
    toDate: Dayjs| null
  }