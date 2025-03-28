import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { getAdminDashBoardData } from "../../redux/dashboard/dashboardThunk";
import DashBoardBox from "../../components/DashBoardBox";


import { Box, CircularProgress} from "@mui/material";

const DBPageAdmin: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getAdminDashBoardData());
  }, [dispatch]);

  const {
    totalUsersCount,totalTrainersCount,pendingTrainerApprovalCount
  } = useSelector(
    (state: RootState) =>
      state.dashboard.adminDashboard ?? {
        totalUsersCount: 0,
        totalTrainersCount: 0,
        pendingTrainerApprovalCount: 0,
      }
  );

  const { isLoading, error } = useSelector(
    (state: RootState) => state.dashboard
  );

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <> {error}</>;
  }

 
  return (
    <Box sx={{ padding: 2 }}>
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <Box sx={{ flex: 1 }}>
          <DashBoardBox
            content="Total users"
            number={totalUsersCount}
          />
        </Box>
        <Box sx={{ flex: 1 }}>
          <DashBoardBox
            content="Total trainers"
            number={totalTrainersCount}
          />
        </Box>
        <Box sx={{ flex: 1 }}>
          <DashBoardBox
            content="Pending Approvals"
            number={pendingTrainerApprovalCount}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default DBPageAdmin;
