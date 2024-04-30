import React from 'react';
import Dashboard from '../components/Admin/Dashboard';
import '../assets/admin-area.css';


const AdminPage = () => {
  return (
      <div className="admin-container">
          <h1 className="admin-header">Área de Administración</h1>
          <Dashboard />
      </div>
  );
};

export default AdminPage;
