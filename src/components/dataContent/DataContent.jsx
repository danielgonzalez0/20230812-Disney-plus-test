import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Video from '../video/Video';

const BtnPlay = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 56px;
  padding: 0 24px;
  color: #0e0b14;
  background: #f9f9f9;
  border: solid 2px #f9f9f9;
  border-radius: 0.25rem;
  transition: all ease-in-out 0.2s;
  &:hover,
  &:focus-visible {
    background: #f9f9f999;
    border: solid 2px #a1a1a1;
  }
  &:focus-visible {
    outline: solid 2px #f9f9f9;
  }
`;

const BtnTrailer = styled(BtnPlay)`
  background: #00000099;
  border: 2px solid #f9f9f9;
  color: #f9f9f9;
  &:hover,
  &:focus-visible {
    background: #f9f9f9;
    border: 2px solid #f9f9f9;
    color: black;
  }
`;

const DataContent = ({ id, genres, runtime, release, data, videos }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    console.log(videos);
    if (isOpen) {
      document.body.style.overflowY = 'hidden';
      document.body.style.pointerEvents = 'none';
    } else {
      document.body.style.overflowY = 'auto';
      document.body.style.pointerEvents = 'auto';
    }
  }, [isOpen, videos]);
  return (
    <div>
      <p>{id}</p>
      <ul>
        {genres.map((genre) => (
          <li key={genre.id}>{genre.name}</li>
        ))}
      </ul>
      <p>{runtime}</p>
      <p>{release}</p>
      <p>{data.getCompaniesQueryParams()}</p>
      <p>{data.getGenresQueryParams()}</p>

      <div>
        <BtnPlay onClick={() => setIsOpen(true)}>LECTURE</BtnPlay>
        <BtnTrailer onClick={() => setIsOpen(true)}>BANDE-ANNONCE</BtnTrailer>
        {isOpen && <Video close={setIsOpen} playing={true} id={videos[0].key}/>}
      </div>
      <ul></ul>
    </div>
  );
};

export default DataContent;
