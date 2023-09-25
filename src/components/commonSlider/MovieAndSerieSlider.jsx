import React from 'react';
import styled from 'styled-components';
import Slider from '../carrousel/Slider';
import MovieAndSerieSlide from './MovieAndSerieSlide';

const Container = styled.section`
  width: 100%;
  padding: 10px 0;
  h4 {
    font-size: 20px;
    letter-spacing: 0.11px;
    line-height: 1.4;
    padding: 10px 0; 
  }
`;

const MovieAndSerieSlider = ({ content , id}) => {
  return (
    
      <Container>
        <h4>{content.title}</h4>
        <Slider array={content.data} componentToMap={MovieAndSerieSlide} id={id}/>
      </Container>


  );
};

export default MovieAndSerieSlider;
