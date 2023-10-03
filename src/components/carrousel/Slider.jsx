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
  const [isDragging, setIsDragging] = useState(false);
  const [dragPercent, setDragPercent] = useState(0);

  const handleLeft = async () => {
    if (slideIndex <= 0) {
    } else {
      // Calculer la valeur de translation
      // Appliquer les transformations et la transition
      let translateX = `calc( ${(-(slideIndex - 1) / slidesTotal) * 100}% - ${
        screenWidth > 430 ? 20 * (slideIndex - 1) : 4 * (slideIndex - 1)
      }px)`;

      sliderDomElement.style.transform = `translate3d(${translateX}, 0, 0)`;
      sliderDomElement.style.transition = 'transform 0.5s ease 0s';
      setSlideIndex(slideIndex - 1);
      // console.log(slideIndex / slidesTotal);
      // console.log('click left', slideIndex, slidesTotal);
      console.log(slideIndex);
      setTimeout(() => {
        handleSlideOverflow();
      }, 500);
    }
  };

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

  /**
   * Déplacement
   * @param {MouseEvent|TouchEvent} e
   */
  const handleDrag = (e) => {
    setIsDragging(true);
    if (origin) {
      console.log('drag orign +width', origin, sliderWidth);
      console.log('avant def point', e.screenX);
      let point = e.touches ? e.touches[0] : e;
      let translate = {
        x: point.screenX - origin.x,
        y: point.screenY - origin.y,
      };
      // console.log('point', point);
      console.log('translate', translate);
      if (e.touches && Math.abs(translate.x) > Math.abs(translate.y)) {
        e.preventDefault();
        e.stopPropagation();
      }
      let baseTranslate = (slideIndex * -100) / array.length;
      // console.log('baseTranslate', baseTranslate);
      setLastTranslate(translate);
      // console.log('lastTranslate', lastTranslate);
      let percent = baseTranslate + (100 * translate.x) / sliderWidth;
      console.log('percent', percent + dragPercent);
      sliderDomElement.style.transform =
        'translate3d(' + percent + dragPercent + '%, 0, 0)';
    }
  };
  // /**
  //  * attach drag event to DOM element
  //  */
  // const attachDragEvent = () => {
  //   console.log('sliderDeom', sliderDomElement);
  //   if (sliderDomElement) {
  //     sliderDomElement.addEventListener('mousemove', (e) => handleDrag(e));
  //     sliderDomElement.addEventListener('touchmove', (e) => handleDrag(e));
  //   }
  // };

  // /**
  //  * detach drag event to DOM element
  //  */
  // const detachDragEvent = () => {
  //   if (sliderDomElement) {
  //     sliderDomElement.removeEventListener('mousemove', handleDrag);
  //     sliderDomElement.removeEventListener('touchmove', handleDrag);
  //   }
  // };

  /**
   * Démarre le déplacement au touché
   * @param {MouseEvent|TouchEvent} e
   */
  const handleStartDrag = async (e) => {
    setIsDragging(false);
    console.log('isdragging', isDragging)
    if (e.touches) {
      console.log('e.touches', e);
      if (e.touches.length > 1) {
        return;
      } else {
        e = e.touches[0];
      }
    }
    setOrigin({ x: e.screenX, y: e.screenY });
    setSliderWidth(sliderDomElement.offsetWidth);
    sliderDomElement.style.transition = 'none';

    console.log('start drag', e.target.alt);
    console.log('start drag', e.screenX, e.screenY);
  };

  /**
   * Fin du déplacement
   * @param {MouseEvent|TouchEvent} e
   */
  const handleEndDrag = useCallback(
    (e) => {
      if (origin && lastTranslate && isDragging) {
        sliderDomElement.style.transition = 'transform 0.5s ease 0s';
        //recalcul du percent
        let baseTranslate = (slideIndex * -100) / array.length;
        let percent = baseTranslate + (100 * lastTranslate.x) / sliderWidth;
        setDragPercent(percent);
        //fin recalcul
        if (Math.abs(lastTranslate.x / screenWidth) > 0.2) {
          console.log(lastTranslate);
          if (lastTranslate.x < 0) {
            handleRight();
            console.log('got to right');
          } else {
            handleLeft();
            console.log('got to left');
          }
        } else {
          console.log('slideIndex', slideIndex);
        }
        setTimeout(() => {
          setIsDragging(false);
        }, 300);
      }
      setOrigin(null);

      setTimeout(() => {
        handleSlideOverflow();
      }, 500);
      console.log(origin);
      console.log('end drag', e.target.alt);
    },
    [lastTranslate, origin, sliderWidth, screenWidth, sliderDomElement]
  );

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

  // useEffect(() => {
  //   window.addEventListener('mousemove', (e) => handleDrag(e));
  //   window.addEventListener('touchmove', handleDrag());
  // }, []);

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
        onMouseMove={(e) => {
          handleDrag(e);
        }}
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
            <li key={index}>{componentToMap(item, isDragging, index)}</li>
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
