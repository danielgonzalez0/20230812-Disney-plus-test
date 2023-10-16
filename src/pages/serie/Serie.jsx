import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useQueryClient, useQuery } from '@tanstack/react-query';
import { getDetail, getSeriesSuggestion } from '../../services/api';
import { Images } from '../../models/images';
import Footer from '../../components/footer/Footer';
import { SerieData } from '../../models/serie';
import { useDispatch, useSelector } from 'react-redux';
import { deleteVideoParams } from '../../redux/features/videoSlice';
import Video from '../../components/video/Video';
import SerieContent from '../../components/dataContent/SerieContent';
import SerieSection from '../../components/serieSection/SerieSection';
import disneyBG from '../../assets/images/background-disney.jpg';
import SpinnerFullPage from '../../components/spinner/SpinnerFullPage';

const Container = styled.main`
  margin-top: 70px;
  min-height: calc(100vh - 270px);
  padding: 0 calc(3.5vw + 24px);
  overflow: hidden;

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

const Serie = () => {
  const [opacityValue, setopacityValue] = useState(1);
  const videoIsOpen = useSelector((state) => state.video.isOpen);
  const videoId = useSelector((state) => state.video.id);
  const dispatch = useDispatch();

  //call API
  const { id } = useParams();
  const queryClient = useQueryClient();
  const queryKey = ['getSerieDetail', id];
  const { isLoading, data } = useQuery(
    queryKey,
    async () => {
      const data = await getDetail(id, 'serie');
      const serieImageData = await getDetail(id, 'imageSerie');
      const castingData = await getDetail(id, 'castingSerie');
      const serieDetail = new SerieData(data, castingData);
      const serieImage = new Images(serieImageData);

      const suggestionData = await getSeriesSuggestion(
        serieDetail.getGenresQueryParams(),
        serieDetail.getCompaniesQueryParams()
      );
      // console.log('serieImages', serieImage);
      // console.log('serieDetail', serieDetail);
      // console.log('suggestions', suggestionData);
      return { serieDetail, serieImage, suggestionData };
    },
    { cacheTime: 0 }
  );
  const { serieDetail, serieImage, suggestionData } = data || [];

  useEffect(() => {
    // Invoquez queryClient.invalidateQueries lorsque id change
    queryClient.invalidateQueries(queryKey);
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

  if (isLoading) return <SpinnerFullPage />;

  if (videoIsOpen) return <Video playing={true} id={videoId} />;

  return (
    <>
      <Container>
        <div className="filter"></div>
        <Background style={{ opacity: opacityValue }}>
          {serieDetail.imageBackPath ? (
            <img
              src={`https://image.tmdb.org/t/p/original/${serieDetail.imageBackPath}`}
              alt={serieDetail.name}
            />
          ) : (
            <img src={disneyBG} alt={'disney par défaut'} />
          )}
        </Background>
        <Main>
          <article>
            {serieImage.logos[0] ? (
              <img
                src={`https://image.tmdb.org/t/p/w300/${serieImage.logos[0].file_path}`}
                alt={serieDetail.title}
              />
            ) : (
              <span>{serieDetail.title}</span>
            )}
          </article>

          <SerieContent
            id={serieDetail.id}
            name={serieDetail.title}
            genres={serieDetail.genres}
            firstRelease={serieDetail.first_release}
            lastRelease={serieDetail.last_release}
            overview={serieDetail.overview}
            numberOfSeasons={serieDetail.number_of_seasons}
            videos={serieDetail.getVideos()}
          />
          <SerieSection serie={serieDetail} suggestions={suggestionData} />
        </Main>
      </Container>
      <Footer />
    </>
  );
};

export default Serie;
