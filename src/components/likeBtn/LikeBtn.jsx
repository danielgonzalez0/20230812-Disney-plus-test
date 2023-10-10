import React, { useState } from 'react';
import styled, { css, keyframes } from 'styled-components';

const rotateAnimation = keyframes`
 0% {
    -webkit-transform: rotate(-360deg);
            transform: rotate(-360deg);
    
  }
  100% {
    -webkit-transform: rotate(0);
            transform: rotate(0);
   
  }
`;

const Container = styled.button`
  cursor: pointer;
  position: relative;
  width: 50px;
  height: 50px;
  border-radius: 50px;
  background: #00000099;
  color: ${(props) => (props.isliked ? '#0063e5' : '#f9f9f9')};
  border: 2px solid #f9f9f9;
  transform-origin: center;
  animation: ${({ isrotating }) =>
    isrotating
      ? css`
          ${rotateAnimation} 0.2s ease-in-out
        `
      : 'none'};
  &:hover,
  &:focus-visible {
    background: #f9f9f9;
    border: 2px solid #f9f9f9;
    color: ${(props) => (props.isliked ? '#0063e5' : 'black')};
  }
  span {
    display: inline-block;
    font-size: 30px !important;
    width: 30px;
    height: 30px;
    position: absolute;
    top: 2px;
    left: 9px;
  }
`;

const LikeBtn = () => {
  const [isLiked, setIsLiked] = useState(false);
  const [isRotating, setIsRotating] = useState(false);

    const handleLikeClick = () => {
      if (!isRotating) {
        setIsRotating(true);
        setTimeout(() => {
          setIsLiked(!isLiked);
          setIsRotating(false);
        }, 200); // Durée de l'animation de rotation
      }
    };
  return (
    <Container isrotating={isRotating} isliked={isLiked} onClick={handleLikeClick}>
      <span>{isLiked ? '✓' : '+'}</span>
    </Container>
  );
};

export default LikeBtn;
