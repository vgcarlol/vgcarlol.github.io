import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prevCredentials => ({ ...prevCredentials, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
        });
        const data = await response.json();
        if (response.ok) {
            console.log('Login successful:', data);
            // Guarda el token en localStorage o en un contexto global si es necesario
            localStorage.setItem('token', data.token);
            // Redirige al usuario a la página de administración
            navigate('/admin');
        } else {
            // Maneja errores como credenciales incorrectas
            console.error('Login failed:', data.message);
            alert('Error en el inicio de sesión: ' + data.message);
        }
    } catch (error) {
        console.error('Network error:', error);
        alert('Error de red al intentar iniciar sesión.');
    }
};


  return (
    <div className="container mt-4">
      <h1>Iniciar Sesión</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Nombre de usuario</label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Contraseña</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Iniciar sesión</button>
      </form>
    </div>
  );
};

export default LoginPage;
