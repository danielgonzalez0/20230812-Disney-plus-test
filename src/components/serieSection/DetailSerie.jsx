import React from 'react';
import styled from 'styled-components';
import { handleFormatTime } from '../../utils/utils';

const Container = styled.section`
  width: 100%;
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
    padding: 0px 12px 12px 0px;
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
      padding: 0;
    }
  }
  @media screen and (max-width: 600px) {
    .overview {
      font-size: 15px;
    }
    .detailsContainer {
      font-size: 12px ;
    }
  }
`;

const SerieDetailContainer = styled.div`
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

const DetailSerie = ({ serie }) => {
  return (
    <Container>
      <h1>{serie.title}</h1>

      <GridContainer>
        <div className="overview">{serie.overview}</div>
        <div className="detailsContainer">
          <SerieDetailContainer>
            <div>
              <p>Durée</p>
              <p>{handleFormatTime(serie.runtime)}</p>
            </div>
            <div>
              <p>Date de sortie</p>
              {serie.number_of_seasons > 1 ? (
                <span>{`${serie.first_release.slice(
                  0,
                  4
                )} - ${serie.last_release.slice(0, 4)}`}</span>
              ) : (
                <span>{`${serie.first_release.slice(0, 4)}`}</span>
              )}
            </div>
            <div>
              <p>Genre</p>
              <p>
                {' '}
                {serie.genres.map((genre, index) => (
                  <span key={genre.id}>
                    {' '}
                    {genre.name}
                    {index < serie.genres.length - 1 ? ',' : ''}
                  </span>
                ))}
              </p>
            </div>
          </SerieDetailContainer>
          <SerieDetailContainer>
            <div>
              <p>Réalisation</p>
              <p>
                {' '}
                {serie
                  .getDirectors()
                  .slice(0, 2)
                  .map((person, index) => (
                    <span key={index}>
                      {' '}
                      {person.name}
                      {index < serie.getDirectors().slice(0, 2).length - 1
                        ? ','
                        : ''}
                    </span>
                  ))}
              </p>
            </div>
            <div>
              <p>Distribution</p>
              {serie.cast.slice(0, 6).map((person, index) => (
                <p key={index}>{person.name}</p>
              ))}
            </div>
          </SerieDetailContainer>
        </div>
      </GridContainer>
    </Container>
  );
};

export default DetailSerie;
