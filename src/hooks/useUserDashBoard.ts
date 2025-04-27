import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { getUserDashBoardData } from "../redux/dashboard/dashboardThunk";
import { SelectChangeEvent } from "@mui/material/Select";


const useUserDashBoard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [selectedTimePeriod, setSelectedTimePeriod] = useState<string>("This week");
  const [selectedBodyPart, setSelectedBodyPart] = useState<string>("All");
  const timePeriods = ["Today", "This week", "This month", "This year"];
  const bodyParts = ["All", "Chest", "Back", "Legs", "Arms", "Shouldrs", "Core"];

  const {
    userDashboard: {
      chartData,
      todaysTotalCompletedWorkouts,
      todaysTotalPendingWorkouts,
      totalWorkoutTime,
    },
    isLoading,
    error,
  } = useSelector((state: RootState) => state.dashboard);

  useEffect(() => {
    dispatch(
      getUserDashBoardData({
        period: selectedTimePeriod as string,
        bodyPart: selectedBodyPart as string,
      })
    );
  }, [dispatch, selectedTimePeriod, selectedBodyPart]);

  const handleTimePeriodChange = (
    event: SelectChangeEvent<string>
  ) => {
    setSelectedTimePeriod(event.target.value as string);
  };

  const handleBodyPartChange = (
    event: SelectChangeEvent<string>
  ) => {
    setSelectedBodyPart(event.target.value as string);
  }

  
  const lineChartData =
    chartData?.map((item: { _id: string; totalWeight: number }) => ({
      date: item._id,
      "Total weight": item.totalWeight,
    })) || [];

    return {
        selectedTimePeriod,
        selectedBodyPart,
        handleTimePeriodChange,
        handleBodyPartChange,
        lineChartData,
        todaysTotalCompletedWorkouts,
        todaysTotalPendingWorkouts,
        totalWorkoutTime,
        isLoading,
        error,
        timePeriods,
        bodyParts
      };
};

export default useUserDashBoard;
