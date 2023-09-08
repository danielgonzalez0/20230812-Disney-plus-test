import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { getDetail } from '../../services/api';
import { Images } from '../../models/images';
import DataContent from '../../components/dataContent/DataContent';
import { MovieData } from '../../models/movie';

const Container = styled.main`
  margin-top: 70px;
  min-height: 150vh;
  padding: 0 calc(3.5vw + 24px);
  .filter {
    background-color: rgb(26, 29, 41);
    position: fixed;
    height: 100%;
    left: 0;
    top: 0px;
    transition: opacity 200ms ease 0s;
    width: 100%;
    z-index: -3;
  }
`;
const Background = styled.div`
  left: 0px;
  position: fixed;
  right: 0px;
  top: 0px;
  transition: opacity 300ms ease 0s;
  width: 100%;
  z-index: -1;
  img {
    width: 100vw;
    position: relative;
    z-index: -10;
  }
  &:after {
    position: absolute;
    top: 0;
    left: 0;
    content: '';
    width: 100%;
    height: 100%;
    z-index: -5;
    background: radial-gradient(
      farthest-side at 73% 21%,
      transparent,
      rgb(26, 29, 41)
    );
  }
`;

const Main = styled.main`
  article {
    width: 100%;
    padding: 56px 0 16px;
    min-height: 170px;
    img {
      height: auto;
      max-width: 25vw;
      max-height: 200px;
    }
  }
`;

const Movie = () => {
  const [opacityValue, setopacityValue] = useState(1);

  const { id } = useParams();
  const movieQueryKey = ['getMovieDetail'];
  const { isLoading, data } = useQuery(
    movieQueryKey,
    async () => {
      const data = await getDetail(id, 'movie');
      const movieImageData = await getDetail(id, 'imageMovie');
      const movieDetail = new MovieData(data);
      const movieImage = new Images(movieImageData);
      console.log('moviImages', movieImage);
      console.log('movieData', movieDetail);
      return { movieDetail, movieImage };
    },
    { cacheTime: 0 }
  );

  const { movieDetail, movieImage } = data || [];

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY >= 100 && window.scrollY < 200) {
        setopacityValue(0.73333);
      } else if (window.scrollY >= 200 && window.scrollY < 300) {
        setopacityValue(0.46667);
      } else if (window.scrollY >= 300) {
        setopacityValue(0.2);
      } else {
        setopacityValue(1);
      }
    }

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [opacityValue]);

  if (isLoading) return <div>en cours de chargement</div>;

  return (
    <Container>
      <div className="filter"></div>
      <Background style={{ opacity: opacityValue }}>
        <img
          src={`https://image.tmdb.org/t/p/w1280/${movieDetail.imageBackPath}`}
          alt={movieDetail.title}
        />
      </Background>

      <Main>
        <article>
          <img
            src={`https://image.tmdb.org/t/p/w300/${movieImage.logos[0].file_path}`}
            alt={movieDetail.title}
          />
        </article>
      </Main>
      <DataContent id={movieDetail.id} genres={movieDetail.genres} runtime={movieDetail.runtime} release={movieDetail.release} data={movieDetail} videos={movieDetail.getVideos()}/>
    </Container>
  );
};

export default Movie;
