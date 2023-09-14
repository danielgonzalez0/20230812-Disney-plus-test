import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { colors } from '../../utils/variables';
import { useQuery } from '@tanstack/react-query';
import { getDetail } from '../../services/api';
import { Images } from '../../models/images';

const Container = styled.div`
  cursor: pointer;
  /* position: relative; */
  transition: transform 300ms ease-out 0s;
  background-color: rgb(26, 29, 41);
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.69) 0px 26px 30px -10px,
    rgba(0, 0, 0, 0.73) 0px 16px 10px -10px;

  .link {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
    z-index: 100;
    &:after {
      position: absolute;
      content: '';
      top: 0;
      right: 0;
      height: 98%;
      width: 100%;
      border-radius: 4px;
    }
    &:hover:after {
      border: 4px solid ${colors.white};
      transition-duration: all 150ms cubic-bezier(0.55, 0.085, 0.68, 0.53) 0s !important;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: right center;
      border-radius: 4px;
    }
  }
  p {
    margin: 10px 0;
  }

  @media screen and (max-width: 767px) {
    width: calc(50vw - 3.5vw - 24px - 20px);
    height: calc((50vw - 3.5vw - 24px - 20px) * 0.5625);
  }
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    width: calc(33.33vw - 2.33vw - 16px - 20px);
    height: calc(calc(33.33vw - 2.33vw - 16px - 20px) * 0.5625);
  }
  @media screen and (min-width: 1025px) and (max-width: 1440px) {
    width: calc(25vw - 1.75vw - 12px - 20px);
    height: calc(calc(25vw - 1.75vw - 12px - 20px) * 0.5625);
  }
  @media screen and (min-width: 1441px) {
    width: calc(20vw - 1.4vw - 9.6px - 20px);
    height: calc(calc(20vw - 1.4vw - 9.6px - 20px) * 0.5625);
  }
`;

const MovieSlide = (movie) => {
  const movieQueryKey = ['getMovieDetail', movie.id];
  const { isLoading, data } = useQuery(
    movieQueryKey,
    async () => {
      const movieImageData = await getDetail(movie.id, 'imageMovie');
      const movieImage = new Images(movieImageData);
      console.log('moviImages', movieImage);
      return { movieImage };
    },
    { cacheTime: 0 }
  );

  const { movieImage } = data || [];

    if (isLoading) return <div>en cours de chargement</div>;

  return (
    <>
      <Container>
        <NavLink className="link" to={`/movie/${movie.id}`}>
          {movieImage.backdrops[0] ? (
            <img
              src={`https://image.tmdb.org/t/p/w300/${movieImage.backdrops[0].file_path}`}
              alt={`titre ${movie.title}`}
            />
          ) : (
            <p>{movie.title}</p>
          )}
        </NavLink>
      </Container>
    </>
  );
};

export default MovieSlide;
