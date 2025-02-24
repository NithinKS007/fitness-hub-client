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
import TrainerEntrollmentPage from "./pages/trainer/TrainerEntrollmentPage";
import TrainerListPage from "./pages/admin/TrainerListPage";
import InboxPage from "./pages/admin/InboxPage";
import TrainerLayout from "./layouts/TrainerLayout";
import ClientsListPage from "./pages/trainer/ClientsListPage";
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
import UserWalletPage from "./pages/user/UserWalletPage";
import SubscriptionSettingPage from "./pages/trainer/SubscriptionSettingPage";

const App = () => {
  return (
    <Routes>
      {/*commonRoutes*/}
      <Route path="/sign-in" element={<AuthPage />} />
      <Route path="/verify-otp" element={<OtpPage />} />
      <Route path="/forgot-password" element={<ForgotPassPage />} />
      <Route path="/reset-password/:token" element={<ResetPasswordPage />} />

      <Route path="*" element={<PageNotFound />} />
      {/* Common Routes wrapped with ULwithNavFooter layout */}
      <Route element={<ULwithNavFooter />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/find-trainer" element={<GetTrainer />} />
        <Route
          path="/trainer-entrollment"
          element={<TrainerEntrollmentPage />}
        />
        <Route path="/trainer-details/" element={<ViewTrainerDetailsUS />} />
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
          <Route path="/user/wallet" element={<UserWalletPage />} />
        </Route>
      </Route>

      {/*adminRoutes*/}
      <Route element={<ProtectedAdmin />}>
        <Route element={<AdminLayouts />}>
          <Route path="/admin/dashboard" element={<DBPageAdmin />} />
          <Route path="/admin/users" element={<UsersListPage />} />
          <Route path="/admin/trainers" element={<TrainerListPage />} />
          <Route path="/admin/inbox" element={<InboxPage />} />
          <Route
            path="/admin/trainer-details/:_id"
            element={<TrainerDetailsPage />}
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
          <Route path="/trainer/clients" element={<ClientsListPage />} />
          <Route path="/trainer/chat" element={<ChatPage />} />
          <Route
            path="/trainer/session-schedules"
            element={<SessionSchedulesPage />}
          />
          <Route path="/trainer/profile" element={<TrainerProfilePage />} />
          <Route path="/trainer/subscription" element={<SubscriptionSettingPage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
