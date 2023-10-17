import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { colors } from '../../utils/variables';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';

//styled components

const Carrousel = styled.div`
  margin: 20px auto 0;
  /* border: 1px solid red; */
  position: relative;
  z-index: 5;
`;

const StyledIcon = styled(FontAwesomeIcon)`
  font-size: 30px;
  color: ${colors.white};
`;

const Button = styled.button`
  position: absolute;
  top: 90px;
  z-index: 6;
  width: calc(3.5vw + 24px);
  height: 22vw;
  margin: 0 auto;
  background: transparent;
  border-color: transparent;
  color: ${colors.white};
  font-size: 24px;
  cursor: pointer;
  opacity: 0;

  &:hover {
    opacity: 1;
    transition: opacity 0.2s ease 0s;
  }

  &:focus-visible {
    outline: 4px solid ${colors.white};
    opacity: 1;
  }
`;
const LeftBtn = styled(Button)`
  left: -2px;
`;

const RightBtn = styled(Button)`
  right: -2px;
`;

const Slider = styled.div`
  display: flex;
  height: 22vw;
  /* width: auto; */
  gap: 2vw;
  /* transition: ${(props) =>
    props.active ? 'transform 0.5s ease 0s' : 'none'}; */

  .inactive {
    transition: none;
  }

  .container {
    /* background-color: red;  */

    /* flex: 0 0 10%; */
    position: relative;
    border-radius: 4px;
    cursor: pointer;
    box-shadow: rgb(0 0 0 / 69%) 0 26px 30px -10px,
      rgb(0 0 0 / 73%) 0 16px 10px -10px;
    &:focus-visible {
      border: 4px solid ${colors.white};
      transition-duration: all 150ms cubic-bezier(0.55, 0.085, 0.68, 0.53) 0s !important;
      outline: none;
    }

    .link {
      position: relative;
      display: block;
      width: 100%;
      height: 100%;
      z-index: 100;
      &:after {
        position: absolute;
        content: '';
        top: 0;
        right: 0;
        height: 98%;
        width: 100%;
        border-radius: 4px;
      }
      &:hover:after {
        border: 4px solid ${colors.white};
        transition-duration: all 150ms cubic-bezier(0.55, 0.085, 0.68, 0.53) 0s !important;
        outline: none;
      }
    }

    img:first-child {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: right center;
      border-radius: 4px;
    }

    img:last-child {
      position: absolute;
      z-index: 3;
      content: '';
      left: 50px;
      top: 20%;
      height: 50%;
      width: auto;
      transform: translateX(30px);
      transition: transform 700ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 150ms;
    }

    .visible {
      transform: translateX(0) !important;
    }
  }
`;

const Pagination = styled.ul`
  list-style-type: none;
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0;
  height: 20px;
  position: absolute;
  content: '';
  bottom: 10px;
  right: 30px;
  li {
    height: 7px;
    width: 7px;
    border-radius: 10px;
    background: #969eab;
    cursor: pointer;
  }

  .active {
    background: ${colors.white};
  }

  @media screen and (max-width: 600px) {
    bottom: 2px;
    right: 15px;
  }
`;

//styled components

const cloneElements = (elements, n) => {
  const clonedElements = [];

  // Cloning the last n elements and adding them to the beginning
  clonedElements.push(
    ...elements.slice(-n).map((element, index) =>
      React.cloneElement(element, {
        key: `clonedFirst${index}`,
      })
    )
  );

  // Adding the original elements
  clonedElements.push(
    ...elements.map((element, index) =>
      React.cloneElement(element, { key: `original${index}` })
    )
  );

  // Cloning the first n elements and adding them to the end
  clonedElements.push(
    ...elements.slice(0, n).map((element, index) =>
      React.cloneElement(element, {
        key: `clonedLast${index}`,
      })
    )
  );

  return clonedElements;
};

