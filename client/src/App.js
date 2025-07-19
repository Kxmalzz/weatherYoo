import React from 'react';
import './App.css';
import Register from './pages/register';
import Login from './pages/login';
import Weather from './pages/weather'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/app" element={<Weather />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;