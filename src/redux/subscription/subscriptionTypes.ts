export interface SubscriptionState {
  subscriptions: subscription[];
  isLoading: boolean;
  error: string | null;
}

export interface subscription {
  _id?:string
  planType: string;
  subPeriod: string;
  price: number;
  durationInWeeks: number;
  sessionsPerWeek: number;
  totalSessions: number;
  isActive?:boolean
}
