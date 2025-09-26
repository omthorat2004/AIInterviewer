import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import OnboardingForm from "./pages/OnboardingPage/OnboardingPage";
import Signup from "./pages/LoginSignUPPage/SignUp";
import LoginForm from "./pages/LoginSignUPPage/LoginForm";
import AIInterviewDashboard from "./pages/DashboardPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/onboarding" element={<OnboardingForm />} />
        <Route path="/dashboard" element={<AIInterviewDashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
