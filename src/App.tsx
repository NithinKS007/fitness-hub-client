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

const App = () => {
  return (
    <Routes>
      {/*commonRoutes*/}
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/auth/verifyOtp" element={<OtpPage />} />
      <Route path="/auth/forgot-password" element={<ForgotPassPage/>} />
      <Route path="/auth/reset-password/:token" element={<ResetPasswordPage/>}/>

      {/*userRoutes*/}
      <Route element={<ProtectedUser />}>
        <Route path="/user/dashboard" element={<DBPageUser />} />
      </Route>

      {/*adminRoutes*/}
      <Route element={<ProtectedAdmin />}>
        <Route path="/admin/dashboard" element={<DBPageAdmin />} />
      </Route>

      {/*trainerRoutes*/}
      <Route element={<ProtectedTrainer />}>
        <Route path="/trainer/dashboard" element={<DBPageTrainer />} />
      </Route>
    </Routes>
  );
};

export default App;
