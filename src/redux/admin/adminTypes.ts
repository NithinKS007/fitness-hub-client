import dayjs, { Dayjs } from "dayjs";
import { Trainer, User } from "../auth/authTypes";

export interface AdminState {
  users: User[];
  trainers: Trainer[];
  isLoading: boolean;
  error: string | null;
  userDetails: User | {};
  trainerDetails: Trainer | {};
  pagination: Pagination;
}

interface Pagination {
  currentPage: number;
  totalPages: number;
}

export interface updateBlockStatus {
  _id: string;
  isBlocked: boolean;
}

export type RequestTrainerVerification = {
  _id: string;
  action?: string;
};

export interface RequestUserDetails {
  _id: string;
}

export interface RequestTrainerDetails {
  _id: string;
}

export interface RequestUsers {
  page: number;
  limit: number;
  filter: string[];
  search: string;
}

export interface RequestTrainers {
  page: number;
  limit: number;
  filter: string[];
  search: string;
}

export interface QueryParams {
  page: number;
  limit: number;
  search: string;
  filters: string[];
  fromDate: Dayjs;
  toDate: Dayjs;
}

export type UsersListQueryParams = Omit<QueryParams, "fromDate" | "toDate">;
export type TrainersListQueryParams = Omit<QueryParams, "fromDate" | "toDate">;
export type InboxListQueryParams = Omit<QueryParams, "filters" | "">;
