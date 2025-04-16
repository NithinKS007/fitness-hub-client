export interface Chat {
  _id: string;
  senderId: string;
  receiverId: string;
  message: string;
  isRead:boolean
  createdAt: Date;
}

export interface ChatState {
  isLoading: boolean;
  error: string | null;
  ChatMessages: Chat[];
  userChatList: UserChatList[]
  trainerChatList: TrainerChatList[]
}

export interface TrainerChatList {
  createdAt: string;
  durationInWeeks: number;
  price: number;
  sessionsPerWeek: number;
  stripePriceId: string;
  stripeSubscriptionStatus:string
  stripeSubscriptionId: string;
  subPeriod: string;
  cancelAtPeriodEnd: boolean;
  subscribedTrainerData: {
    email: string;
    fname: string;
    isBlocked: boolean;
    lname: string;
    profilePic: string | null;
  };
  totalSessions: number;
  trainerId: string;
  updatedAt: string;
  userId: string;
  _id: string;
  subscribedUserData: {
    email: string;
    fname: string;
    isBlocked: boolean;
    lname: string;
    profilePic: string | null;
  };
}
export interface UserChatList {
  createdAt: string;  
  durationInWeeks: number; 
  price: number;  
  sessionsPerWeek: number; 
  stripePriceId: string;  
  stripeSubscriptionStatus:string
  stripeSubscriptionId: string;  
  subPeriod: string; 
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

export interface RequestChatMessages {
  senderId: string;
  receiverId: string;
}
