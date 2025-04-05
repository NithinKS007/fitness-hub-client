import { Trainer, TrainerWithSubscriptionDetails} from "../auth/authTypes";

export interface userState {
  trainersList: Trainer[];
  isLoading: boolean;
  error: string | null;
  trainerDetailsWithSubscription: TrainerWithSubscriptionDetails | null
  trainerSuggestions:string[]
  pagination: Pagination;
}

export interface RequestApprovedTrainerListParams {
  Search?: string;
  Specialization?: string[];
  Experience?: string[];
  Gender?: string[];
  Sort?:string
}
interface Pagination {
  currentPage: number;
  totalPages: number;
}
