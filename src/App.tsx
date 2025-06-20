import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

//AUTHENTICATION
import AuthPage from "./pages/auth/AuthPage";
import OtpPage from "./pages/auth/OtpPage";
import ForgotPassPage from "./pages/auth/ForgotPassPage";
const ResetPasswordPage = lazy(() => import("./pages/auth/ResetPasswordPage"));

//USER SIDE VIEW TRAINER SUBSCRIPTION
import ShowPlansPage from "./pages/view-sub/ShowPlansPage";
import ViewTrainerDetailsUS from "./pages/view-TR/ViewTrainerDetailsUS";
import SubSuccessPage from "./pages/view-sub/SubSuccessPage";
import SubFailurePage from "./pages/view-sub/SubFailurePage";

//PROTECTED
import ProtectedUser from "./components/protected/ProtectedUser";
import ProtectedAdmin from "./components/protected/ProtectedAdmin";
import ProtectedTrainer from "./components/protected/ProtectedTrainer";

//LAYOUTS
import AdminLayouts from "./layouts/AdminLayout";
import TrainerLayout from "./layouts/TrainerLayout";
import ULProfile from "./layouts/ULProfile";
import ULwithNavFooter from "./layouts/ULwithNavFooter";

//USER
const UserSubscriptionsPage = lazy(() => import("./pages/user/UserSubscriptionPage"));
const UserBookingsPage = lazy(() => import("./pages/user/UserBookingsPage"));
const UserChatsPage = lazy(() => import("./pages/user/UserChatsPage"));
const VideoPlayerPage = lazy(() => import("./pages/user/VideoPlayerPage"));
const BookSlotPage = lazy(() => import("./pages/user/BookSlotPage"));
const UserProfilePage = lazy(() => import("./pages/user/UserProfilePage"));
const DBPageUser = lazy(() => import("./pages/user/DBPageUser"));
const VideosPage = lazy(() => import("./pages/user/VideosPage"));
const UserWorkoutsPage = lazy(() => import("./pages/user/UserWorkoutSettingPage"));

//TRAINER
const SubscriptionSettingPage = lazy(() => import("./pages/trainer/SubscriptionSettingPage"));
const AddContentsPage = lazy(() => import("./pages/trainer/AddContentsPage"));
const DBPageTrainer = lazy(() => import("./pages/trainer/DBPageTrainer"));
const SubscribersListPage = lazy(() => import("./pages/trainer/SubscribersList"));
const ChatPage = lazy(() => import("./pages/trainer/ChatPage"));
const SessionSchedulesPage = lazy(() => import("./pages/trainer/SessionSchedulesPage"));
const TrainerProfilePage = lazy(() => import("./pages/trainer/ProfilePage"));

//ADMIN
const DBPageAdmin = lazy(() => import("./pages/admin/DBPageAdmin"));
const CommissionHistory = lazy(() => import("./pages/admin/CommissionHistory"));
const TrainerSubscriptionDetailsPage = lazy(() => import("./pages/admin/TrainerSubscriptionDetailsPage"));
const UsersListPage = lazy(() => import("./pages/admin/UsersListPage"));
const TrainerListPage = lazy(() => import("./pages/admin/TrainerListPage"));
const InboxPage = lazy(() => import("./pages/admin/InboxPage"));
const TrainerDetailsPage = lazy(() => import("./pages/admin/TrainerDetailsPage"));
const UserDetailsPage = lazy(() => import("./pages/admin/UserDetailsPage"));

//OTHERS
import HomePage from "./pages/HomePage";
import GetTrainer from "./pages/view-TR/GetTrainer";
import LoadingSpinner from "./components/LoadingSpinner";
const PageNotFound = lazy(() => import("./pages/PageNotFound"));


const App = () => {
  return (
    <Suspense fallback={<LoadingSpinner size={60} thickness={4}/>}>
      <Routes>
        {/*commonRoutes*/}
        <Route path="/sign-in" element={<AuthPage />} />
        <Route path="/verify-otp" element={<OtpPage />} />
        <Route path="/forgot-password" element={<ForgotPassPage />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />

        <Route path="*" element={<PageNotFound />} />

        <Route element={<ProtectedUser />}>
          <Route path="/subscription-success" element={<SubSuccessPage />} />
          <Route path="/subscription-failed" element={<SubFailurePage />} />
        </Route>

        <Route element={<ULwithNavFooter />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/find-trainer" element={<GetTrainer />} />

          <Route
            path="/trainer-details/:trainerId"
            element={<ViewTrainerDetailsUS />}
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
            <Route path="/user/workouts" element={<UserWorkoutsPage />} />
            <Route
              path="/user/trainer-videos/:trainerId/"
              element={<VideosPage />}
            />
            <Route
              path="/user/trainer/video/:videoId"
              element={<VideoPlayerPage />}
            />
            <Route
              path="/user/trainer-booking-slot/:trainerId"
              element={<BookSlotPage />}
            />
          </Route>
        </Route>

        {/*userRoute-show-trainer-plans*/}
        <Route element={<ProtectedUser />}>
          <Route
            path="/trainer-show-plans/:trainerId"
            element={<ShowPlansPage />}
          />
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
            <Route
              path="trainer/subscribers"
              element={<SubscribersListPage />}
            />
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
    </Suspense>
  );
};

export default App;
