import React from 'react';
import styled from 'styled-components';
import bgImg from './home-background.png';
import ImgSlider from '../../components/ImgSlider/ImgSlider';
import img from './slider-image.jpg';



const Home = () => {
  const array = [
    img,
    'https://via.placeholder.com/220/00FF00?text=2',
    'https://via.placeholder.com/230/00FF00?text=3',
    'https://via.placeholder.com/240/00FF00?text=4',
    'https://via.placeholder.com/250/00FF00?text=5',
    'https://via.placeholder.com/260/00FF00?text=6',
    'https://via.placeholder.com/270/00FF00?text=7',
    'https://via.placeholder.com/280/00FF00?text=8',
    'https://via.placeholder.com/250/00FF00?text=9',
    'https://via.placeholder.com/240/00FF00?text=10',
    'https://via.placeholder.com/210/00FF00?text=11',
  ];

  return (
    <Container>
      <ImgSlider slides={array} infinite={true} slidesVisible={1} slidesToScroll={1} />
    </Container>
  );
};

const Container = styled.main`
  position: relative;
  background: url(${bgImg});
  min-height: calc(100vh - 250px);
  overflow-x: hidden;
  display: block;
  top: 72px;
  padding: 0 5%;

  &:after {
    background: url(${bgImg}) center center / cover no-repeat fixed;
    position: absolute;
    content: '';
    inset: 0px;
    opacity: 1;
    z-index: -1;
  }
`;

export default Home;
