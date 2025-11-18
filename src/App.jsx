import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Landing from './pages/Landing';
import About from './pages/About';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import { API_BASE_URL } from './config/api';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on app load
    const sessionToken = localStorage.getItem('sessionToken');
    if (sessionToken) {
      verifySession(sessionToken);
    } else {
      setLoading(false);
    }
  }, []);

  const verifySession = async (sessionToken) => {
    try {
      const response = await fetch(`${API_BASE_URL}/verify-session?session_token=${sessionToken}`);
      if (response.ok) {
        const data = await response.json();
        setIsAuthenticated(true);
        setUser({ username: data.username });
      } else {
        localStorage.removeItem('sessionToken');
      }
    } catch (error) {
      console.error('Session verification failed:', error);
      localStorage.removeItem('sessionToken');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (sessionToken, username) => {
    localStorage.setItem('sessionToken', sessionToken);
    setIsAuthenticated(true);
    setUser({ username });
  };

  const handleLogout = async () => {
    const sessionToken = localStorage.getItem('sessionToken');
    if (sessionToken) {
      try {
        await fetch(`${API_BASE_URL}/logout`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ session_token: sessionToken })
        });
      } catch (error) {
        console.error('Logout error:', error);
      }
    }
    localStorage.removeItem('sessionToken');
    setIsAuthenticated(false);
    setUser(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar 
          isAuthenticated={isAuthenticated} 
          user={user} 
          onLogout={handleLogout} 
        />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/about" element={<About />} />
            <Route 
              path="/login" 
              element={
                isAuthenticated ? 
                <Navigate to="/dashboard" replace /> : 
                <Login onLogin={handleLogin} />
              } 
            />
            <Route 
              path="/signup" 
              element={
                isAuthenticated ?
                <Navigate to="/dashboard" replace /> :
                <Signup onLogin={handleLogin} />
              }
            />
            <Route 
              path="/dashboard" 
              element={
                isAuthenticated ? 
                <Dashboard user={user} /> : 
                <Navigate to="/login" replace />
              } 
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
