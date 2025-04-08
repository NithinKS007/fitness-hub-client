import { Dayjs } from "dayjs";

export interface WorkoutState {
  isLoading: boolean;
  error: string | null;
  workouts: WorkoutsData[];
  pagination: Pagination;
}

interface Pagination {
  currentPage: number;
  totalPages: number;
}

interface ExerciseSet {
  kg: number;
  reps: number;
  time: number;
}

interface Exercise {
  name: string;
  sets: ExerciseSet[];
}

interface Workout {
  [bodyPart: string]: {
    exercises: Exercise[];
  };
}

export interface AddnewWorkout {
  date: Date;
  workouts: Workout;
}

export interface WorkoutsData {
  _id: string;
  bodyPart: string;
  date: string;
  exerciseName: string;
  isCompleted: boolean;
  kg: number;
  reps: number;
  time: number;
}

export interface QueryParams {
  page: number;
  limit: number;
  search: string;
  filters: string[];
  fromDate: Dayjs;
  toDate: Dayjs;
}
export type GetworkoutsQuery = QueryParams;
