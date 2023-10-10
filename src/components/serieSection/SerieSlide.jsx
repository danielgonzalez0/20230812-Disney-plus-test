import React from 'react';
import styled from 'styled-components';
import { colors } from '../../utils/variables';
import { useDispatch } from 'react-redux';
import { setVideoParams } from '../../redux/features/videoSlice';
import { handleFormatTime } from '../../utils/utils';

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
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    z-index: 100;
    transition: all 200ms ease-out 0s !important;
    border: 4px transparent;
    border-radius: 4px;

    &:hover {
      padding: 4px;
      transform: scale(1.1);
      border: 4px solid ${colors.white};
      border-radius: 4px;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center center;
      border-radius: 4px;
    }
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

const P = styled.p`
  @media screen and (max-width: 767px) {
    width: calc(50vw - 3.5vw - 24px - 20px);
  }
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    width: calc(33.33vw - 2.33vw - 16px - 20px);
  }
  @media screen and (min-width: 1025px) and (max-width: 1440px) {
    width: calc(25vw - 1.75vw - 12px - 20px);
  }
  @media screen and (min-width: 1441px) {
    width: calc(20vw - 1.4vw - 9.6px - 20px);
  }
`;

const Title = styled(P)`
  color: #f9f9f9;
  padding-top: 6px;
  font-size: 15px;
  font-weight: 700;
  line-height: 1.6;
`;
const Overview = styled(P)`
  padding-top: 6px;
  height: 60px;
  display: block;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  max-height: calc(3 * 1.6);
  text-overflow: ellipsis;
  overflow: hidden;
  color: #cacaca;
  font-size: 12px;
  line-height: 1.5;
`;

const SerieSlide = (episode, isDragging, index, isVisible) => {
  const dispatch = useDispatch();

  return (
    <>
      <Container>
        <div
          className="link"
          tabIndex={isVisible === true ? 0 : -1}
          onClick={() =>
            episode.key && isDragging === false
              ? dispatch(setVideoParams(episode.key))
              : null
          }
          onKeyDown={(e) => e.key === 'Enter' && episode.key && isDragging === false
              ? dispatch(setVideoParams(episode.key))
              : null
          }
        >
          {episode.image ? (
            <img
              src={`https://image.tmdb.org/t/p/w300${episode.image}`}
              alt={`titre ${episode.name}`}
              data-id={index}
            />
          ) : (
            <span>No Image available</span>
          )}
        </div>
      </Container>
      <Title>{`${episode.number}. ${episode.name} (${handleFormatTime(
        episode.runtime
      )})`}</Title>
      <Overview>
        {episode.overview.length === 0
          ? 'no overview available'
          : `${episode.overview}`}
      </Overview>
    </>
  );
};

export default SerieSlide;
