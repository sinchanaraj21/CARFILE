
import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import Home from './pages/Home';
import PredictNow from './pages/PredictNow';
import Checkups from './pages/Checkups';
import HealthTips from './pages/HealthTips';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { UserProfile } from './types';

const App: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check for active session
    const stored = localStorage.getItem('cardeon_session');
    if (stored) {
      setUser(JSON.parse(stored));
    }
    setLoading(false);
  }, []);

  const handleLogin = (name: string, email: string) => {
    const newUser = { id: Math.random().toString(36).substr(2, 9), name, email };
    setUser(newUser);
    localStorage.setItem('cardeon_session', JSON.stringify(newUser));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('cardeon_session');
    navigate('/');
  };

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6">
      <div className="w-16 h-16 border-4 border-[#c52828] border-t-transparent rounded-full animate-spin"></div>
      <p className="text-red-900 font-black tracking-widest text-xs uppercase animate-pulse">Initializing System...</p>
    </div>
  );

  return (
    <Layout user={user} onLogout={handleLogout}>
      <Routes>
        <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Landing />} />
        <Route path="/dashboard" element={user ? <Home user={user} /> : <Navigate to="/" />} />
        <Route path="/predict" element={user ? <PredictNow /> : <Navigate to="/login" />} />
        <Route path="/checkups" element={user ? <Checkups /> : <Navigate to="/login" />} />
        <Route path="/tips" element={user ? <HealthTips /> : <Navigate to="/login" />} />
        <Route path="/about" element={user ? <AboutUs /> : <Navigate to="/login" />} />
        <Route path="/contact" element={user ? <ContactUs /> : <Navigate to="/login" />} />
        <Route path="/login" element={!user ? <Login onLogin={handleLogin} /> : <Navigate to="/dashboard" />} />
        <Route path="/signup" element={!user ? <Signup onLogin={handleLogin} /> : <Navigate to="/dashboard" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Layout>
  );
};

export default App;
