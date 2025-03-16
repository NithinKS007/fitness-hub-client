export interface ContentState {
  isLoading: boolean;
  error: string | null;
  playLists: PlayList[]
  videos:Video[]
}

export interface PlayList {
  _id: string;
  trainerId: string;
  title: string;
  privacy: boolean;
  createdAt: string;
}

export interface Video{
  _id: string
  trainerId: string
  title: string;
  description: string;
  thumbnail: string;
  video: string;
  playLists: string[];
  createdAt:string
  privacy:boolean
}

export interface createPlayList {
  title: string;
}

export interface AddVideo {
  title: string;
  description: string;
  thumbnail: string;
  duration:number
  video:string,
  playLists: string[];
}
