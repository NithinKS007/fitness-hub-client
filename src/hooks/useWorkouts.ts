import { useState } from "react";
import { useFormik } from "formik";
import dayjs, { Dayjs } from "dayjs";
import { workoutValidationSchema } from "../utils/validationSchema";
import { useModal } from "./useModal";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { showErrorToast, showSuccessToast } from "../utils/toast";
import {
  addWorkout,
  deleteSet,
  getWorkouts,
  markCompleted,
} from "../redux/workout/workoutThunk";
import useSearchFilter from "./useSearchFilter";

interface WorkoutItem {
  bodyPart: string;
  exercises: string[];
}

interface Workout {
  bodyPart: string;
  exercise: string;
  kg: number;
  reps: number;
  time: number;
}

interface BackendExerciseSet {
  kg: number;
  reps: number;
  time: number;
}

interface BackendExercise {
  name: string;
  sets: BackendExerciseSet[];
}

interface BackendWorkout {
  [bodyPart: string]: {
    exercises: BackendExercise[];
  };
}

interface BackendWorkoutPayload {
  date: Date;
  workouts: BackendWorkout;
}

interface Exercise {
  name: string;
  kg: number;
  reps: number;
  time: number;
}

export interface WorkoutDTO {
  name: string;
  date: Date;
  exercises: Exercise[];
}

const useWorkouts = () => {
  const { open, handleOpen, handleClose } = useModal();
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
  const dispatch = useDispatch<AppDispatch>();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedWorkoutSetId, setSelectedWorkoutSetId] = useState<
    string | null
  >(null);

  const workoutData: WorkoutItem[] = [
    { bodyPart: "Chest", exercises: ["Bench Press", "Push Ups"] },
    { bodyPart: "Back", exercises: ["Pull Ups", "Deadlift"] },
    {
      bodyPart: "Legs",
      exercises: ["Squats", "Lunges", "Leg Curls", "Leg Press"],
    },
    { bodyPart: "Arms", exercises: ["Bicep Curls", "Tricep Dips"] },
    { bodyPart: "Shoulders", exercises: ["Shoulder Press", "Lateral Raise"] },
    { bodyPart: "Core", exercises: ["Planks", "Crunches"] },
  ];

  const { getQueryParams } = useSearchFilter();
  const formik = useFormik({
    initialValues: {
      selectedBodyPart: "",
      workouts: [] as Workout[],
    },
    validationSchema: workoutValidationSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: async (values) => {
      const workoutPayload: BackendWorkoutPayload = {
        date: selectedDate
          ? dayjs(selectedDate).startOf("day").toDate()
          : dayjs().startOf("day").toDate(),
        workouts: {
          [values.selectedBodyPart]: {
            exercises: values.workouts.reduce(
              (acc: BackendExercise[], workout) => {
                const existingExercise = acc.find(
                  (ex) => ex.name === workout.exercise
                );
                const set = {
                  kg: workout.kg,
                  reps: workout.reps,
                  time: workout.time,
                };

                if (existingExercise) {
                  existingExercise.sets.push(set);
                } else {
                  acc.push({
                    name: workout.exercise,
                    sets: [set],
                  });
                }
                return acc;
              },
              []
            ),
          },
        },
      };

      try {
        const response = await dispatch(addWorkout(workoutPayload)).unwrap();
        showSuccessToast(response.message);
        handleClose();
        dispatch(getWorkouts(getQueryParams()));
        formik.resetForm();
      } catch (error) {
        console.log(`API Error ${error}`);
        showErrorToast(`${error}`);
      }
    },
  });

  const handleAddWorkout = (bodyPart: string, exercise: string) => {
    if (
      workoutData.some(
        (item) =>
          item.bodyPart === bodyPart && item.exercises.includes(exercise)
      )
    ) {
      formik.setFieldValue("workouts", [
        ...formik.values.workouts,
        { bodyPart, exercise, kg: 0, reps: 0, time: 0 },
      ]);
    }
  };

  const removeWorkout = (index: number) => {
    formik.setFieldValue(
      "workouts",
      formik.values.workouts.filter((_, i) => i !== index)
    );
  };

  const addNewRow = (index: number) => {
    const workout = formik.values.workouts[index];
    formik.setFieldValue("workouts", [
      ...formik.values.workouts.slice(0, index + 1),
      { ...workout, kg: 0, reps: 0, time: 0 },
      ...formik.values.workouts.slice(index + 1),
    ]);
  };

  const isExerciseDisabled = (bodyPart: string, exercise: string) =>
    formik.values.workouts.some(
      (w) => w.bodyPart === bodyPart && w.exercise === exercise
    );

  const handleDelete = async (setId: string) => {
    try {
      const response = await dispatch(deleteSet(setId)).unwrap();
      showSuccessToast(response.message);
       dispatch(getWorkouts(getQueryParams()));
    } catch (err) {
      showErrorToast(`${err}`);
    }
    handleMenuClose();
  };

  const handleComplete = async (setId: string) => {
    try {
      const response = await dispatch(markCompleted(setId)).unwrap();
      showSuccessToast(response.message);
    } catch (err) {
      showErrorToast(`${err}`);
    }
    handleMenuClose();
  };

  const handleMenuClick = (
    event: React.MouseEvent<HTMLElement>,
    workoutId: string
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedWorkoutSetId(workoutId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedWorkoutSetId(null);
  };

  return {
    open,
    selectedDate,
    workoutData,
    formik,
    handleOpen,
    handleClose: () => {
      handleClose();
      formik.resetForm();
    },
    addWorkout: handleAddWorkout,
    removeWorkout,
    addNewRow,
    handleDateChange: (newValue: Dayjs | null) => setSelectedDate(newValue),
    isExerciseDisabled,
    handleBodyPartChange: (e: React.ChangeEvent<{ value: unknown }>) => {
      const value = e.target.value as string;
      formik.setFieldValue("selectedBodyPart", value);
      formik.setFieldValue("workouts", []);
    },
    handleMenuClick,
    handleMenuClose,
    handleComplete,
    handleDelete,

    anchorEl,
    selectedWorkoutSetId,
  };
};

export default useWorkouts;
