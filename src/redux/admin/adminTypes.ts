import { User } from "../auth/authTypes";

export interface AdminState {
  users: User[];
  trainers: User[];
  isLoading: boolean;
  error: string | null;
  userDetails:User |{};
}



export interface updateBlockStatus {
  _id: string;
  isBlocked:boolean
}

export type RequestTrainerVerification = {
  _id:string
  action?:string
}
