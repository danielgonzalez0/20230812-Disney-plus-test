import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import MovieAndSerieSlider from '../../components/commonSlider/MovieAndSerieSlider';
import { animations, marvelAlaUne, marvelAnimations, marvelLesOrigines, marvelSagaInfini, marvelSagaMultivers, marvelXmen } from '../../utils/collections';
import Footer from '../../components/footer/Footer';
import brandImg from '../../assets/images/background-marvel.jpg';
import brandVideo from '../../assets/videos/marvel.mp4';

const Container = styled.main`
  min-height: calc(100vh - 200px);
  overflow-x: hidden;
  padding: 0 calc(3.5vw + 24px);
  position: relative;
  top: 72px;
  .filter {
    background-color: rgb(26, 29, 41);
    position: fixed;
    height: 100%;
    left: 0;
    top: 0px;
    transition: opacity 200ms ease 0s;
    width: 100%;
    z-index: -3;
  }
`;

const Background = styled.div`
  left: 0px;
  position: fixed;
  right: 0px;
  top: 0px;
  transition: opacity 300ms ease 0s;
  width: 100%;
  z-index: -1;
  img {
    width: 100vw;
    position: relative;
    z-index: -10;
  }
  video {
    position: fixed;
    inset: 0px 0px -1px;
    /* opacity: 1; */
    z-index: -10;
    transition: opacity 1000ms ease 0s;
    width: 100%;
  }
  &:after {
    position: absolute;
    top: 0;
    left: 0;
    content: '';
    width: 100%;
    height: 100%;
    z-index: -5;
    background: linear-gradient(
      transparent 25%,
      transparent 50%,
      rgb(26, 29, 41) 75%,
      rgb(26, 29, 41) 100%
    );
    /* background: radial-gradient(
      farthest-side at 73% 21%,
      transparent,
      rgb(26, 29, 41)
    ); */
  }
`;

const SliderContainer = styled.div`
  margin-top: 30vw;
  margin-bottom: 150px;
`;
const Marvel = () => {
  const [opacityValue, setopacityValue] = useState(1);
  const [opacityVideo, setOpacityVideo] = useState(1);
  function handleScroll() {
    if (window.scrollY >= 100 && window.scrollY < 200) {
      setopacityValue(0.73333);
    } else if (window.scrollY >= 200 && window.scrollY < 300) {
      setopacityValue(0.46667);
    } else if (window.scrollY >= 300) {
      setopacityValue(0.2);
    } else {
      setopacityValue(1);
    }
  }

  function handleVideoEnded() {
    // Mettre à jour l'opacité lorsque la vidéo se termine
    setOpacityVideo(0);
  }
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [opacityValue]);
  useEffect(() => {
    const videoElement = document.querySelector('video');
    videoElement.addEventListener('ended', handleVideoEnded);
    return () => {
      videoElement.removeEventListener('ended', handleVideoEnded);
    };
  }, []);

  return (
    <>
      <Container>
        <div className="filter"></div>
        <Background style={{ opacity: opacityValue }}>
          <img src={brandImg} alt="disney brand" />
          <video
            autoPlay={true}
            loop={false}
            playsInline={true}
            muted={true}
            style={{ opacity: opacityVideo }}
          >
            <source src={brandVideo} type="video/mp4" />
          </video>
        </Background>
        <SliderContainer>
          <MovieAndSerieSlider content={marvelAlaUne} id={'slide1'} />
          <MovieAndSerieSlider content={marvelSagaInfini} id={'slide2'} />
          <MovieAndSerieSlider content={marvelSagaMultivers} id={'slide3'} />
          <MovieAndSerieSlider content={marvelLesOrigines} id={'slide4'} />
          <MovieAndSerieSlider content={marvelAnimations} id={'slide5'} />
          <MovieAndSerieSlider content={marvelXmen} id={'slide6'} />
        </SliderContainer>
      </Container>
      <Footer />
    </>
  );
};

export default Marvel;