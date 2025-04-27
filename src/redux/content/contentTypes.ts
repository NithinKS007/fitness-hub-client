import { QueryParams } from "../reduxCommonTypes/tableTypes";

export interface ContentState {
  isLoading: boolean;
  error: string | null;
  playLists: PlayList[];
  videos: Video[];
  videoData: Video | null;
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
  videoCount: number;
  createdAt: string;
}

export interface Video {
  _id: string;
  trainerId: string;
  title: string;
  description: string;
  thumbnail: string;
  video: string;
  createdAt: string;
  duration: number;
  privacy: boolean;
  playLists: PlayList[];
}

export interface createPlayList {
  title: string;
}

export interface AddVideo {
  title: string;
  description: string;
  thumbnail: string;
  duration: number;
  video: string;
  playLists: string[];
}

export interface RequestPlayListsByTrainerId {
  trainerId: string;
}

export interface UpdateVideoBlockStatus {
  videoId: string;
  privacy: boolean;
}

export interface UpdatePlayListBlockStatus {
  playListId: string;
  privacy: boolean;
}

export interface RequestVideoId {
  videoId: string;
}

export type VideosQueryParams = QueryParams;
export type PlayListQueryParams = QueryParams;
export type VideosQueryParamsUser = VideosQueryParams & {
  trainerId: string;
};
