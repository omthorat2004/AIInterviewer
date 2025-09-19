import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage';
import OnboardingForm from './pages/OnboardingPage/OnboardingPage'; 


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/onboarding" element={<OnboardingForm />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
