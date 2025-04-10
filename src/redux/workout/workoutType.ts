import { QueryParams } from "../reduxCommonTypes/tableTypes";
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

export type GetworkoutsQuery = QueryParams;
