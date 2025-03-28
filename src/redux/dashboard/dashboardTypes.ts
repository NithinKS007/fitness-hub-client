export interface DashboardState {
  isLoading: boolean;
  error: string | null;
  trainerDashboard: {
    totalSubscribersCount: number;
    activeSubscribersCount: number;
    canceledSubscribersCount: number;
    chartData: {
      _id: string;
      total: number;
      active: number;
      canceled: number;
    }[];
    pieChartData: {
      _id: string;
      name: string;
      value: number;
    }[];
  } | null;

  adminDashboard: {
    totalUsersCount: number;
    totalTrainersCount: number;
    pendingTrainerApprovalCount: number;
  } | null;
  userDashboard: {} | null;
}
