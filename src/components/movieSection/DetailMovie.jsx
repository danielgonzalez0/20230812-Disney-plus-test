import React from 'react';
import styled from 'styled-components';
import { handleFormatTime } from '../../utils/utils';

const Container = styled.section`
  width: 100%;
  padding-bottom: 110px;
  h1 {
    font-size: 24px;
    letter-spacing: 0.11px;
    line-height: 1.2;
    padding-bottom: 1.5rem;
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  .overview {
    padding: 0px 12px 0px 0px;
    grid-area: 1 / 1 / 3 / auto;
    font-size: 20px;
    letter-spacing: -0.1px;
    line-height: 1.6;
  }
  .detailsContainer {
    padding: 0px 0px 0px 12px;
    grid-area: 2 / 2 / auto / auto;
    display: flex;
  }
  //mediaqueries
  @media screen and (max-width: 1024px) {
    display: block;
    flex-direction: row;
    .detailsContainer {
      margin-top: 20px;
      padding: 0;
    }
  }

  @media screen and (max-width: 600px) {
    .overview {
      font-size: 15px;
    }
    .detailsContainer {
      font-size: 12px;
    }
  }
`;

const MovieDetailContainer = styled.div`
  flex: 1 1 0%;
  div {
    padding: 0px 0px 8px;
  }
  p {
    font-size: 15px;
    letter-spacing: -0.1px;
    line-height: 1.6;
    color: #f9f9f9;
  }
  p:first-child {
    color: #cacaca;
  }
  @media screen and (max-width: 600px) {
    p {
      font-size: 12px;
    }
  }
`;

const DetailMovie = ({ movie }) => {
  return (
    <Container>
      <h1>{movie.title}</h1>

      <GridContainer>
        <div className="overview">{movie.overview}</div>
        <div className="detailsContainer">
          <MovieDetailContainer>
            <div>
              <p>Durée</p>
              <p>{handleFormatTime(movie.runtime)}</p>
            </div>
            <div>
              <p>Date de sortie</p>
              <p>{movie.release.slice(0, 4)}</p>
            </div>
            <div>
              <p>Genre</p>
              <p>
                {' '}
                {movie.genres.map((genre, index) => (
                  <span key={genre.id}>
                    {' '}
                    {genre.name}
                    {index < movie.genres.length - 1 ? ',' : ''}
                  </span>
                ))}
              </p>
            </div>
          </MovieDetailContainer>
          <MovieDetailContainer>
            <div>
              <p>Réalisation</p>
              <p>
                {' '}
                {movie.getDirectors().map((person, index) => (
                  <span key={index}>
                    {' '}
                    {person.name}
                    {index < movie.getDirectors().length - 1 ? ',' : ''}
                  </span>
                ))}
              </p>
            </div>
            <div>
              <p>Distribution</p>
              {movie.cast.slice(0, 6).map((person, index) => (
                <p key={index}>{person.name}</p>
              ))}
            </div>
          </MovieDetailContainer>
        </div>
      </GridContainer>
    </Container>
  );
};

export default DetailMovie;
