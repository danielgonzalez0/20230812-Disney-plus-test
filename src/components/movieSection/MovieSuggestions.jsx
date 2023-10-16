import React from 'react';
import Slider from '../carrousel/Slider';
import MovieSlide from './MovieSlide';



const MovieSuggestions = ({ suggestions, id }) => {
  // console.log(suggestions);
  return (
    <>
      <Slider array={suggestions.slice(0, 10)} componentToMap={MovieSlide} id={id}/>
    </>
  );
};

export default MovieSuggestions;
