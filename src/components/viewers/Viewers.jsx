import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import disneyViewer from './viewers-disney.png';
import marvelViewer from './viewers-marvel.png';
import nationalViewer from './viewers-national.png';
import pixarViewer from './viewers-pixar.png';
import starViewer from './viewers-starwars.png';
import disneyVid from './1564674844-disney.mp4';
import marvelVid from './1564676115-marvel.mp4';
import nationalVid from './1564676296-national-geographic.mp4';
import pixarVid from './1564676714-pixar.mp4';
import starVid from './1608229455-star-wars.mp4';

const Container = styled.div`
  margin-top: 30px;
  padding: 30px 0 26px;
  display: grid;
  gap: 25px;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  @media only screen and (max-width: 768px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
`;

const Wrap = styled.div`
  padding-top: 56.25%;
  border-radius: 10px;
  box-shadow: rgb(0 0 0 / 69%) 0 26px 30px -10px,
    rgb(0 0 0 / 73%) 0 16px 10px -10px;
  cursor: pointer;
  overflow: hidden;
  position: relative;
  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s !important;
  border: 3px solid rgba(249, 249, 249, 0.1);

  img {
    inset: 0px;
    display: block;
    height: 100%;
    width: 100%;
    object-fit: cover;
    opacity: 1;
    position: absolute;
    transition: opacity 0.5s ease-in-out 0s;
    z-index: 1;
    top: 0;
  }

  video {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    opacity: 0;
    z-index: 0;
  }
  &:hover {
    box-shadow: rgb(0 0 0 / 80%) 0 40px 58px -16px,
      rgb(0 0 0 / 72%) 0 30px 22px -10px;
    transform: scale(1.05);
    border-color: rgba(249, 249, 249, 0.8);
    video {
      opacity: 1;
    }
  }
`;

const Viewers = () => {
  const vidRef = useRef();

  useEffect(() => {
    vidRef.current.play();
  }, []);
  return (
    <Container>
      <Wrap>
        <img src={disneyViewer} alt="disney" />
        <video
          autoPlay={true}
          loop={true}
          playsInline={true}
          ref={vidRef}
          muted={true}
        >
          <source src={disneyVid} type="video/mp4" />
        </video>
      </Wrap>
      <Wrap>
        <img src={pixarViewer} alt="pixar" />
        <video
          autoPlay={true}
          loop={true}
          playsInline={true}
          ref={vidRef}
          muted={true}
        >
          <source src={pixarVid} type="video/mp4" />
        </video>
      </Wrap>
      <Wrap>
        <img src={marvelViewer} alt="marvel" />
        <video
          autoPlay={true}
          loop={true}
          playsInline={true}
          ref={vidRef}
          muted={true}
        >
          <source src={marvelVid} type="video/mp4" />
        </video>
      </Wrap>
      <Wrap>
        <img src={starViewer} alt="star" />
        <video
          autoPlay={true}
          loop={true}
          playsInline={true}
          ref={vidRef}
          muted={true}
        >
          <source src={starVid} type="video/mp4" />
        </video>
      </Wrap>
      <Wrap>
        <img src={nationalViewer} alt="national" />
        <video
          autoPlay={true}
          loop={true}
          playsInline={true}
          ref={vidRef}
          muted={true}
        >
          <source src={nationalVid} type="video/mp4" />
        </video>
      </Wrap>
    </Container>
  );
};

export default Viewers;
