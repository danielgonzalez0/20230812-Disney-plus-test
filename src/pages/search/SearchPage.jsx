import React, { useState } from 'react';
import styled from 'styled-components';
import Footer from '../../components/footer/Footer';

const Container = styled.main`
  min-height: calc(100vh);
  overflow: hidden;
  padding: 0 calc(3.5vw + 24px);
  position: relative;
  margin-top: 70px;
  padding-top: 150px;

  @media only screen and (max-width: 600px) {
    padding-top: 80px;
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

  return (
    <>
      <Form onSubmit={(e) => e.preventDefault()}>
        <input
          type="search"
          placeholder={'Titre ou personnage'}
          onChange={(e) => {
            e.preventDefault();
            setSearchValue(e.target.value);
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
      <Container>{searchValue}</Container>
      <Footer />
    </>
  );
};

export default SearchPage;
