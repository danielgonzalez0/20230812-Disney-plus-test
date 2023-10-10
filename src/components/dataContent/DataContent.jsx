import React, { useEffect } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { setVideoParams } from '../../redux/features/videoSlice';
import { handleFormatTime } from '../../utils/utils';
import ccImg from './cc.png';
import adImg from './ad.png';
import LikeBtn from '../likeBtn/LikeBtn';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  display: flex;
  min-height: 30px;
  margin-bottom: 56px;
  span {
    font-size: 12px;
  }
  .btnContainer {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 20px;
  }
`;

const StyledIcon = styled(FontAwesomeIcon)`
  font-size: 25px;
  margin-right: 15px;
`;

const GenresList = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 5px;
  font-size: 12px;
  line-height: 30px;
  padding-bottom: 32px;
  img {
    height: 20px;
  }
`;

const Description = styled.p`
  padding: 1rem 0;
  span {
    font-size: 20px;
    display: flex;
    flex-direction: column;
  }
`;

const BtnPlay = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
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

const DataContent = ({ id, genres, runtime, release, videos, tagline, title }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(videos);
  }, [videos]);

  return (
    <Container>
      <span>{`${release.slice(0, 4)} • ${handleFormatTime(runtime)}`}</span>
      <GenresList>
        <img src={adImg} alt="logo ad" />
        <img src={ccImg} alt="logo cc" />
        {genres.map((genre, index) => (
          <li key={genre.id}>
            {' '}
            {genre.name}
            {index < genres.length - 1 ? ',' : ''}
          </li>
        ))}
      </GenresList>

      <div className="btnContainer">
        {videos[0] && (
          <>
            <BtnPlay onClick={() => dispatch(setVideoParams(videos[0].key))}>
              <StyledIcon icon={faPlay} /> LECTURE
            </BtnPlay>
            <BtnTrailer onClick={() => dispatch(setVideoParams(videos[0].key))}>
              BANDE-ANNONCE
            </BtnTrailer>
          </>
        )}
        <LikeBtn id={id} type={'movie'}/>
      </div>
      <Description>
        <span>{title}</span>
        <span>{tagline}</span>
      </Description>
    </Container>
  );
};

export default DataContent;
