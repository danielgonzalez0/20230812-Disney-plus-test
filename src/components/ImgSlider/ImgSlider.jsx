import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { colors } from '../../utils/variables';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

const cloneElements = (elements) => {
  const firstElement = React.cloneElement(elements[0], { key: 'clonedFirst' });
  const lastElement = React.cloneElement(elements[elements.length - 1], {
    key: 'clonedLast',
  });
  return [lastElement, ...elements, firstElement];
};

const InfiniteLoopComponent = ({ elements }) => {
  const [clonedElements, setClonedElements] = useState([]);

  useEffect(() => {
    if (elements.length > 0) {
      const cloned = cloneElements(elements);
      setClonedElements(cloned);
    }
  }, [elements]);

  // Rendu de votre composant avec les éléments clonés
  return (
    <>
      {clonedElements.map((element, index) => (
        <div key={index} className="container">
          {element}
        </div>
      ))}
    </>
  );
};

const ImgSlider = ({ slides }) => {
  const [slideIndex, setSlideIndex] = useState(1);

  const handleLeft = async () => {
    console.log('clickleft');
    if (slideIndex === 1) {
      setSlideIndex(slides.length );
    } else {
      setSlideIndex(slideIndex - 1);
    }
    console.log(slideIndex);
  };
  const handleRight = () => {
    console.log('clickright');
    console.log(slides.length);
    if (slideIndex === slides.length ) {
      setSlideIndex(1);

    } else {
      setSlideIndex(slideIndex + 1);
    }
    console.log(slideIndex);
  };

  return (
    <>
      <LeftBtn onClick={handleLeft}>
        <StyledIcon icon={faChevronLeft} />
      </LeftBtn>
      <Carrousel>
        <Slider
          id="slider"
          style={{
            transform: `translate3d(calc(-${100 * slideIndex}% - ${
              1.15 * slideIndex
            }rem), 0, 0)`,
            transition: `transform 0.5s ease 0s`,
          }}
        >
          {slides && (
            <InfiniteLoopComponent
              elements={slides.map((movie, index) => (
                <img key={index} src={movie} alt="Slide" data-in={index} />
              ))}
            />
          )}
        </Slider>
      </Carrousel>
        <ul>{slides.map((item, index)=><li key={index}>{index}</li>)}</ul>
      <RightBtn onClick={handleRight}>
        <StyledIcon icon={faChevronRight} />
      </RightBtn>
    </>
  );
};

const Carrousel = styled.div`
  margin: 0 auto;
  border: 1px solid red;
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
  width: auto;
  gap: 1rem;

  .container {
    background-color: red;
    flex: 0 0 calc(100vw - 7vw - 10px);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: right center;
    }
  }
`;

export default ImgSlider;
