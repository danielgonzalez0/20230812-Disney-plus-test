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
import { NavLink } from 'react-router-dom';

const Container = styled.div`
  margin-top: 30px;
  padding: 30px 0 26px;
  display: grid;
  gap: 25px;
  grid-template-columns: repeat(5, minmax(0, 1fr));

  .linkViewer {
    position: relative;
    width: 100%;
    height: 100%;
    z-index: 10;
    border: 2px solid transparent;
    box-shadow: rgb(0 0 0 / 69%) 0 26px 30px -10px,
      rgb(0 0 0 / 73%) 0 16px 10px -10px;
    &:hover,
    &:focus-visible {
      box-shadow: rgb(0 0 0 / 80%) 0 40px 58px -16px,
        rgb(0 0 0 / 72%) 0 30px 22px -10px;
      transform: scale(1.05);
      border: 2px solid rgba(249, 249, 249, 0.8);
      border-radius: 10px;
      outline: none;
      
      video {
        opacity: 1;
      }
    }
  }

  @media only screen and (max-width: 768px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

const Wrap = styled.div`
  padding-top: 56.25%;
  border-radius: 10px;

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
    width: 120%;
    height: 120%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
    z-index: 0;
  }
`;

const Viewers = () => {
  const vidRef = useRef();

  useEffect(() => {
    vidRef.current.play();
  }, []);
  return (
    <Container>
      <NavLink to="/brand/disney" className={'linkViewer'}>
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
      </NavLink>
      <NavLink to="/brand/pixar" className={'linkViewer'}>
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
      </NavLink>
      <NavLink to="/brand/marvel" className={'linkViewer'}>
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
      </NavLink>
      <NavLink to="/brand/star-wars" className={'linkViewer'}>
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
      </NavLink>
      <NavLink to="/brand/national-geographic" className={'linkViewer'}>
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
      </NavLink>
    </Container>
  );
};

export default Viewers;
