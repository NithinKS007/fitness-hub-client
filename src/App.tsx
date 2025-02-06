// import TopNavBar from "./components/TopNavBar";
import AuthForm from "./components/AuthForm";
import OtpForm from "./components/OtpForm";
import { Route, Routes } from "react-router-dom";
const App = () => {
  
  return (
    <Routes>
      <Route path="/auth" element={<AuthForm />} />
      <Route path="/verifyOtp" element={<OtpForm/>}/>

      {/* <TopNavBar /> */}
    </Routes>
  );
};

export default App;
