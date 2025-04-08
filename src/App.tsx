import AuthPage from "./pages/AuthPage";
import OtpPage from "./pages/OtpPage";
import { Route, Routes } from "react-router-dom";
import ProtectedUser from "./components/ProtectedUser";
import ProtectedAdmin from "./components/ProtectedAdmin";
import ProtectedTrainer from "./components/ProtectedTrainer";
import DBPageAdmin from "./pages/admin/DBPageAdmin";
import DBPageTrainer from "./pages/trainer/DBPageTrainer";
import ForgotPassPage from "./pages/ForgotPassPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import HomePage from "./pages/HomePage";
import AdminLayouts from "./layouts/AdminLayout";
import UsersListPage from "./pages/admin/UsersListPage";
import TrainerListPage from "./pages/admin/TrainerListPage";
import InboxPage from "./pages/admin/InboxPage";
import TrainerLayout from "./layouts/TrainerLayout";
import SubscribersListPage from "./pages/trainer/SubscribersList";
import ChatPage from "./pages/trainer/ChatPage";
import SessionSchedulesPage from "./pages/trainer/SessionSchedulesPage";
import TrainerProfilePage from "./pages/trainer/ProfilePage";
import TrainerDetailsPage from "./pages/admin/TrainerDetailsPage";
import UserDetailsPage from "./pages/admin/UserDetailsPage";
import PageNotFound from "./pages/PageNotFound";
import ULProfile from "./layouts/ULProfile";
import UserProfilePage from "./pages/user/UserProfilePage";
import DBPageUser from "./pages/user/DBPageUser";
import GetTrainer from "./pages/GetTrainer";
import ULwithNavFooter from "./layouts/ULwithNavFooter";
import ViewTrainerDetailsUS from "./pages/ViewTrainerDetailsUS";
import UserSubscriptionsPage from "./pages/user/UserSubscriptionPage";
import UserBookingsPage from "./pages/user/UserBookingsPage";
import UserChatsPage from "./pages/user/UserChatsPage";
import SubscriptionSettingPage from "./pages/trainer/SubscriptionSettingPage";
import AddContentsPage from "./pages/trainer/AddContentsPage";
import TrainerSubscriptionDetailsPage from "./pages/admin/TrainerSubscriptionDetailsPage";
import OnFailurePage from "./pages/OnFailurePage";
import OnSuccessPage from "./pages/OnSuccessPage";
import TrainerVideosGrid from "./pages/TrainerVideosGrid";
import VideoPlayer from "./pages/VideoPlayer";
import UserWorkoutsPage from "./pages/user/UserWorkoutSettingPage";
import CommissionHistory from "./pages/admin/CommissionHistory";

const App = () => {
  return (
    <Routes>
      {/*commonRoutes*/}
      <Route path="/sign-in" element={<AuthPage />} />
      <Route path="/verify-otp" element={<OtpPage />} />
      <Route path="/forgot-password" element={<ForgotPassPage />} />
      <Route path="/reset-password/:token" element={<ResetPasswordPage />} />

      <Route path="*" element={<PageNotFound />} />

      <Route element={<ULwithNavFooter />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/find-trainer" element={<GetTrainer />} />

        <Route element={<ProtectedUser />}>
          <Route path="/subscription-success" element={<OnSuccessPage />} />
          <Route path="/subscription-failed" element={<OnFailurePage />} />
        </Route>
        <Route
          path="/trainer-details/:_id"
          element={<ViewTrainerDetailsUS />}
        />
        <Route
          path="/workout-video/:playListId/:trainerId/:videoId"
          element={<VideoPlayer />}
        />
        <Route
          path="/video/:playListId/:trainerId/"
          element={<TrainerVideosGrid />}
        />
      </Route>
      {/*userRoutes*/}
      <Route element={<ProtectedUser />}>
        <Route element={<ULProfile />}>
          <Route path="/user/dashboard" element={<DBPageUser />} />
          <Route
            path="/user/subscriptions"
            element={<UserSubscriptionsPage />}
          />
          <Route path="/user/profile" element={<UserProfilePage />} />
          <Route path="/user/bookings" element={<UserBookingsPage />} />
          <Route path="/user/chats" element={<UserChatsPage />} />
          <Route path="/user/workouts" element={<UserWorkoutsPage/>} />
        </Route>
      </Route>

      {/*adminRoutes*/}
      <Route element={<ProtectedAdmin />}>
        <Route element={<AdminLayouts />}>
          <Route path="/admin/dashboard" element={<DBPageAdmin />} />
          <Route path="/admin/users" element={<UsersListPage />} />
          <Route path="/admin/trainers" element={<TrainerListPage />} />
          <Route path="/admin/inbox" element={<InboxPage />} />
          <Route path="/admin/commission" element={<CommissionHistory />} />
          <Route
            path="/admin/trainer-details/:_id"
            element={<TrainerDetailsPage />}
          />
          <Route
            path="/admin/trainer-subscriptions/:_id"
            element={<TrainerSubscriptionDetailsPage />}
          />
          <Route
            path="/admin/user-details/:_id"
            element={<UserDetailsPage />}
          />
        </Route>
      </Route>

      {/*trainerRoutes*/}
      <Route element={<ProtectedTrainer />}>
        <Route element={<TrainerLayout />}>
          <Route path="/trainer/dashboard" element={<DBPageTrainer />} />
          <Route path="trainer/subscribers" element={<SubscribersListPage />} />
          <Route path="/trainer/chat" element={<ChatPage />} />
          <Route
            path="/trainer/appointments"
            element={<SessionSchedulesPage />}
          />
          <Route path="/trainer/add-contents" element={<AddContentsPage />} />
          <Route path="/trainer/profile" element={<TrainerProfilePage />} />
          <Route
            path="/trainer/subscriptions"
            element={<SubscriptionSettingPage />}
          />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
