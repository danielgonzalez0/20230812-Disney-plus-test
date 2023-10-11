import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { setVideoParams } from '../../redux/features/videoSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
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
    gap: 20px;
  }

  @media screen and (max-width: 600px) {
    margin-bottom: 26px;
  }
`;

const StyledIcon = styled(FontAwesomeIcon)`
  font-size: 25px;
  margin-right: 15px;
`;

const SeasonContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 5px;
  font-size: 12px;
  line-height: 30px;
  img {
    height: 20px;
  }
`;

const GenresList = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 5px;
  font-size: 12px;
  line-height: 30px;
  padding-bottom: 32px;
`;

const Description = styled.p`
  padding: 1.5rem 0;
  max-width: 874px;
  span {
    font-size: 20px;
    display: flex;
    flex-direction: column;
  }
  @media screen and (max-width: 600px) {
    span {
      font-size: 15px;
    }
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

  @media screen and (max-width: 700px) {
    height: 40px;
    padding: 0 18px;
    font-size: 10px;
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

const SerieContent = ({
  id,
  name,
  genres,
  firstRelease,
  lastRelease,
  videos,
  overview,
  numberOfSeasons,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(videos);
  }, [videos]);
  return (
    <Container>
      <SeasonContainer>
        <img src={adImg} alt="logo ad" />
        <img src={ccImg} alt="logo cc" />
        {numberOfSeasons > 1 ? (
          <span>{`${firstRelease.slice(0, 4)} - ${lastRelease.slice(
            0,
            4
          )} • ${numberOfSeasons} saisons`}</span>
        ) : (
          <span>{`${firstRelease.slice(
            0,
            4
          )} • ${numberOfSeasons} saison`}</span>
        )}
      </SeasonContainer>

      <GenresList>
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
        <LikeBtn id={id} type={'serie'} name={name} />
      </div>
      <Description>
        <span>{overview}</span>
      </Description>
    </Container>
  );
};

export default SerieContent;
