import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { colors } from '../../utils/variables';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

//styled components

const Carrousel = styled.div`
  margin: 20px auto 0;
  /* border: 1px solid red; */
  position: relative;
`;

const StyledIcon = styled(FontAwesomeIcon)`
  font-size: 30px;
  color: ${colors.white};
`;

const Button = styled.button`
  position: absolute;
  top: 20px;
  z-index: 2;
  width: 3.5vw;
  height: 25.5vw;
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
    outline: 1px solid ${colors.white};
    opacity: 1;
  }
`;
const LeftBtn = styled(Button)`
  left: 2px;
`;

const RightBtn = styled(Button)`
  right: 2px;
`;

const Slider = styled.div`
  display: flex;
  height: 26vw;
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
`;

//styled components

const cloneElements = (elements, n) => {
  const clonedElements = [];

  // Cloning the last n elements and adding them to the beginning
  clonedElements.push(
    ...elements
      .slice(-n)
      .map((element, index) =>
        React.cloneElement(element, { key: `clonedFirst${index}` })
      )
  );

  // Adding the original elements
  clonedElements.push(...elements);

  // Cloning the first n elements and adding them to the end
  clonedElements.push(
    ...elements
      .slice(0, n)
      .map((element, index) =>
        React.cloneElement(element, { key: `clonedLast${index}` })
      )
  );

  return clonedElements;
};

const InfiniteLoopComponent = ({ elements, offset }) => {
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
      {clonedElements.map((element, index) => (
        <div
          key={index}
          className="container"
          style={{ flex: `0 0 ${(1 / elements.length) * 100}%` }}
        >
          {element}
        </div>
      ))}
    </>
  );
};

const ImgSlider = ({ slides, autoPlay, slidesVisible, slidesToScroll }) => {
  const [slideIndex, setSlideIndex] = useState(slidesToScroll + slidesVisible);
  const [sliderDomElement, setSliderDomElement] = useState();
  const offset = slidesToScroll + slidesVisible;
  const translateInitial = `calc(-${(offset * 100) / slides.length}% - ${
    offset * 2
  }vw)`;
  const translateFinal = `calc(-${
    ((1 + slides.length) * 100) / slides.length
  }% - ${(1 + slides.length) * 2}vw)`;

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

  // const handleAutoPlay = useCallback(() => {
  //   if (autoPlay && sliderDomElement) {
  //     setInterval(() => {
  //       setSlideIndex((prevSlideIndex) => prevSlideIndex + 1);
  //       handleRight();
  //       resetInfinite();
  //     }, 1000);
  //   }
  // }, [autoPlay, sliderDomElement, slideIndex]);

  // window.addEventListener('load', handleAutoPlay);

  useEffect(() => {
    setSliderDomElement(document.querySelector(`.${Slider.styledComponentId}`));
    if (sliderDomElement) {
      sliderDomElement.style.transform = `translate3d(${translateInitial}, 0, 0)`;
    }
  }, [sliderDomElement, translateInitial]);

  return (
    <>
      <LeftBtn onClick={handleLeft}>
        <StyledIcon icon={faChevronLeft} />
      </LeftBtn>
      <Carrousel className="carroussel">
        <Slider
          onTransitionEnd={resetInfinite}
          className="slider"
          style={{
            width: `${(slides.length * 100) / slidesVisible}%`,
          }}
        >
          {slides && (
            <InfiniteLoopComponent
              offset={offset}
              elements={slides.map((movie, index) => (
                <>
                  <img key={index} src={movie.img} alt="Slide" />
                  <img
                    key={`title-${index}`}
                    src={movie.title}
                    alt="title"
                    className={
                      slideIndex - 2 === parseInt(index) ? 'visible' : null
                    }
                  />
                </>
              ))}
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
      <RightBtn onClick={() => handleRight()}>
        <StyledIcon icon={faChevronRight} />
      </RightBtn>
    </>
  );
};

export default ImgSlider;
