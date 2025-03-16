import { Trainer, TrainerWithSubscriptionDetails} from "../auth/authTypes";

export interface userState {
  trainersList: Trainer[];
  isLoading: boolean;
  error: string | null;
  trainerDetailsWithSubscription: TrainerWithSubscriptionDetails | null
  trainerSuggestions:string[]
}
