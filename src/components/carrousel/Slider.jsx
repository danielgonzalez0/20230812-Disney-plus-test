import React, { useCallback, useEffect, useState } from 'react';
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
  height: 100%;
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

const Slider = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth * 0.93 -48);
  const [slideWidth, setSlideWidth] = useState(window.innerWidth * 0.25 + 20)
  const [slidesVisible, setSlidesVisible] = useState(Math.round(windowWidth / slideWidth))


const handleResize = useCallback(() => {
  setWindowWidth(Math.round(window.innerWidth * 0.93 - 48));
  setSlideWidth(Math.round(window.innerWidth * 0.25 + 20));
  setSlidesVisible(Math.round(windowWidth / 283));
}, [windowWidth, slideWidth]);

  useEffect(() => {
    window.addEventListener('resize', ()=>handleResize());
    return () => {
      window.removeEventListener('resize', () => handleResize());
    };
  }, [handleResize]);

  const handleLeft = async () => {};
  const handleRight = async () => {};
  return (
    <>
      <Carrousel className="carroussel">
        <LeftBtn onClick={() => handleLeft()}>
          <StyledIcon icon={faChevronLeft} />
        </LeftBtn>
        {"nombre de slide a afficher: " + slidesVisible}
        <RightBtn onClick={() => handleRight()}>
          <StyledIcon icon={faChevronRight} />
        </RightBtn>
      </Carrousel>
    </>
  );
};

export default Slider;
