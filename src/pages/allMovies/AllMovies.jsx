import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import Footer from '../../components/footer/Footer';
import FilterBtn from '../../components/filterBtn/FilterBtn';
import { colors, movieGenres } from '../../utils/variables';
import { useQuery } from '@tanstack/react-query';
import { getAllMovies } from '../../services/api';
import MovieSlide from '../../components/movieSection/MovieSlide';
import { NavLink } from 'react-router-dom';
import AllMoviesSlide from './AllMoviesSlide';

const Container = styled.main`
  min-height: calc(100vh);
  overflow: hidden;
  padding: 0 calc(3.5vw + 24px);
  position: relative;
  top: 0;
  margin-top: 70px;
`;

const Header = styled.header`
  background-color: rgb(26, 29, 41);
  left: 0px;
  padding: 30px calc(3.5vw + 24px) 24px;
  position: fixed;
  z-index: 5;
  width: 100%;
  display: flex;
  align-items: flex-end;
  flex-wrap: wrap;
  gap: 30px;
  h1 {
    font-size: 44px;
  }
`;

const MoviesContainer = styled.section`
  position: relative;
  margin-top: 120px;
  margin-bottom: 200px;
  z-index: 0;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  align-items: center;
  transition: all 300ms ease-out 0s;

  @media screen and (max-width: 390px) {
    margin-top: 250px;
  }
`;

const AllMovies = () => {
  const queryKey = ['getMovies'];
  const { isLoading, data } = useQuery(queryKey, async () => {
    return await getAllMovies(50);
    // return await getData();
  });

  const movies = data || [];
  const [moviesVisibleEnd, setMovieVisible] = useState(50);
  const [movieArray, setMovieArray] = useState([]);
  const [filterValue, setFilterValue] = useState({
    id: 0,
    name: 'Tous les films',
  });

  const handleScroll = () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY;

    if (windowHeight + scrollTop >= documentHeight) {
      // Lorsque l'utilisateur atteint le bas de la page, chargez plus de films
      const newVisibleEnd = moviesVisibleEnd + 20; // Chargez 10 films supplémentaires
      setMovieVisible(newVisibleEnd);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [moviesVisibleEnd]);

  useEffect(() => {
    setMovieArray([ 
      ...movies.slice(0, moviesVisibleEnd),
    ])
  }, [movies, moviesVisibleEnd, filterValue]);

  return (
    <>
      <Container>
        <Header>
          <h1>Films</h1>
          <FilterBtn
            array={movieGenres}
            filterValue={filterValue}
            setFilterValue={setFilterValue}
          />
        </Header>
        <MoviesContainer>
          {isLoading && <div>en cours de chargement</div>}
          {!isLoading &&
            movieArray.length > 0 &&
            movieArray
        .filter((movie)=>{
        if(filterValue.id === 0){
            return movie
        } else {
            return movie.genre_ids.includes(filterValue.id)
        }
        
    })
              .map((movie, index) => (
                //   <div key={index}>{movie.title}</div>
                <AllMoviesSlide movie={movie} key={index} />
              ))}
        </MoviesContainer>
      </Container>
      <Footer />
    </>
  );
};

export default AllMovies;