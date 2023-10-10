import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import { colors } from '../../utils/variables';

// Créez une animation réutilisable avec keyframes
const slideInTop = keyframes`
0% {
    -webkit-transform: translateY(-30px);
            transform: translateY(-30px);
    opacity: 0;
    max-height: 0;
  }
  100% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
    opacity: 1;
     max-height: 500px;
  }
`;
const slideOutTop = keyframes`
0% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
    opacity: 1;
       max-height: 360px;
}
50%{
    -webkit-transform: translateY(-30px);
            transform: translateY(-30px);
             max-height: 360px;
}
  100% {
    opacity: 0;
    max-height: 0;
  }
`;

const Container = styled.div`
  ${({ isActive }) =>
    isActive &&
    css`
      animation: ${slideInTop} 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
    `}
  ${({ isActive }) =>
    !isActive &&
    css`
      animation: ${slideOutTop} 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94)
        forwards;
    `}

  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 15px;
  /* transition: transform 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 150ms; */
  input,
  button {
    color: #f9f9f9;
    /* background: #0063e5; */
    width: 80%;
    max-width: 360px;
    letter-spacing: 1.5px;
    margin-bottom: 12px;
    font-size: 18px;
    padding: 16.5px 0;
    border: 1px solid transparent;
    border-radius: 4px;
    margin: 15px 0;
    cursor: pointer;
  }

  input {
    background: rgb(26, 29, 41);
    border: 1px solid #f9f9f9;
    padding-left: calc(3.5vw + 24px);
  }

  button {
    color: ${colors.white};
    background: ${colors.blue1};
    &:hover {
      background: ${colors.blue2};
    }
  }
`;

const ConnexionSign = () => {
  return (
    <Container isActive={isLogin}>
      <input placeholder="Email" />
      <input placeholder="Mot de passe" />
      <button onClick={() => setIsLogin(false)}>Se connecter</button>
    </Container>
  );
};

export default ConnexionSign;
