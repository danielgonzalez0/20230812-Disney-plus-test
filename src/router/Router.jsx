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
import Disney from '../pages/brands/Disney';
import Pixar from '../pages/brands/Pixar';
import Marvel from '../pages/brands/Marvel';
import Starwars from '../pages/brands/Starwars';
import National from '../pages/brands/National';
import SearchPage from '../pages/search/SearchPage';

const Router = () => {
  const user = useSelector((state) => state.user.name);
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Connexion />} />
        <Route path="/home" element={user ? <Home /> : <Login />} />
        <Route path="/search" element={user ? <SearchPage /> : <Login />} />
        <Route path="/movies" element={user ? <AllMovies /> : <Login />} />
        <Route path="/series" element={user ? <AllSeries /> : <Login />} />
        <Route path="/brand/disney" element={user ? <Disney /> : <Login />} />
        <Route path="/brand/pixar" element={user ? <Pixar /> : <Login />} />
        <Route path="/brand/marvel" element={user ? <Marvel /> : <Login />} />
        <Route
          path="/brand/star-wars"
          element={user ? <Starwars /> : <Login />}
        />
        <Route
          path="/brand/national-geographic"
          element={user ? <National /> : <Login />}
        />
        <Route path="/serie/:id" element={user ? <Serie /> : <Login />} />
        <Route path="/movie/:id" element={user ? <Movie /> : <Login />} />
        <Route path="*" element={user ? <Home /> : <Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
