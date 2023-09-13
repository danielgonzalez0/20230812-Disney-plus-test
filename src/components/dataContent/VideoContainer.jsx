import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import VideoMin from '../video/VideoMin';
import { handleSlideOverflow, handleSlidesVisible } from '../../utils/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { colors } from '../../utils/variables';

const Slider = styled.ul`
  display: flex;
  align-content: space-between;
  gap: 20px;

  li {
    display: block;
  }
`;

const SlidesContainer = styled.div`
  position: relative;
  border: solid 2px transparent;

  p {
    margin-top: 10px;
    border-radius: 5px;
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
  }
`;

const Container = styled.div`
  cursor: pointer;
  /* position: relative; */
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

const StyledIcon = styled(FontAwesomeIcon)`
  font-size: 30px;
  color: ${colors.white};
`;

const Button = styled.button`
  position: absolute;
  top: 0;
  z-index: 2;
  width: calc(3.5vw + 24px);
  margin: 0 auto;
  background: transparent;
  border-color: transparent;
  color: ${colors.white};
  font-size: 24px;
  cursor: pointer;
  opacity: 0;

  @media screen and (max-width: 767px) {
    height: calc((50vw - 3.5vw - 24px - 20px) * 0.5625);
  }
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    height: calc(calc(33.33vw - 2.33vw - 16px - 20px) * 0.5625);
  }
  @media screen and (min-width: 1025px) and (max-width: 1440px) {
    height: calc(calc(25vw - 1.75vw - 12px - 20px) * 0.5625);
  }
  @media screen and (min-width: 1441px) {
    height: calc(calc(20vw - 1.4vw - 9.6px - 20px) * 0.5625);
  }

  &:hover {
    opacity: 1;
    transition: opacity 0.2s ease 0s;
  }

  &:focus-visible {
    outline: 1px solid ${colors.white};
    opacity: 1;
  }
`;
const LeftBtn = styled(Button)`
  left: calc(-3.5vw - 24px);
`;

const RightBtn = styled(Button)`
  right: calc(-3.5vw - 24px);
`;

const renderItem = (video) => (
  <>
    <Container>
      <VideoMin id={video.key} playing={false}/>
    </Container>
    <p>{video.name}</p>
  </>
);

const VideoContainer = ({ videos}) => {
  const [slidesVisible, setSlidesVisible] = useState(
    handleSlidesVisible(window.innerWidth)
  );
  const [slideIndex, setSlideIndex] = useState(0);
  const [sliderDomElement, setSliderDomElement] = useState();
  const slidesTotal = Math.ceil(videos.length / slidesVisible);
  const translateInitial = `calc(-0% - 0px)`;

  const handleLeft = async () => {
    if (slideIndex <= 0) {
    } else {
      // Calculer la valeur de translation
      // Appliquer les transformations et la transition
      setSlideIndex(slideIndex - 1);
      let translateX = `calc( ${(-(slideIndex - 1) / slidesTotal) * 100}% - ${
        20 * (slideIndex - 1)
      }px)`;
      sliderDomElement.style.transform = `translate3d(${translateX}, 0, 0)`;
      sliderDomElement.style.transition = 'transform 0.5s ease 0s';
      console.log(slideIndex / slidesTotal);
      console.log('click left', slideIndex, slidesTotal);
      setTimeout(() => {
        handleSlideOverflow();
      }, 500);
    }
  };
  const handleRight = async () => {
    let translateX = `calc( ${(-(slideIndex + 1) / slidesTotal) * 100}% - ${
      20 * (slideIndex + 1)
    }px)`;
    if (slideIndex >= slidesTotal - 1) {
    } else {
      // Calculer la valeur de translation
      // Appliquer les transformations et la transition
      sliderDomElement.style.transform = `translate3d(${translateX}, 0, 0)`;
      sliderDomElement.style.transition = 'transform 0.5s ease 0s';
      setSlideIndex(slideIndex + 1);
      console.log('click right', slideIndex, slidesTotal);
    }
    setTimeout(() => {
      handleSlideOverflow();
    }, 500);
  };

  useEffect(() => {
    handleSlideOverflow();
    window.addEventListener('resize', () => {
      handleSlideOverflow();
      setSlidesVisible(handleSlidesVisible(window.innerWidth));
      setSlideIndex(0);
      setSliderDomElement(
        document.querySelector(`.${Slider.styledComponentId}`)
      );
      if (sliderDomElement) {
        sliderDomElement.style.transform = `translate3d(${translateInitial}, 0, 0)`;
      }
    });
    return () => {
      window.removeEventListener('resize', () => {
        handleSlideOverflow();
        setSlidesVisible(handleSlidesVisible(window.innerWidth));
      });
    };
  }, [sliderDomElement, translateInitial]);

  useEffect(() => {
    setSliderDomElement(document.querySelector(`.${Slider.styledComponentId}`));
    if (sliderDomElement) {
      sliderDomElement.style.transform = `translate3d(${translateInitial}, 0, 0)`;
    }
  }, [sliderDomElement, translateInitial]);

  return (
    <>
      <SlidesContainer className="slider">
        {slideIndex > 0 && (
          <LeftBtn onClick={() => handleLeft()}>
            <StyledIcon icon={faChevronLeft} />
          </LeftBtn>
        )}
        <Slider
          style={{
            width: `${slidesTotal * 100}%`,
          }}
        >
          {videos.map((video, index) => (
            <li key={index}>{renderItem(video)}</li>
          ))}
        </Slider>
        {slideIndex < slidesTotal - 1 && (
          <RightBtn onClick={() => handleRight()}>
            <StyledIcon icon={faChevronRight} />
          </RightBtn>
        )}
      </SlidesContainer>

      {/* <div>
        <p> {'nombre de slide a afficher: ' + slidesVisible}</p>
        <p> {'offset: ' + offset}</p>
        <p> {'slideIndex: ' + slideIndex}</p>
      </div> */}
    </>
  );
};

export default VideoContainer;
