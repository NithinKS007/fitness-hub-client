export interface ContentState {
  isLoading: boolean;
  error: string | null;
  playLists: PlayList[]
  videos:Video[],
  videoData:Video | null,
  relatedVideosData:Video[],
}

export interface PlayList {
  _id: string;
  trainerId: string;
  title: string;
  privacy: boolean;
  videoCount:number
  createdAt: string;
}

export interface Video{
  _id: string
  trainerId: string
  title: string;
  description: string;
  thumbnail: string;
  video: string;
  createdAt:string
  duration:number
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

export interface RequestPlayListsByTrainerId {
  trainerId:string
}

export interface RequestVideosListByPlayListId{
  playListId:string
}

export interface RequestVideoId{
  videoId:string
}