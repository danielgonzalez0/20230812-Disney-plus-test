import React from 'react';
import styled from 'styled-components';
import backgroundDesk from './background-desk.jpg';
import backgroundTab from './background-tab.jpg';
import backgroundMob from './background-mob.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import {colors} from "../../utils/variables"
import { useNavigate } from 'react-router-dom';

//   @media only screen and (min-width: 769px) and (max-width: 1024px) {

//   }

// @media only screen and (max-width: 768px){}

const SignUp = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <Content>
        <CTA>
          <Title>
            Nouvelles productions originales, grands films, séries
            incontournables et encore + en streaming
          </Title>
          <H4>Sans coût additionnel. Sans engagement.*</H4>
          <SignUpBtn onClick={()=> navigate("/login")}>S'INSCRIRE</SignUpBtn>
          <Promo>
            Profitez de 12 mois au prix de 10 avec un abonnement annuel.
            Économies par rapport à un an d'abonnement mensuel.
          </Promo>
          <Span>
            * La résiliation prend effet à la fin de la période d’abonnement en
            cours. Abonnement requis.
          </Span>
          <BtnChevron>
            <StyledIcon icon={faChevronDown} />
          </BtnChevron>
        </CTA>
        <BgImage />
      </Content>
    </Container>
  );
};

//style component
const Container = styled.section`
  background: #040714;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  text-align: center;
  min-height: 100vh;
  @media only screen and (min-width: 769px) and (max-width: 1024px) {
    min-height: 70vh;
  }
  /* @media only screen and (max-width: 768px) {
    max-height: 70vh;
  } */
`;

const Content = styled.div`
  width: 100%;
  padding-top: 22vw;
  position: relative;
  z-index: 2;
  min-height: 100vh;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;

  @media only screen and (min-width: 769px) and (max-width: 1024px) {
    min-height: 70vh;
    padding-top: 26vw;
  }
`;

const BgImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  background-position: top;
  background-repeat: no-repeat;
  background-size: 100%;

  @media only screen and (min-width: 1025px) {
    background-image: url(${backgroundDesk});
  }
  @media only screen and (min-width: 769px) and (max-width: 1024px) {
    background-image: url(${backgroundTab});
  }
  @media only screen and (max-width: 768px) {
    background-image: url(${backgroundMob});
  }
`;

const CTA = styled.div`
  width: 70%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  @media only screen and (max-width: 500px) {
    max-width: 360px;
    width: 100%;
  }
`;

const SignUpBtn = styled.button`
  color: ${colors.white};
  background: ${colors.blue1};
  width: 100%;
  max-width: 360px;
  letter-spacing: 1.5px;
  margin-bottom: 12px;
  font-size: 18px;
  padding: 16.5px 0;
  border: 1px solid transparent;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background: ${colors.blue2};
  }
`;

const Title = styled.h1`
  margin: 0 0 24px;
  font-weight: 700px;
  font-size: 44px;
  line-height: 54px;

  @media only screen and (min-width: 769px) and (max-width: 1024px) {
    font-size: 32px;
    line-height: 42px;
  }

  @media only screen and (max-width: 768px) {
    font-size: 26px;
    line-height: 36px;
  }
`;

const H4 = styled.h4`
  margin: 0 0 24px;
  font-size: 24px;
  line-height: 34px;
  font-weight: 400;
  color: ${colors.white};

  @media only screen and (max-width: 768px) {
    font-size: 16px;
    line-height: 26px;
  }
`;
const Promo = styled.p`
  margin: 24px 0 24px;
  font-size: 20px;
  line-height: 30px;
  font-weight: 400;
  color: ${colors.silver};

  @media only screen and (max-width: 768px) {
    font-size: 18px;
    line-height: 28px;
  }
`;
const Span = styled.span`
  margin: 0 0 24px;
  font-size: 12px;
  line-height: 16px;
  font-weight: 400;
  color: ${colors.silver};

  @media only screen and (max-width: 768px) {
    font-size: 11px;
    line-height: 15px;
  }
`;

const BtnChevron = styled.button`
  padding: 5px;
  background: transparent;
  outline: none;
  border: none;
  padding-top: 24px;
`;

const StyledIcon = styled(FontAwesomeIcon)`
  font-size: 24px;
  color: ${colors.silver};
`;
export default SignUp;
