import React, { useMemo } from 'react';
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
import img10 from './img8.jpg';
import title10 from './img8-title.png';
import Viewers from '../../components/viewers/Viewers';
// import { getAllMovies } from '../../services/api';
// import { useQuery } from '@tanstack/react-query';
import Footer from '../../components/footer/Footer';

import { DisneyIlEtaitUneFois, animations, disneyAgeDeGlace, disneyAnimationsSutdios, disneyClassiques, disneyLiveAction, marvelSagaInfini, marvelSagaMultivers, pixarFilms, pixarToyStory, starMovies } from '../../utils/collections';
import MovieAndSerieSlider from '../../components/commonSlider/MovieAndSerieSlider';
import { useQuery } from '@tanstack/react-query';
import { getAllMovies } from '../../services/api';

const Container = styled.main`
  position: relative;
  background: url(${bgImg}) center center / cover no-repeat fixed;
  min-height: calc(100vh - 200px);
  overflow-x: hidden;
  display: block;
  padding: 0 calc(3.5vw + 24px);
  padding-top: 70px;
  z-index: 2;
`;

const Home = () => {
  const array = [
    { img: img, title: title, id: 114461, type: 'serie' },
    { img: img2, title: title2, id: 277834, type: 'movie' },
    { img: img3, title: title3, id: 85, type: 'movie' },
    { img: img4, title: title4, id: 82856, type: 'serie' },
    { img: img5, title: title5, id: 76600, type: 'movie' },
    { img: img6, title: title6, id: 114472, type: 'serie' },
    { img: img7, title: title7, id: 508947, type: 'movie' },
    { img: img8, title: title8, id: 84958, type: 'serie' },
    { img: img9, title: title9, id: 83867, type: 'serie' },
    { img: img10, title: title10, id: 284053, type: 'movie' },
  ];

 const queryKey = ['getMovies'];
 const { isLoading, data } = useQuery(queryKey, async () => {
   return await getAllMovies(50, 'movies');
   // return await getData();
 });

 const movies = useMemo(() => data || [], [data]);

  return (
    <>
      <Container>
        <ImgSlider
          slides={array}
          autoPlay={true}
          slidesVisible={1}
          slidesToScroll={1}
        />
        <Viewers />
        {/* {isLoading && <div>en cours de chargement</div>}
        {!isLoading && ( */}
        <MovieAndSerieSlider content={disneyAnimationsSutdios} id={'slide1'} />
        <MovieAndSerieSlider content={marvelSagaInfini} id={'silde2'} />
        <MovieAndSerieSlider content={starMovies} id={'silde3'} />
        <MovieAndSerieSlider content={disneyLiveAction} id={'silde4'} />
        <MovieAndSerieSlider content={pixarFilms} id={'silde5'} />
        <MovieAndSerieSlider content={disneyClassiques} id={'silde6'} />
        <MovieAndSerieSlider content={marvelSagaMultivers} id={'silde7'} />
        <MovieAndSerieSlider content={pixarToyStory} id={'silde8'} />
        <MovieAndSerieSlider content={disneyAgeDeGlace} id={'silde9'} />
        <MovieAndSerieSlider content={DisneyIlEtaitUneFois} id={'silde10'} />
        <MovieAndSerieSlider content={animations} id={'silde11'} />
        {/* )} */}
      </Container>
      <Footer />
    </>
  );
};

export default Home;
