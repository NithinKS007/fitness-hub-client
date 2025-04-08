import { Dayjs } from "dayjs";

export interface ContentState {
  isLoading: boolean;
  error: string | null;
  playLists: PlayList[]
  videos:Video[],
  videoData:Video | null,
  relatedVideosData:Video[],
  pagination: Pagination;
}
export interface Pagination {
  currentPage: number;
  totalPages: number;
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
  playLists:string[]
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

export interface UpdateVideoBlockStatus{
  videoId:string
  privacy:boolean
}

export interface UpdatePlayListBlockStatus{
  playListId:string
  privacy:boolean
}

export interface RequestVideoId{
  videoId:string
}


export interface QueryParams {
  page: number;
  limit: number;
  search: string;
  filters: string[];
  fromDate: Dayjs;
  toDate: Dayjs;
}

export type VideosQueryParams = QueryParams
export type PlayListQueryParams = QueryParams