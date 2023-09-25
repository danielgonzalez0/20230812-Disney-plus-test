import React, { useState } from 'react';
import styled from 'styled-components';
import SerieEpisodes from './SerieEpisodes';

const BtnContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 16px;
  button {
    padding: 10px;
    color: #cacaca;
    cursor: pointer;
    background: none;
    border: none;
  }
  .activeBtn {
    color: #f9f9f9;
  }
`;

const SeasonsBtn = ({ id, seasons, defaultVideo }) => {
  const [activeSeason, setActiveSeason] = useState(1);
  const handleTabDisplay = (nbOfSeasons) => {
    setActiveSeason(nbOfSeasons);
  };
  return (
    <>
      <BtnContainer>
        {seasons.length > 0 &&
          seasons.map((season, index) => (
            <button
              key={index}
              className={
                activeSeason === season.season_number ? 'activeBtn' : null
              }
              onClick={() => handleTabDisplay(season.season_number)}
              data-id={season.id}
            >{`Saison ${season.season_number}`}</button>
          ))}
      </BtnContainer>

      {activeSeason &&
        seasons.length > 0 &&
        seasons.map((season, index) => {
          return (
            activeSeason === season.season_number && (
              <SerieEpisodes
                key={index}
                season={season.season_number}
                id={`${id}`}
                defaultVideo={defaultVideo[0]}
              />
            )
          );
        })}
    </>
  );
};

export default SeasonsBtn;
