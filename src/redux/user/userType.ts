import { TrainerWithSubscriptionDetails, User } from "../auth/authTypes";

export interface userState {
  trainersList: User[];
  isLoading: boolean;
  error: string | null;
  trainerDetailsWithSubscription: TrainerWithSubscriptionDetails | null
  trainerSuggestions:string[]
}
