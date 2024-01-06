// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import TipSplitter from './TipSplitter';
import PrivateRoute from './PrivateRoute';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(JSON.parse(localStorage.getItem('isAuthenticated') || false));

  useEffect(() => {
    
    // Verificar el estado de autenticación al cargar la aplicación
    const storedAuthStatus = JSON.parse(localStorage.getItem('isAuthenticated'));
    if (storedAuthStatus) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleAuth = (uid) => {
    localStorage.setItem('isAuthenticated', true);
    localStorage.setItem('uid', uid); // Guardar el UID en localStorage
    setIsAuthenticated(true);
  }

  const handleLogout = () => {
    // Limpiar el estado de autenticación y localStorage al cerrar sesión
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('uid'); // Limpiar el UID del localStorage

    console.log("logout");
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Home isAuthenticated={isAuthenticated} handleAuth={handleAuth} />}
        />
        <Route
          path="/tip-splitter"
          element={<PrivateRoute element={<TipSplitter handleLogout={handleLogout} />} isAuthenticated={isAuthenticated}  />}
        />
        {/* Agregar más rutas privadas según sea necesario */}
      </Routes>
    </Router>
  );
};

export default App;
