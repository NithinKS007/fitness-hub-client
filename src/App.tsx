import AuthPage from "./pages/AuthPage";
import OtpPage from "./pages/OtpPage";
import { Route, Routes } from "react-router-dom";
import ProtectedUser from "./components/ProtectedUser";
import ProtectedAdmin from "./components/ProtectedAdmin";
import ProtectedTrainer from "./components/ProtectedTrainer";
import DBPageAdmin from "./pages/admin/DBPageAdmin";
import DBPageTrainer from "./pages/trainer/DBPageTrainer";
import DBPageUser from "./pages/user/DBPageUser";
import ForgotPassPage from "./pages/ForgotPassPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import HomePage from "./pages/HomePage";
import AdminLayouts from "./layouts/AdminLayout";
import UsersListPage from "./pages/admin/UsersListPage";
import TrainerEntrollmentPage from "./pages/trainer/TrainerEntrollmentPage";
import TrainerListPage from "./pages/admin/TrainerListPage";
import InboxPage from "./pages/admin/InboxPage";

const App = () => {
  return (
    <Routes>
      {/*commonRoutes*/}
      <Route path="/" element={<HomePage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/auth/verify-otp" element={<OtpPage />} />
      <Route path="/auth/forgot-password" element={<ForgotPassPage />} />
      <Route
        path="/auth/reset-password/:token"
        element={<ResetPasswordPage />}
      />
      <Route path="/trainer-entrollment" element={<TrainerEntrollmentPage/>}/>

      {/*userRoutes*/}
      <Route element={<ProtectedUser />}>
        <Route path="/user/dashboard" element={<DBPageUser />} />
      </Route>

      {/*adminRoutes*/}
      <Route element={<ProtectedAdmin />}>
        <Route element={<AdminLayouts />}>
          <Route path="/admin/dashboard" element={<DBPageAdmin />} />
          <Route path="/admin/users" element={<UsersListPage />} />
          <Route path="/admin/trainers" element={<TrainerListPage />} />
          <Route path="/admin/inbox" element={<InboxPage />} />
        </Route>
      </Route>

      {/*trainerRoutes*/}
      <Route element={<ProtectedTrainer />}>
        <Route path="/trainer/dashboard" element={<DBPageTrainer />} />
      </Route>
    </Routes>
  );
};

export default App;
