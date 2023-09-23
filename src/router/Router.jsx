import React from 'react';
import '../App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '../pages/login/Login';
import Header from '../components/header/Header';
import Home from '../pages/home/Home';
import Connexion from '../pages/connexion/Connexion';
import { useSelector } from 'react-redux';
import Serie from '../pages/serie/Serie';
import Movie from '../pages/movie/Movie';
import AllMovies from '../pages/allMovies/AllMovies';
import AllSeries from '../pages/allSeries/AllSeries';


const Router = () => {
  const user = useSelector((state) => state.user.name);
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Connexion />} />
        <Route path="/home" element={user ? <Home /> : <Login />} />
        <Route path="/movies" element={user ? <AllMovies /> : <Login />} />
        <Route path="/series" element={user ? <AllSeries /> : <Login />} />
        <Route path="/serie/:id" element={user ? <Serie /> : <Login />} />
        <Route path="/movie/:id" element={user ? <Movie /> : <Login />} />
        <Route path="*" element={user ? <Home /> : <Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
