import React from 'react';
import styled from 'styled-components';
import bgImg from './home-background.png';
import ImgSlider from '../../components/ImgSlider/ImgSlider';
import img from './starwars.jpg';
import title from './slider-title.png';
import img2 from './vaiana.jpg';
import title2 from './vaiana-title.png';
import img3 from './indi.jpg';
import title3 from './indi.png';
import img4 from './img4.jpg';
import title4 from './title4.png';
import img5 from './avatar.jpg';
import title5 from './avatar.png';
import img6 from './secret.jpg';
import title6 from './secret-title.png';
import img7 from './img5.jpg';
import title7 from './img5-title.png';
import img8 from './img6.jpg';
import title8 from './img6-title.png';
import img9 from './img7.jpg';
import title9 from './img7-title.png';
import Viewers from '../../components/viewers/Viewers';

const Home = () => {
  const array = [
    { img: img, title: title },
    { img: img2, title: title2 },
    { img: img3, title: title3 },
    { img: img4, title: title4 },
    { img: img5, title: title5 },
    { img: img6, title: title6 },
    { img: img7, title: title7 },
    { img: img8, title: title8 },
    { img: img9, title: title9 }
   
  ];

  return (
    <Container>
      <ImgSlider
        slides={array}
        autoPlay={true}
        slidesVisible={1}
        slidesToScroll={1}
      />
      <Viewers />
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
