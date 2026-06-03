import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Home from './pages/Home';
import Onboarding from './pages/Onboarding';
import MatchAnalysis from './pages/MatchAnalysis';
import StrengthLibrary from './pages/StrengthLibrary';
import MemberDashboard from './pages/MemberDashboard';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import Leaderboard from './pages/Leaderboard';
import Chat from './pages/Chat';
import Calendar from './pages/Calendar';
import './App.css';
function App() {
  return (
    <PayPalScriptProvider options={{ "client-id": "AZDgTrPy-xrfHQMqDBtbka4aZG1Ew7g91CSo8bK2P6rqW7JI46cC23CM_qNZV4Gd2Do9L9Th2GhHWKth", currency: "USD" }}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/join" element={<Onboarding />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<MemberDashboard />} />
            <Route path="/analysis" element={<MatchAnalysis />} />
            <Route path="/strength" element={<StrengthLibrary />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/calendar" element={<Calendar />} />
          </Routes>
        </div>
      </Router>
    </PayPalScriptProvider>
  );
}

export default App;
