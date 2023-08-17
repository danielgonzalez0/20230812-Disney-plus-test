import React from 'react';
import '../App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '../pages/login/Login';
import Header from '../components/header/Header';
import Home from '../pages/home/Home';

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
