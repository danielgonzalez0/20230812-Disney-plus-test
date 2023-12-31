import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { getAllMovies } from '../../services/api';
import FilterBtn from '../../components/filterBtn/FilterBtn';
import { seriesGenres } from '../../utils/variables';
import Footer from '../../components/footer/Footer';
import AllSeriesSlide from './AllSeriesSlide';
import SpinnerFullPage from '../../components/spinner/SpinnerFullPage';

const Container = styled.main`
  min-height: calc(100vh - 270px);
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
  align-items: flex-end;
  flex-wrap: wrap;
  gap: 30px;
  h1 {
    font-size: 44px;
  }
  @media only screen and (max-width: 600px) {
    align-items: flex-start;
    h1 {
      font-size: 24px;
    }
  }
`;

const SeriesContainer = styled.section`
  position: relative;
  margin-top: 130px;
  margin-bottom: 200px;
  z-index: 0;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  align-items: center;
  transition: all 300ms ease-out 0s;
`;

const AllSeries = () => {
  const queryKey = ['getAllSeries'];
  const { isLoading, data } = useQuery(queryKey, async () => {
    return await getAllMovies(50, 'series');
    // return await getData();
  });

  const series = useMemo(() => data || [], [data]);
  const [seriesVisible, setSeriesVisible] = useState(50);
  const [serieArray, setSerieArray] = useState([]);
  const [filterValue, setFilterValue] = useState({
    id: 0,
    name: 'Toutes les séries',
  });

  const handleScroll = () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY;

    if (windowHeight + scrollTop + 200 >= documentHeight) {
      // Lorsque l'utilisateur atteint le bas de la page, chargez plus de films
      const newVisibleEnd = seriesVisible + 20; // Chargez 10 films supplémentaires
      setSeriesVisible(newVisibleEnd);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [seriesVisible]);

  useEffect(() => {
    if (filterValue.id === 0) {
      setSerieArray([...series.slice(0, seriesVisible)]);
    } else {
      setSerieArray([
        ...series
          .filter((serie) => serie.genre.includes(filterValue.id))
          .slice(0, seriesVisible),
      ]);
    }
  }, [series, seriesVisible, filterValue]);

  return (
    <>
      {isLoading && <SpinnerFullPage />}
      <Container>
        <Header>
          <h1>Séries</h1>
          <FilterBtn
            array={seriesGenres}
            filterValue={filterValue}
            setFilterValue={setFilterValue}
          />
        </Header>
        <SeriesContainer>
          {!isLoading &&
            serieArray.length > 0 &&
            serieArray.map((serie, index) => (
              <AllSeriesSlide serie={serie} key={index} />
            ))}
        </SeriesContainer>
      </Container>
      <Footer />
    </>
  );
};

export default AllSeries;
