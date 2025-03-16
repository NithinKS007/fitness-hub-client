import { Trainer, User } from "../auth/authTypes";

export interface AdminState {
  users: User[];
  trainers: Trainer[];
  isLoading: boolean;
  error: string | null;
  userDetails: User | {};
  trainerDetails: Trainer | {};
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

export interface RequestTrainerDetails{
  _id:string
}
