export interface SubscriptionState {
  subscriptions: Subscription[];
  isLoading: boolean;
  error: string | null;
  userSubscribedTrainerPlans:UserSubscribedTrainerPlans[]
  subscribersOfTrainer:subscribersOfTrainer[]
  isSubscribedToTheTrainer:{ [trainerId: string]: { isSubscribed: boolean} } | null
}

export interface Subscription {
  _id?:string | null
  trainerId?:string
  subPeriod: string;
  price: number;
  durationInWeeks: number;
  sessionsPerWeek: number;
  totalSessions: number;
  isBlocked?:boolean
  stripePriceId?:string

}

export interface UserSubscribedTrainerPlans {
  createdAt: string;  
  durationInWeeks: number; 
  endDate: string;  
  isActive: string; 
  price: number;  
  sessionsPerWeek: number; 
  startDate: string; 
  stripePriceId: string;  
  stripeSubscriptionId: string;  
  subPeriod: string; 
  cancelAtPeriodEnd:boolean
  subscribedTrainerData:{
    email: string;
    fname: string;
    isBlocked: boolean;
    lname: string;
    profilePic: string | null;

  }
  totalSessions: number;  
  trainerId: string; 
  updatedAt: string; 
  userId: string;  
  _id: string; 
}

export interface subscribersOfTrainer extends UserSubscribedTrainerPlans {
  subscribedUserData:{
    email: string;
    fname: string;
    isBlocked: boolean;
    lname: string;
    profilePic: string | null;
  }
}

export interface RequestDeleteSubscription {
  _id:string
}

export interface RequestSessionIdForSubscription {
  sessionId:string
}
