import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Login from './pages/Login';
import TopicDetail from './pages/TopicDetail';
import ProtectedRoute from './utils/ProtectedRoute';
import Header from './components/Header';
import { AuthProvider, useAuth } from './context/AuthContext';
import './styles/styles.css';

function App() {
  const { user } = useAuth();

  return (
    <Router>
      <Header user={user} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/topic/:topicId" element={<TopicDetail />} />
      </Routes>
    </Router>
  );
}

const MainApp = () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);

export default MainApp;
