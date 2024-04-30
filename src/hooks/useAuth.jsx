// hooks/useAuth.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken, logout } from '../auth';

export function useAuth() {
    const navigate = useNavigate();
    const checkAuth = () => {
        const token = getToken();
        if (!token) {
            navigate('/login');
        } else {
            navigate('/admin');
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return { checkAuth, handleLogout };
}
