export interface Chat {
  _id: string;
  senderId: string;
  receiverId: string;
  message: string;
  createdAt: Date;
}

export interface ChatState {
  isLoading: boolean;
  error: string | null;
  ChatMessages:Chat[]
}

export interface RequestChatMessages{
    senderId:string,
    receiverId:string
}
