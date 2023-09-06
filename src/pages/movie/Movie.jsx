import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { getDetail } from '../../services/api';

const Container = styled.main`
  margin-top: 70px;
  min-height: 150vh;
  padding: 0 calc(3.5vw + 24px);
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
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.4) 0%,
      rgba(0, 0, 0, 0.2) 100%
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
      const movieDetail = await getDetail(id, 'movie');
      return { movieDetail };
    },
    { cacheTime: 0 }
  );

  const { movieDetail } = data || [];

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
      <Background style={{ opacity: opacityValue }}>
        <img
          src={`https://image.tmdb.org/t/p/original/${movieDetail.backdrop_path}`}
          alt={movieDetail.title}
        />
      </Background>

      <Main>
        {/* <article>
          <img
            src={`https://image.tmdb.org/t/p/w500/${
              logo.length > 0
                ? logo[0].file_path
                : movieImages.logos[0].file_path
            }`}
            alt={movieDetail.title}
          />
        </article> */}
      </Main>
    </Container>
  );
};

export default Movie;
