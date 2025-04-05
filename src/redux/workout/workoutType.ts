export interface WorkoutState {
  isLoading: boolean;
  error: string | null;
  workouts:WorkoutArray []
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

export interface WorkoutPayload {
  date: Date;
  workouts: Workout;
}


interface ISet {
    _id: string;
    isCompleted:boolean
    kg: number;
    reps: number;
    time: number;
  }
  
  interface IExercise {
    _id: string;
    name: string;
    sets: ISet[];
  }
  
  interface IWorkoutItem {
    _id: string;
    bodyPart: string;
    exercises: IExercise[];
  }
  
  export interface WorkoutArray {
    _id: string;
    userId: string;
    date: Date;
    workouts: IWorkoutItem[];
    createdAt: Date;
    updatedAt: Date;
    __v: number;
  }
  


