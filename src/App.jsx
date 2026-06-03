import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import PremiumRoute from './components/PremiumRoute';

import Home from './pages/Home';
import Onboarding from './pages/Onboarding';
import MatchAnalysis from './pages/MatchAnalysis';
import StrengthLibrary from './pages/StrengthLibrary';
import TechniqueLibrary from './pages/TechniqueLibrary';
import MemberDashboard from './pages/MemberDashboard';
import Login from './pages/Login';
import Upgrade from './pages/Upgrade';
import AdminDashboard from './pages/AdminDashboard';
import Leaderboard from './pages/Leaderboard';
import Chat from './pages/Chat';
import Calendar from './pages/Calendar';

import './App.css';

function App() {
  return (
    <PayPalScriptProvider options={{ "client-id": "AZDgTrPy-xrfHQMqDBtbka4aZG1Ew7g91CSo8bK2P6rqW7JI46cC23CM_qNZV4Gd2Do9L9Th2GhHWKth", currency: "USD" }}>
      <AuthProvider>
        <Router>
          <div className="App">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/join" element={<Onboarding />} />
              <Route path="/login" element={<Login />} />

              {/* Protected Free Routes */}
              <Route path="/dashboard" element={<ProtectedRoute><MemberDashboard /></ProtectedRoute>} />
              <Route path="/leaderboard" element={<ProtectedRoute><Leaderboard /></ProtectedRoute>} />
              <Route path="/chat" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
              <Route path="/upgrade" element={<ProtectedRoute><Upgrade /></ProtectedRoute>} />
              
              {/* Admin Route */}
              <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />

              {/* Protected Premium Routes */}
              <Route path="/analysis" element={<PremiumRoute><MatchAnalysis /></PremiumRoute>} />
              <Route path="/strength" element={<PremiumRoute><StrengthLibrary /></PremiumRoute>} />
              <Route path="/technique" element={<PremiumRoute><TechniqueLibrary /></PremiumRoute>} />
              <Route path="/calendar" element={<PremiumRoute><Calendar /></PremiumRoute>} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </PayPalScriptProvider>
  );
}

export default App;
