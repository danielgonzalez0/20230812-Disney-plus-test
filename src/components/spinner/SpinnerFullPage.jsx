import React from 'react';
import styled from 'styled-components';
import Spinner from './Spinner';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgb(26, 29, 41);
`;

const SpinnerFullPage = () => {
  return (
    <Container>
      <Spinner />
    </Container>
  );
};

export default SpinnerFullPage;
