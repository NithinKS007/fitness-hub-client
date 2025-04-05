export interface DashboardState {
  isLoading: boolean;
  error: string | null;
  trainerDashboard: TrainerDashboard;
  adminDashboard: AdminDashboard;
  userDashboard: UserDashboard;
}

interface TrainerDashboard {
  totalSubscribersCount: number;
  activeSubscribersCount: number;
  canceledSubscribersCount: number;
  chartData: TrainerChartData[];
  pieChartData: TrainerPieChartData[];
}

interface AdminDashboard {
  totalUsersCount: number;
  totalTrainersCount: number;
  pendingTrainerApprovalCount: number;
  totalPlatFormFee: number;
  totalCommission: number;
  totalRevenue: number;
  chartData: AdminChartData[];
  topTrainersList: TopList[];
}

interface UserDashboard {
  totalWorkoutTime: number;
  todaysTotalPendingWorkouts: number;
  todaysTotalCompletedWorkouts: number;
  chartData: UserChartData[];
  pieChartData: any[];
}

interface UserChartData {
  _id:string
  totalWeight:number
}

interface TopList {
  _id: string;
  totalActiveSubscriptions: number;
  totalCanceledSubscriptions: number;
  totalSubscriptions: number;
  fname: string;
  lname: string;
  email: string;
}

interface AdminChartData {
  _id: string;
  platformRevenue: number;
  commission: number;
  totalRevenue: number;
}

export interface TrainerChartData {
  _id: string;
  total: number;
  active: number;
  canceled: number;
}

export interface TrainerPieChartData {
  _id: string;
  name: string;
  value: number;
}

export interface AdminDateRangeQuery {
  period: string;
}

export interface TrainerDateRangeQuery {
  period: string;
}

export interface UserDashboardQuery {
  period: string;
  bodyPart: string;
}
