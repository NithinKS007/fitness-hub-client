export interface Chat {
  _id: string;
  senderId: string;
  receiverId: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
}

export interface ChatState {
  isLoading: boolean;
  error: string | null;
  ChatMessages: Chat[];
  userChatList: UserChatList[];
  trainerChatList: TrainerChatList[];
}

export interface TrainerChatList {
  _id: string
  userId: string
  trainerId: string
  lastMessage: string;
  unreadCount: number;
  stripeSubscriptionStatus: string;
  subscribedUserData: {
    fname: string;
    lname: string;
    email: string;
    profilePic: string;
    isBlocked: boolean;
  };
  updatedAt:Date
  createdAt:Date
}
export interface UserChatList {
  _id: string;
  userId: string;
  trainerId: string;
  lastMessage: string;
  unreadCount: number;
  stripeSubscriptionStatus: string;
  subscribedTrainerData: {
    fname: string;
    lname: string;
    email: string;
    profilePic: string;
    isBlocked: boolean;
  };
  updatedAt:Date
  createdAt:Date
}

export interface RequestChatMessages {
  senderId: string;
  receiverId: string;
}
