// components/AuthHandler.js
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getToken } from '../auth';

const AuthHandler = ({ setIsAuthenticated }) => {
    const navigate = useNavigate();
    const location = useLocation(); // Para obtener la ruta actual

    useEffect(() => {
        const token = getToken();
        const isAuthenticated = !!token;
        setIsAuthenticated(isAuthenticated);

        if (!isAuthenticated) {
            // Solo redirigir al login si no estamos ya en una ruta que no requiere autenticación
            if (location.pathname !== '/' && location.pathname !== '/login' && !location.pathname.startsWith('/posts/')) {
                navigate('/login');
            }
        }
    }, [navigate, setIsAuthenticated, location.pathname]); // Dependencia de location.pathname

    return null;
};

export default AuthHandler;
