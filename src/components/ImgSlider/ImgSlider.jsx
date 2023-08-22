import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { colors } from '../../utils/variables';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

//styled components

const Carrousel = styled.div`
  margin: 0 auto;
  /* border: 1px solid red; */
  position: relative;
`;

const StyledIcon = styled(FontAwesomeIcon)`
  font-size: 30px;
  color: ${colors.white};
`;

const Button = styled.button`
  position: absolute;
  top: 0.5vw;
  z-index: 2;
  width: 3.5vw;
  height: 25.5vw;
  margin: 0 auto;
  background: transparent;
  border-color: transparent;
  color: ${colors.white};
  font-size: 24px;
  cursor: pointer;

  &:focus-visible {
    outline: 1px solid ${colors.white};
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
    /* background-color: red; */
    /* flex: 0 0 10%; */

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: right center;
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
      console.log(elements.length);
      const cloned = cloneElements(elements, offset);
      console.log(cloned);
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

const ImgSlider = ({ slides, infinite, slidesVisible, slidesToScroll }) => {
  const [slideIndex, setSlideIndex] = useState(slidesToScroll + slidesVisible);
  const [sliderDomElement, setSliderDomElement] = useState();
  const offset = slidesToScroll + slidesVisible;
  const translateInitial = `calc(-${(offset * 100) / slides.length}% - ${
    offset * 2
  }vw)`;
  const translateFinal = `calc(-${
    ((1 + slides.length) * 100) / slides.length
  }% - ${(1 + slides.length) * 2}vw)`;

  useEffect(() => {
    setSliderDomElement(document.querySelector(`.${Slider.styledComponentId}`));
    if (sliderDomElement) {
      sliderDomElement.style.transform = `translate3d(${translateInitial}, 0, 0)`;
    }
  }, [sliderDomElement, translateInitial]);

  const handleLeft = async () => {
    let translateX = `calc(-${((slideIndex - 1) * 100) / slides.length}% - ${
      (slideIndex - 1) * 2
    }vw)`;
    if (slideIndex <= 1) {
      // setSlideIndex(slides.length);
    } else {
      console.log('clickleft');
      console.log('slideIndex', slideIndex);
      console.log('translateX', translateX);
      // Calculer la valeur de translation
      // Appliquer les transformations et la transition

      setSlideIndex(slideIndex - 1);
      sliderDomElement.style.transform = `translate3d(${translateX}, 0, 0)`;
      sliderDomElement.style.transition = 'transform 0.5s ease 0s';
    }
  };

  const resetInfinite = () => {
    if (slideIndex >= slides.length + offset) {
      console.log('test');
      // Réinitialisez les styles et l'indice de la diapositive
      setSlideIndex(offset);
      sliderDomElement.style.transition = 'none';
      sliderDomElement.style.transform = `translate3d(${translateInitial}, 0, 0)`;
    }
    if (slideIndex <= 1) {
      setSlideIndex(slides.length + 1);
      console.log('test left');
      // Réinitialisez les styles et l'indice de la diapositive
      sliderDomElement.style.transition = 'none';
      sliderDomElement.style.transform = `translate3d(${translateFinal}, 0, 0)`;
    }
  };

  const handleRight = async () => {
    let translateX = `calc(-${((slideIndex + 1) * 100) / slides.length}% - ${
      (slideIndex + 1) * 2
    }vw)`;
    console.log(slides.length);

    if (slideIndex >= slides.length + offset) {
    } else {
      // Calculer la valeur de translation
      // Appliquer les transformations et la transition
      sliderDomElement.style.transform = `translate3d(${translateX}, 0, 0)`;
      sliderDomElement.style.transition = 'transform 0.5s ease 0s';
      setSlideIndex(slideIndex + 1);
    }
    console.log(slideIndex);
  };

  const gotToSlide = (index) => {
    console.log(index);
    setSlideIndex(index);
    let translateX = `calc(-${(index * 100) / slides.length}% - ${
      index * 2
    }vw)`;
    sliderDomElement.style.transform = `translate3d(${translateX}, 0, 0)`;
    sliderDomElement.style.transition = 'transform 0.5s ease 0s';
  };

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
                <img key={index} src={movie} alt="Slide" data-in={index} />
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
