import React from 'react';
import styled from 'styled-components';
import Footer from '../../components/footer/Footer';
import { useSelector } from 'react-redux';
import AllMoviesSlide from '../allMovies/AllMoviesSlide';
import AllSeriesSlide from '../allSeries/AllSeriesSlide';

const Container = styled.main`
  min-height: calc(100vh);
  overflow: hidden;
  padding: 0 calc(3.5vw + 24px);
  position: relative;
  top: 0;
  margin-top: 70px;
`;

const Header = styled.header`
  background-color: rgb(26, 29, 41);
  left: 0px;
  padding: 30px calc(3.5vw + 24px) 24px;
  position: fixed;
  z-index: 5;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 20px;
  h1 {
    font-size: 44px;
  }
  p {
    font-size: 20px;
  }
  @media only screen and (max-width: 600px) {
    align-items: flex-start;
    h1 {
      font-size: 35px;
    }
    p{
        font-size: 18px
    }
  }
`;

const MediaContainer = styled.section`
  position: relative;
  margin-top: 170px;
  margin-bottom: 200px;
  z-index: 0;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  align-items: center;
  transition: all 300ms ease-out 0s;

  @media only screen and (max-width: 600px) {
    margin-top: 155px;
  }
`;

const Favorites = () => {
  const likes = useSelector((state) => state.like);
  return (
    <>
      <Container>
        <Header>
          <h1>Ma liste</h1>
          <p>Mes films et séries</p>
        </Header>
      <MediaContainer>
        {likes.length > 0 &&
          likes.map((media) => <>
          
          {media.type === 'movie' ? (
            <AllMoviesSlide movie={media} key={media.id} />
          ) : (
            <AllSeriesSlide serie={media} key={media.id} />
          )}
          </>)}
        {/* {isLoading && <div>en cours de chargement</div>}
        {!isLoading &&
          serieArray.length > 0 &&
          serieArray.map((serie, index) => (
            <AllSeriesSlide serie={serie} key={index} />
          ))}  */}
      </MediaContainer>
      </Container>
      <Footer />
    </>
  );
};

export default Favorites;
