import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem('token'));
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Navigate to="/auth" />} />
        <Route path="/auth" element={<AuthPage onAuth={() => setIsLoggedIn(true)} />} />
        <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/auth" />} />
      </Routes>
    </Router>
  );
}

export default App;
