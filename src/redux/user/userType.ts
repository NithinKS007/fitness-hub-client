import { Trainer, TrainerWithSubscriptionDetails} from "../auth/authTypes";

export interface userState {
  trainersList: Trainer[];
  isLoading: boolean;
  error: string | null;
  trainerDetailsWithSubscription: TrainerWithSubscriptionDetails | null
  trainerSuggestions:string[]
  pagination: Pagination;
}

export interface ListApprovedTrainersQuery {
  search?: string;
  specialization?: string[];
  experience?: string[];
  gender?: string[];
  sort?:string
  page: number;
  limit: number;
}
interface Pagination {
  currentPage: number;
  totalPages: number;
}
