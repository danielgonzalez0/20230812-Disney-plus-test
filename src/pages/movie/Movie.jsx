import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getDetail, getMoviesSuggestion } from '../../services/api';
import { Images } from '../../models/images';
import DataContent from '../../components/dataContent/DataContent';
import { MovieData } from '../../models/movie';
import Video from '../../components/video/Video';
import { useDispatch, useSelector } from 'react-redux';
import { deleteVideoParams } from '../../redux/features/videoSlice';
import MovieSection from '../../components/movieSection/MovieSection';
import Footer from '../../components/footer/Footer';
import disneyBG from '../../assets/images/background-disney.jpg';

const Container = styled.main`
  margin-top: 70px;
  min-height: 100vh;
  padding: 0 calc(3.5vw + 24px);
  overflow-x: visible;

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

const Main = styled.section`
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
  const videoIsOpen = useSelector((state) => state.video.isOpen);
  const videoId = useSelector((state) => state.video.id);
  const dispatch = useDispatch();

  //call API

  const { id } = useParams();
  const queryClient = useQueryClient();
  const movieQueryKey = ['getMovieDetail', id];
  const { isLoading, data } = useQuery(
    movieQueryKey,
    async () => {
      const data = await getDetail(id, 'movie');
      const movieImageData = await getDetail(id, 'imageMovie');
      const castingData = await getDetail(id, 'casting');
      const movieDetail = new MovieData(data, castingData);
      const movieImage = new Images(movieImageData);
      const suggestionData = await getMoviesSuggestion(
        movieDetail.getGenresQueryParams(),
        movieDetail.getCompaniesQueryParams()
      );
      console.log('moviImages', movieImage);
      console.log('movieData', movieDetail);
      console.log('suggestions', suggestionData);
      return { movieDetail, movieImage, suggestionData };
    },
    { cacheTime: 0 }
  );

  const { movieDetail, movieImage, suggestionData } = data || [];

  useEffect(() => {
    // Invoquez queryClient.invalidateQueries lorsque id change
    queryClient.invalidateQueries(movieQueryKey);
  }, [id]);

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
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [opacityValue]);

  useEffect(() => {
    if (videoIsOpen) {
      document.body.style.overflowY = 'hidden';
      document.body.style.pointerEvents = 'none';
    } else {
      document.body.style.overflowY = 'auto';
      document.body.style.pointerEvents = 'auto';
    }
    window.addEventListener('popstate', () => {
      dispatch(deleteVideoParams());
      document.body.style.overflowY = 'auto';
      document.body.style.pointerEvents = 'auto';
    });
    return () => {
      window.removeEventListener('popstate', () =>
        dispatch(deleteVideoParams())
      );
    };
  }, [videoIsOpen, dispatch]);

  if (isLoading) return <div>en cours de chargement</div>;

  if (videoIsOpen) return <Video playing={true} id={videoId} />;

  return (
    <>
      <Container>
        <div className="filter"></div>
        <Background style={{ opacity: opacityValue }}>
       
          {movieDetail.imageBackPath ? (
            <img
              src={`https://image.tmdb.org/t/p/original/${movieDetail.imageBackPath}`}
              alt={movieDetail.title}
            />
          ) : (
            <img src={disneyBG} alt={'disney par défaut'} />
          )}
        </Background>

        <Main>
          <article>
            {movieImage.logos[0] ? (
              <img
                src={`https://image.tmdb.org/t/p/w300/${movieImage.logos[0].file_path}`}
                alt={movieDetail.title}
              />
            ) : (
              <span>{movieDetail.title}</span>
            )}
          </article>
          <DataContent
            id={movieDetail.id}
            genres={movieDetail.genres}
            runtime={movieDetail.runtime}
            release={movieDetail.release}
            title={movieDetail.title}
            tagline={movieDetail.tagline}
            videos={movieDetail.getVideos()}
          />
          <MovieSection movie={movieDetail} suggestions={suggestionData} />
        </Main>
      </Container>
      <Footer />
    </>
  );
};

export default Movie;
