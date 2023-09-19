import React from 'react';
import Slider from '../carrousel/Slider';
import SuggestionSlide from './SuggestionSlice';

const SerieSuggestions = ({ suggestions }) => {
  console.log(suggestions);
  return (
    <>
      <Slider array={suggestions.slice(0, 10)} componentToMap={SuggestionSlide} />
    </>
  );
};

export default SerieSuggestions;
