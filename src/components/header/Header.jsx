import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { colors } from '../../utils/variables';
import disneyLogo from '../../assets/images/disneyLogo.svg';
import homeIcon from './home-icon.svg';
import movieIcon from './movie-icon.svg';
import originalIcon from './original-icon.svg';
import searchIcon from './search-icon.svg';
import seriesIcon from './series-icon.svg';
import watchListIcon from './watchlist-icon.svg';
import dotsIcon from './three_dots_vertical_icon.png'
import { auth } from '../../utils/firebase';

import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { setSignOutState } from '../../redux/features/userSlice';

const Nav = styled.nav`
  .wrapper {
    transition: all 300ms ease 0s;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 70px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 36px;
    letter-spacing: 16px;
    z-index: 3;
  }

  .hidden {
    /* background: transparent; */
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 0.03) 15%,
      rgba(0, 0, 0, 0.125) 30%,
      rgba(0, 0, 0, 0.25) 46%,
      rgba(0, 0, 0, 0.4) 61%,
      rgba(0, 0, 0, 0.553) 75%,
      rgba(0, 0, 0, 0.694) 88%,
      rgba(0, 0, 0, 0.8)
    );
  }
  .show {
    background: ${colors.headerColor};
  }
`;

const Logo = styled(NavLink)`
  padding: 0;
  width: 80px;
  margin-top: 4px;
  max-height: 70px;
  font-size: 0;
  display: inline-block;
  z-index: 5;
  img {
    display: block;
    width: 100%;
  }
`;

const NavMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-flow: row nowrap;
  height: 100%;
  padding: 0;
  position: relative;
  margin-right: auto;
  margin-left: 25px;
  z-index: 5;

  a {
    display: flex;
    align-items: center;
    padding: 0 12px;
    img {
      height: 20px;
      min-width: 20px;
      width: 20px;
      z-index: auto;
    }
    span {
      color: rgb(249, 249, 249);
      font-size: 13px;
      letter-spacing: 1.42px;
      line-height: 1.08;
      padding: 2px 0;
      margin-left: 8px;
      white-space: nowrap;
      position: relative;
      &:before {
        content: '';
        background: rgb(249, 249, 249);
        border-radius: 0 0 4px 4px;
        bottom: -6px;
        right: 0;
        left: 0;
        height: 2px;
        opacity: 0;
        position: absolute;
        transform-origin: left center;
        transform: scaleX(0);
        transition: all 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
        visibility: hidden;
        width: auto;
      }
    }

    &:hover {
      span:before {
        transform: scaleX(1);
        visibility: visible;
        opacity: 1 !important;
      }
    }
  }

  @media screen and (max-width: 1024px) {
    a {
      padding: 0 6px;
      span {
        display: none;
      }
      .imgContainer {
        position: relative;
        display: inline-block;
        &:after {
          content: '';
          background: rgb(249, 249, 249);
          border-radius: 0 0 4px 4px;
          bottom: -6px;
          left: 0;
          height: 2px;
          opacity: 0;
          position: absolute;
          transform-origin: left center;
          transform: scaleX(0);
          transition: all 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
          visibility: hidden;
          width: 100%;
        }
      }
      &:hover {
        .imgContainer:after {
          transform: scaleX(1);
          visibility: visible;
          opacity: 1 !important;
        }
      }
    }
  }
`;

const Login = styled.a`
  background: ${colors.dark};
  padding: 8px 16px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border: 1px solid ${colors.white};
  border-radius: 4px;
  transition: all 0.2s ease 0s;
  z-index: 5;

  &:hover {
    background-color: ${colors.white};
    color: #000;
    border-color: transparent;
  }
`;

const UserImg = styled.img`
  height: 100%;
`;

const DropDown = styled.div`
  position: absolute;
  z-index: 5;
  top: 48px;
  right: 0;
  background: rgb(19, 19, 19);
  border: 1px solid rgba(151, 151, 151, 0.34);
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.5) 0 0 18px 0;
  padding: 10px;
  font-size: 10px;
  letter-spacing: 2px;
  width: 140px;
  text-align: center;
  opacity: 0;
`;

const SignOut = styled.div`
  position: relative;
  z-index: 5;
  height: 48px;
  width: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  ${UserImg} {
    border-radius: 50%;
    width: 100%;
    height: 100%;
  }

  &:hover {
    ${DropDown} {
      opacity: 1;
      transition: opacity 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) 250ms;
    }
  }
`;

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const location = useLocation();
  const [scrolling, setScrolling] = useState(false);

  const logout = () => {
    auth
      .signOut()
      .then(() => {
        dispatch(setSignOutState());
        navigate('/');
      })
      .catch((err) => console.log(err.message));
  };

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 0) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    }

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolling]);

  return (
    <Nav id="navbar">
      <div className={scrolling ? 'wrapper show' : 'wrapper hidden'}>
        <Logo to="/">
          <img src={disneyLogo} alt="Disney plus" />
        </Logo>
        {!user.name ? (
          location.pathname === '/login' ? null : (
            <Login onClick={() => navigate('/login')}>S'IDENTIFIER</Login>
          )
        ) : (
          <>
            <NavMenu>
              <NavLink to="/home">
                <div className="imgContainer">
                  <img src={homeIcon} alt="accueil" />
                </div>
                <span>ACCUEIL</span>
              </NavLink>
              <NavLink to="/home">
                <div className="imgContainer">
                  <img src={searchIcon} alt="recherche" />
                </div>
                <span>RECHERCHE</span>
              </NavLink>
              <NavLink to="/home">
                <div className="imgContainer">
                  <img src={watchListIcon} alt="ma liste" />
                </div>
                <span>MA LISTE</span>
              </NavLink>
              <NavLink to="/home">
                <div className="imgContainer">
                  <img src={originalIcon} alt="originals" />
                </div>
                <span>ORIGINALS</span>
              </NavLink>
              <NavLink to="/movies">
                <div className="imgContainer">
                  <img src={movieIcon} alt="film" />
                </div>
                <span>FILM</span>
              </NavLink>
              <NavLink to="/series">
                <div className="imgContainer">
                  <img src={seriesIcon} alt="séries" />
                </div>
                <span>SÉRIES</span>
              </NavLink>
            </NavMenu>
            <SignOut>
              <UserImg src={user.photo} alt={user.name} />
              <DropDown>
                <span onClick={logout}>SE DÉCONNECTER</span>
              </DropDown>
            </SignOut>
          </>
        )}
      </div>
    </Nav>
  );
};

export default Header;
