import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
//pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import List from './pages/List';
//components
import Navbarr from './components/Navbarr';


const App = () => {
  return (
    <div>
      <Navbarr />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/book/list" element={<List />} />
      </Routes>
    </div>
  )
}

export default App
