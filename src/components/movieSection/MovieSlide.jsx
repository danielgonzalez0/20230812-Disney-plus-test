import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { colors } from '../../utils/variables';
import { useQuery } from '@tanstack/react-query';
import { getDetail } from '../../services/api';
import { Images } from '../../models/images';
import Spinner from '../spinner/Spinner';

const Container = styled.div`
  cursor: pointer;
  /* position: relative; */
  transition: transform 300ms ease-out 0s;
  /* background-color: rgb(26, 29, 41); */
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.69) 0px 26px 30px -10px,
    rgba(0, 0, 0, 0.73) 0px 16px 10px -10px;

  .link {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
    z-index: 100;
    transition: all 200ms ease-out 0s !important;
    border: 4px transparent;
    border-radius: 4px;

    &:hover, &:focus-visible {
      padding: 4px;
      transform: scale(1.1);
      border: 4px solid ${colors.white};
      border-radius: 10px;
      outline: none;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center center;
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

const SpinnerContainer = styled.div`
  position: absolute;
  width: 50px;
  height: 50px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    width: 50px;
    height: 50px;
  }
`;

const MovieSlide = (movie, isDragging, index, isVisible) => {
  const movieQueryKey = ['getMovieDetail', movie.id];
  const { isLoading, data } = useQuery(
    movieQueryKey,
    async () => {
      const movieImageData = await getDetail(movie.id, 'imageMovie');
      const movieImage = new Images(movieImageData);
      // console.log('moviImages', movieImage);
      return { movieImage };
    },
    { cacheTime: 0 }
  );

  const { movieImage } = data || [];

  if (isLoading)
    return (
      <Container>
        <SpinnerContainer>
          <Spinner />
        </SpinnerContainer>
      </Container>
    );

  return (
    <>
      <Container>
        <NavLink
          className="link"
          to={`/movie/${movie.id}`}
          tabIndex={isVisible === true ? 0 : -1}
          onClick={(e) => {
            if (isDragging) {
              e.preventDefault();
              e.stopPropagation();
              // console.log('event click annulé');
            }
          }}
        >
          {movieImage.backdrops[0] ? (
            <img
              src={`https://image.tmdb.org/t/p/w300/${movieImage.backdrops[0].file_path}`}
              alt={`titre ${movie.title}`}
              data-id={index}
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
