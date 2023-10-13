import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Footer from '../../components/footer/Footer';
import { useSelector } from 'react-redux';
import AllMoviesSlide from '../allMovies/AllMoviesSlide';
import AllSeriesSlide from '../allSeries/AllSeriesSlide';

const Container = styled.main`
  min-height: calc(100vh - 270px);
  overflow: hidden;
  padding: 0 calc(3.5vw + 24px);
  position: relative;
  margin-top: 70px;
  padding-top: 150px;
  padding-bottom: 50px;

  /* position: relative;
  margin-top: 120px;
  margin-bottom: 200px; */
  z-index: 0;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  align-items: center;
  align-content: flex-start;
  /* justify-content: center; */
  transition: all 300ms ease-out 0s;

  .errorMessage {
    padding-top: 72px;
    width: 100%;
    text-align: center;
    font-size: 24px;
  }

  /* @media screen and (max-width: 390px) {
    margin-top: 250px;
  } */

  @media only screen and (max-width: 600px) {
    padding-top: 80px;
    padding-bottom: 20px;
  }
`;

const Form = styled.form`
  position: fixed;
  top: 70;
  display: flex;
  width: 100%;
  height: 100px;
  left: 0px;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
  outline: none;
  text-overflow: ellipsis;
  z-index: calc(3);

  input {
    border: none;
    background: rgb(75, 78, 90);
    color: rgb(168, 169, 173);
    padding-left: calc(3.5vw + 24px);
    font-size: 44px;
    letter-spacing: 0.11px;
    line-height: 1.2;
    height: 100%;
    &:focus {
      background-color: rgb(98, 102, 118);
      border-bottom: none;
      color: rgb(249, 249, 249);
      outline: none;
    }
    width: 100%;
  }
  input::placeholder {
    color: rgb(168, 169, 173);
  }
  input:focus::placeholder {
    color: rgb(249, 249, 249);
  }

  /* clears the ‘X’ from Chrome */
  input[type='search']::-webkit-search-decoration,
  input[type='search']::-webkit-search-cancel-button,
  input[type='search']::-webkit-search-results-button,
  input[type='search']::-webkit-search-results-decoration {
    display: none;
  }

  @media only screen and (max-width: 600px) {
    height: 60px;
    input {
      font-size: 20px;
    }
  }
`;

const Button = styled.button`
  height: 60px;
  width: 40px;
  font-size: 44px;
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  color: rgb(249, 249, 249);
  cursor: pointer;

  @media only screen and (max-width: 600px) {
    font-size: 20px;
  }
`;

const SearchPage = () => {
  const [searchValue, setSearchValue] = useState('');
  const content = useSelector((state) => state.content);
  const [moviesVisibleEnd, setMovieVisible] = useState(20);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchValue(e.target.value);
  };

  // Filtrer le contenu en fonction de la valeur de recherche
  const filteredContent = content.filter(
    (item) =>
      item.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.overview.toLowerCase().includes(searchValue.toLowerCase()) 
  ).slice(0, moviesVisibleEnd);

   const handleScroll = () => {
     const windowHeight = window.innerHeight;
     const documentHeight = document.documentElement.scrollHeight;
     const scrollTop = window.scrollY;

     if (windowHeight + scrollTop + 200 >= documentHeight) {
       // Lorsque l'utilisateur atteint le bas de la page, chargez plus de films
       const newVisibleEnd = moviesVisibleEnd + 20; // Chargez 10 films supplémentaires
       setMovieVisible(newVisibleEnd);
     }
   };

   useEffect(() => {
     window.addEventListener('scroll', handleScroll);

     return () => {
       window.removeEventListener('scroll', handleScroll);
     };
   }, [moviesVisibleEnd]);

  return (
    <>
      <Form onSubmit={(e) => e.preventDefault()}>
        <input
          type="search"
          placeholder={'Titre ou personnage'}
          onChange={(e) => {
            handleSearch(e);
          }}
          value={searchValue}
        ></input>
        {searchValue.length > 1 && (
          <Button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setSearchValue('');
            }}
          >
            X
          </Button>
        )}
      </Form>
      <Container>
        {searchValue.length > 2 && filteredContent.length === 0 && (
          <p className="errorMessage">{`Aucun résultat pour "${searchValue}"`}</p>
        )}
        {searchValue.length > 2 &&
          filteredContent.map((item, index) => {
            return item.type === 'movies' ? (
              <AllMoviesSlide key={index} movie={item} />
            ) : (
              <AllSeriesSlide key={index} serie={item} />
            );
          })}
      </Container>
      <Footer />
    </>
  );
};

export default SearchPage;
