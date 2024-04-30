import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/LoginPage.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
      const { name, value } = e.target;
      setCredentials(prevCredentials => ({ ...prevCredentials, [name]: value }));
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      setError('');
      try {
          const response = await fetch('http://localhost:3000/api/login', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(credentials)
          });
          const data = await response.json();
          if (response.ok) {
              console.log('Login successful:', data);
              localStorage.setItem('jwtToken', data.token); // Usar 'jwtToken' consistentemente
              navigate('/admin');
          } else {
              setError('Error en el inicio de sesión: ' + data.message);
          }
      } catch (error) {
          console.error('Network error:', error);
          setError('Error de red al intentar iniciar sesión.');
      }
  };

  return (
      <div className="container mt-4">
          <h1>Iniciar Sesión</h1>
          <form onSubmit={handleSubmit}>
              <div className="mb-3">
                  <label htmlFor="username" className="form-label">Nombre de usuario</label>
                  <input type="text" className="form-control" id="username" name="username" value={credentials.username} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                  <label htmlFor="password" className="form-label">Contraseña</label>
                  <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={handleChange} required />
              </div>
              {error && <div className="alert alert-danger" role="alert">{error}</div>}
              <button type="submit" className="btn btn-primary">Iniciar sesión</button>
          </form>
      </div>
  );
};

export default LoginPage;
