import React, { useEffect } from 'react';
import styled from 'styled-components';
import VideoMin from '../video/VideoMin';

const VideosContainer = styled.ul`
  display: flex;
  align-content: space-between;
  gap: 20px;
  border: solid 2px red;

  p {
    margin-top: 10px;
    border-radius: 5px;
    @media screen and (max-width: 767px) {
      width: (50vw - 3.5vw - 24px - 20px);
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
  }
`;

const Container = styled.div`
  border: solid 2px blue;
  cursor: pointer;
  position: relative;
  transition: transform 300ms ease-out 0s;
  background-color: rgb(26, 29, 41);
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.69) 0px 26px 30px -10px,
    rgba(0, 0, 0, 0.73) 0px 16px 10px -10px;
  .react-player__preview {
    border-radius: 10px;
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


const VideoContainer = ({ videos }) => {
  useEffect(() => {
    console.log(videos);
  }, [videos]);

  return (
    <VideosContainer>
      {videos.map((video, index) => (
        <li key={index}>
          <Container>
            <VideoMin id={video.key} playing={false} />
          </Container>
          <p>{video.name}</p>
        </li>
      ))}
    </VideosContainer>
  );
};

export default VideoContainer;
