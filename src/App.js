import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import SingleDog from './pages/SingalDog';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect from root path to /login */}
        <Route path="/" element={<Navigate to="/login" />} />
        
        {/* Route for login */}
        <Route path="/login" element={<Login />} />
        
        {/* Route for home page */}
        <Route path="/home" element={<Home />} />
        
        {/* Route for individual dog details */}
        <Route path="/:name" element={<SingleDog />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
