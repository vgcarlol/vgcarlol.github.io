// App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { logout, getToken, handleLoginSuccess, authenticatedFetch } from './auth'; // Import logout and other auth functions
import Header from './components/Common/Header';
import Footer from './components/Common/Footer';
import BlogPage from './pages/BlogPage';
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import AuthHandler from './components/AuthHandler'; 
import PostDetail from './pages/PostDetail';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
        <Router>
            <AuthHandler setIsAuthenticated={setIsAuthenticated} />
            <Header logout={logout} isAuthenticated={isAuthenticated} />
            <Routes>
                <Route path="/" element={<BlogPage />} />        
                <Route path="/posts/:id" element={<PostDetail />} />
                <Route path="/admin" element={isAuthenticated ? <AdminPage /> : <Navigate to="/login" />} />
                <Route path="/login" element={!isAuthenticated ? <LoginPage onLoginSuccess={() => setIsAuthenticated(true)} /> : <Navigate to="/admin" />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
            <Footer />
        </Router>
    );
};

export default App;
