import React, { useEffect } from 'react';
import styled from 'styled-components';

import { useDispatch } from 'react-redux';
import { setVideoParams } from '../../redux/features/videoSlice';

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

const DataContent = ({genres, runtime, release, data, videos }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(videos);
  }, [videos]);

  return (
    <div>
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
        <BtnPlay onClick={() => dispatch(setVideoParams(videos[0].key))}>
          LECTURE
        </BtnPlay>
        <BtnTrailer onClick={() => dispatch(setVideoParams(videos[0].key))}>
          BANDE-ANNONCE
        </BtnTrailer>
      </div>
    </div>
  );
};

export default DataContent;
