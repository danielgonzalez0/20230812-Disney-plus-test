import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { handleSlideOverflow, handleSlidesVisible } from '../../utils/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { colors } from '../../utils/variables';

const SliderUl = styled.ul`
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
  left: calc(-3.7vw - 26px);
`;

const RightBtn = styled(Button)`
  right: calc(-3.7vw - 26px);
`;

const Slider = ({ array, componentToMap, id }) => {
  const [slidesVisible, setSlidesVisible] = useState(
    handleSlidesVisible(window.innerWidth)
  );
  const [slideIndex, setSlideIndex] = useState(0);
  const [sliderDomElement, setSliderDomElement] = useState();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const slidesTotal = Math.ceil(array.length / slidesVisible);
  const translateInitial = `calc(-0% - 0px)`;
  //gestion tactile
  const [origin, setOrigin] = useState(null);
  const [sliderWidth, setSliderWidth] = useState(null);
  const [lastTranslate, setLastTranslate] = useState(null);

  const handleLeft = async () => {
    if (slideIndex <= 0) {
    } else {
      // Calculer la valeur de translation
      // Appliquer les transformations et la transition
      setSlideIndex(slideIndex - 1);
      let translateX = `calc( ${(-(slideIndex - 1) / slidesTotal) * 100}% - ${
        screenWidth > 430 ? 20 * (slideIndex - 1) : 4 * (slideIndex - 1)
      }px)`;

      sliderDomElement.style.transform = `translate3d(${translateX}, 0, 0)`;
      sliderDomElement.style.transition = 'transform 0.5s ease 0s';
      // console.log(slideIndex / slidesTotal);
      // console.log('click left', slideIndex, slidesTotal);
      setTimeout(() => {
        handleSlideOverflow();
      }, 500);
    }
  };

  /**
   * Démarre le déplacement au touché
   * @param {MouseEvent|TouchEvent} e
   */
  const handleStartDrag = (e) => {
    if (e.touches) {
      if (e.touches.length > 1) {
        return;
      } else {
        e = e.touches[0];
      }
    }
    setOrigin({ x: e.screenX, y: e.screenY });
    setSliderWidth(sliderDomElement.offsetWidth);
    sliderDomElement.style.transition = 'none';
    console.log(origin, sliderWidth);
  };

  /**
   * Déplacement
   * @param {MouseEvent|TouchEvent} e
   */
  const handleDrag = (e) => {
    if (origin) {
      let point = e.touches ? e.touches[0] : e;
      let translate = {
        x: point.screenX - origin.x,
        y: point.screenY - origin.y,
      };
      console.log('point', point);
      console.log('translate', translate);
      if (e.touches && Math.abs(translate.x) > Math.abs(translate.y)) {
        e.preventDefault();
        e.stopPropagation();
      }
      let baseTranslate = (slideIndex * -100) / array.length;
      setLastTranslate(translate);
      console.log('lastTranslate', lastTranslate);
      let percent = baseTranslate + (100 * translate.x) / sliderWidth;
      sliderDomElement.style.transform = 'translate3d(' + percent + '%, 0, 0)';
    }
  };

  /**
   * Fin du déplacement
   * @param {MouseEvent|TouchEvent} e
   */
  const handleEndDrag = useCallback(
    (e) => {
      if (origin && lastTranslate) {
        sliderDomElement.style.transition = 'transform 0.5s ease 0s';
        if (Math.abs(lastTranslate.x / sliderWidth) > 0.2) {
          if (lastTranslate.x < 0) {
            handleRight();
          } else {
            handleLeft();
          }
        } else {
          // handleRight();
        }
      }
      setOrigin(null);
      console.log(origin);
    },
    [lastTranslate, origin, sliderWidth]
  );

  const handleRight = async () => {
    let translateX = `calc( ${(-(slideIndex + 1) / slidesTotal) * 100}% - ${
      screenWidth > 430 ? 20 * (slideIndex + 1) : 4 * (slideIndex + 1)
    }px)`;

    if (slideIndex >= slidesTotal - 1) {
    } else {
      // Calculer la valeur de translation
      // Appliquer les transformations et la transition
      sliderDomElement.style.transform = `translate3d(${translateX}, 0, 0)`;
      sliderDomElement.style.transition = 'transform 0.5s ease 0s';
      setSlideIndex(slideIndex + 1);
      // console.log('click right', slideIndex, slidesTotal);
    }
    setTimeout(() => {
      handleSlideOverflow();
    }, 500);
  };

  useEffect(() => {
    setTimeout(() => {
      handleSlideOverflow();
    }, 300);
    window.addEventListener('resize', () => {
      handleSlideOverflow();
      setSlidesVisible(handleSlidesVisible(window.innerWidth));
      setScreenWidth(window.innerWidth);
      setSlideIndex(0);
      setSliderDomElement(document.querySelector(`#${id}`));
      if (sliderDomElement) {
        sliderDomElement.style.transform = `translate3d(${translateInitial}, 0, 0)`;
      }
    });
    return () => {
      window.removeEventListener('resize', () => {
        handleSlideOverflow();
        setSlidesVisible(handleSlidesVisible(window.innerWidth));
        setScreenWidth(window.innerWidth);
      });
    };
  }, [sliderDomElement, translateInitial, id]);

  useEffect(() => {
    setSliderDomElement(document.querySelector(`#${id}`));
    if (sliderDomElement) {
      sliderDomElement.style.transform = `translate3d(${translateInitial}, 0, 0)`;
    }
  }, [sliderDomElement, translateInitial, id]);

  useEffect(() => {
    // window.addEventListener('mousemove', (e) => handleDrag(e));
    // window.addEventListener('touchmove', (e) => handleDrag(e));
    window.addEventListener('touchend', (e) => handleEndDrag(e));
    window.addEventListener('mouseup', (e) => handleEndDrag(e));
    window.addEventListener('touchcancel', (e) => handleEndDrag(e));
    // return () => {
    //   window.removeEventListener('mousemove', (e) => handleDrag(e));
    //   window.removeEventListener('touchmove', (e) => handleDrag(e));
    // };
  }, [handleEndDrag]);

  return (
    <>
      <SlidesContainer
        className="slider"
        onDragStart={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        onMouseDown={(e) => handleStartDrag(e)}
        onTouchStart={(e) => handleStartDrag(e)}
        onMouseMove={(e) => handleDrag(e)}
        onTouchMove={(e) => handleDrag(e)}
        onTouchEnd={(e) => handleEndDrag(e)}
        onMouseUp={(e) => handleEndDrag(e)}
        onTouchCancel={(e) => handleEndDrag(e)}
      >
        {slideIndex > 0 && (
          <LeftBtn onClick={() => handleLeft()}>
            <StyledIcon icon={faChevronLeft} />
          </LeftBtn>
        )}
        <SliderUl
          id={id}
          style={{
            width: `${slidesTotal * 100}%`,
          }}
        >
          {array.map((item, index) => (
            <li key={index}>{componentToMap(item)}</li>
          ))}
        </SliderUl>
        {slideIndex < slidesTotal - 1 && (
          <RightBtn onClick={() => handleRight()}>
            <StyledIcon icon={faChevronRight} />
          </RightBtn>
        )}
      </SlidesContainer>
    </>
  );
};

export default Slider;