const InfiniteLoopComponent = ({ elements, offset, slideIndex }) => {
  const [clonedElements, setClonedElements] = useState([]);

  useEffect(() => {
    if (elements.length > 0) {
      const cloned = cloneElements(elements, offset);
      setClonedElements(cloned);
    }
  }, [elements, offset]);

  // Rendu de votre composant avec les éléments clonés
  return (
    <>
      {clonedElements.map((element, index) => {
        return (
          <div
            key={index}
            className="container"
            style={{ flex: `0 0 ${(1 / elements.length) * 100}%` }}
            id={element.key}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                // Si la touche "Enter" est enfoncée, déclencher le clic sur le lien
                const link = e.target.querySelector('.link'); // Trouver le lien à l'intérieur de l'élément
                if (link) {
                  link.click(); // Déclencher le clic sur le lien
                }
              }
            }}
            tabIndex={
              slideIndex === index && element.key.includes('original') ? 0 : -1
            }
          >
            {element}
          </div>
        );
      })}
    </>
  );
};

const ImgSlider = ({ slides, slidesVisible, slidesToScroll }) => {
  const [slideIndex, setSlideIndex] = useState(slidesToScroll + slidesVisible);
  const [sliderDomElement, setSliderDomElement] = useState();
  const offset = slidesToScroll + slidesVisible;
  const translateInitial = `calc(-${(offset * 100) / slides.length}% - ${
    offset * 2
  }vw)`;
  const translateFinal = `calc(-${
    ((1 + slides.length) * 100) / slides.length
  }% - ${(1 + slides.length) * 2}vw)`;

  //gestion tactile
  const [screenWidth] = useState(window.innerWidth);
  const [origin, setOrigin] = useState(null);
  const [sliderWidth, setSliderWidth] = useState(null);
  const [lastTranslate, setLastTranslate] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragPercent, setDragPercent] = useState(0);

  /**
   * Déplacement
   * @param {MouseEvent|TouchEvent} e
   */
  const handleDrag = (e) => {
    if (origin) {
      // console.log('drag orign +width', origin, sliderWidth);
      // console.log('avant def point', e.screenX);
      setIsDragging(true);
      // console.log('isDragging ', isDragging);
      let point = e.touches ? e.touches[0] : e;
      let translate = {
        x: point.screenX - origin.x,
        y: 0,
      };
      // console.log('point', point);
      // console.log('translate', translate);
      if (e.touches && Math.abs(translate.x) > Math.abs(translate.y)) {
        e.preventDefault();
        e.stopPropagation();
      }
      let baseTranslate = (slideIndex * -100) / slides.length;
      // console.log('baseTranslate', baseTranslate);
      setLastTranslate(translate);
      // console.log('lastTranslate', lastTranslate);
      let percent = baseTranslate + (100 * translate.x) / sliderWidth;
      // console.log('percent', percent + dragPercent);
      // console.log('percent', percent);
      if (Math.abs(percent) > 10) {
        sliderDomElement.style.transform =
          'translate3d(' + percent + dragPercent + '%, 0, 0)';
      }
    }
  };
  /**
   * Démarre le déplacement au touché
   * @param {MouseEvent|TouchEvent} e
   */
  const handleStartDrag = async (e) => {
    setIsDragging(false);
    // console.log('isdragging', isDragging);
    if (e.touches) {
      // console.log('e.touches', e);
      if (e.touches.length > 1) {
        return;
      } else {
        e = e.touches[0];
      }
    }
    setOrigin({ x: e.screenX, y: e.screenY });
    setSliderWidth(sliderDomElement.offsetWidth);
    sliderDomElement.style.transition = 'none';

    // console.log('start drag', e.target.alt);
    // console.log('start drag', e.screenX, e.screenY);
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
        let baseTranslate = (slideIndex * -100) / slides.length;
        let percent = baseTranslate + (100 * lastTranslate.x) / sliderWidth;
        setDragPercent(percent);
        //fin recalcul
        if (Math.abs(lastTranslate.x / screenWidth) > 0.2) {
          // console.log(lastTranslate);
          if (lastTranslate.x < 0) {
            handleRight();
          } else {
            handleLeft();
          }
        } else {
          // console.log('slideIndex', slideIndex);
        }
        setTimeout(() => {
          setIsDragging(false);
        }, 300);
      }
      setOrigin(null);

      // console.log(origin);
      // console.log('end drag', e.target.alt);
    },
    [lastTranslate, origin, sliderWidth, screenWidth, sliderDomElement]
  );

  const handleLeft = async () => {
    let translateX = `calc(-${((slideIndex - 1) * 100) / slides.length}% - ${
      (slideIndex - 1) * 2
    }vw)`;
    if (slideIndex <= 1) {
      // setSlideIndex(slides.length);
    } else {
      // Calculer la valeur de translation
      // Appliquer les transformations et la transition

      setSlideIndex(slideIndex - 1);
      sliderDomElement.style.transform = `translate3d(${translateX}, 0, 0)`;
      sliderDomElement.style.transition = 'transform 0.5s ease 0s';
    }
  };

  const resetInfinite = () => {
    if (slideIndex >= slides.length + offset) {
      // Réinitialisez les styles et l'indice de la diapositive
      setSlideIndex(offset);
      sliderDomElement.style.transition = 'none';
      sliderDomElement.style.transform = `translate3d(${translateInitial}, 0, 0)`;
    }
    if (slideIndex <= 1) {
      setSlideIndex(slides.length + 1);
      // Réinitialisez les styles et l'indice de la diapositive
      sliderDomElement.style.transition = 'none';
      sliderDomElement.style.transform = `translate3d(${translateFinal}, 0, 0)`;
    }
  };

  const handleRight = () => {
    let translateX = `calc(-${((slideIndex + 1) * 100) / slides.length}% - ${
      (slideIndex + 1) * 2
    }vw)`;

    if (slideIndex >= slides.length + offset) {
    } else {
      // Calculer la valeur de translation
      // Appliquer les transformations et la transition
      sliderDomElement.style.transform = `translate3d(${translateX}, 0, 0)`;
      sliderDomElement.style.transition = 'transform 0.5s ease 0s';
      setSlideIndex(slideIndex + 1);
    }
  };

  const gotToSlide = (index) => {
    setSlideIndex(index);
    let translateX = `calc(-${(index * 100) / slides.length}% - ${
      index * 2
    }vw)`;
    sliderDomElement.style.transform = `translate3d(${translateX}, 0, 0)`;
    sliderDomElement.style.transition = 'transform 0.5s ease 0s';
  };

  useEffect(() => {
    setSliderDomElement(document.querySelector(`.${Slider.styledComponentId}`));
    if (sliderDomElement) {
      sliderDomElement.style.transform = `translate3d(${translateInitial}, 0, 0)`;
    }
  }, [sliderDomElement, translateInitial]);

  return (
    <>
      <LeftBtn
        onClick={() => {
          handleLeft();
        }}
      >
        <StyledIcon icon={faChevronLeft} />
      </LeftBtn>
      <Carrousel className="carroussel">
        <Slider
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
          onTransitionEnd={resetInfinite}
          className="slider1"
          style={{
            width: `${(slides.length * 100) / slidesVisible}%`,
          }}
        >
          {slides && (
            <InfiniteLoopComponent
              offset={offset}
              slideIndex={slideIndex}
              elements={slides.map((movie, index) => {
                return (
                  <NavLink
                    data-index={`${index}`}
                    className="link"
                    tabIndex={-1}
                    to={
                      movie.type === 'movie'
                        ? `/movie/${movie.id}`
                        : `/serie/${movie.id}`
                    }
                    onClick={(e) => {
                      if (isDragging) {
                        e.preventDefault();
                        e.stopPropagation();
                        // console.log('event click annulé');
                      }
                    }}
                  >
                    <img key={index} src={movie.img} alt="Slide" />
                    <img
                      key={`title-${index}`}
                      src={movie.title}
                      alt="title"
                      className={
                        slideIndex - 2 === parseInt(index) ? 'visible' : null
                      }
                    />
                  </NavLink>
                );
              })}
            />
          )}
        </Slider>
        <Pagination>
          {slides.map((item, index) => (
            <li
              key={index}
              data-id={index + offset}
              className={slideIndex === index + offset ? 'active' : null}
              onClick={(e) => gotToSlide(parseInt(e.target.dataset.id))}
            ></li>
          ))}
        </Pagination>
      </Carrousel>
      <RightBtn
        onClick={() => {
          handleRight();
        }}
      >
        <StyledIcon icon={faChevronRight} />
      </RightBtn>
    </>
  );
};

export default ImgSlider;
