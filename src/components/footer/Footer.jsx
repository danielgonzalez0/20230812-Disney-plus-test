import React from 'react';
import styled from 'styled-components';
import disneyLogo from '../../assets/images/disneyLogo.svg';
import { NavLink } from 'react-router-dom';

const FooterContainer = styled.footer`
  margin-top: 100px;
  width: 100vw;
  background-color: #0e0b14;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Logo = styled(NavLink)`
  padding: 0;
  width: 80px;
  margin-top: 4px;
  max-height: 70px;
  font-size: 0;
  display: inline-block;
  img {
    display: block;
    width: 100%;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <Logo to="/">
        <img src={disneyLogo} alt="Disney plus" />
      </Logo>
    </FooterContainer>
  );
};

export default Footer;
