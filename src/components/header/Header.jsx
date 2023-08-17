import React, { useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { colors } from '../../utils/variables';
import disneyLogo from '../../assets/images/disneyLogo.svg';
import homeIcon from './home-icon.svg';
import movieIcon from './movie-icon.svg';
import originalIcon from './original-icon.svg';
import searchIcon from './search-icon.svg';
import seriesIcon from './series-icon.svg';
import watchListIcon from './watchlist-icon.svg';
import { auth, provider } from '../../utils/firebase';
import { signInWithPopup } from 'firebase/auth';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSignOutState, setUserLoginDetails } from '../../redux/features/userSlice';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const setUser = useCallback(
    (user) => {
      dispatch(
        setUserLoginDetails({
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
        })
      );
    },
    [dispatch]
  );

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        navigate('/home');
      }
    });
  }, [user.name, navigate, setUser]);

  const handleAuth = () => {
    if (!user.name) {
      signInWithPopup(auth, provider)
        .then((res) => {
          setUser(res.user);
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
      auth.signOut().then(()=>{
        dispatch(setSignOutState())
           navigate('/');
      }).catch((err)=>console.log(err.message))
    }
  };

  return (
    <Nav>
      <Logo>
        <img src={disneyLogo} alt="Disney plus" />
      </Logo>
      {!user.name ? (
        <Login onClick={handleAuth}>S'IDENTIFIER</Login>
      ) : (
        <>
          <NavMenu>
            <a href="/home">
              <img src={homeIcon} alt="accueil" />
              <span>ACCUEIL</span>
            </a>
            <a href="/home">
              <img src={searchIcon} alt="recherche" />
              <span>RECHERCHE</span>
            </a>
            <a href="/home">
              <img src={watchListIcon} alt="ma liste" />
              <span>MA LISTE</span>
            </a>
            <a href="/home">
              <img src={originalIcon} alt="originals" />
              <span>ORIGINALS</span>
            </a>
            <a href="/home">
              <img src={movieIcon} alt="film" />
              <span>FILM</span>
            </a>
            <a href="/home">
              <img src={seriesIcon} alt="séries" />
              <span>SÉRIES</span>
            </a>
          </NavMenu>
          <SignOut>
            <UserImg src={user.photo} alt={user.name} />
            <DropDown>
              <span onClick={handleAuth}>SE DÉCONNECTER</span>
            </DropDown>
          </SignOut>
        </>
      )}
    </Nav>
  );
};

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background: ${colors.headerColor};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
  letter-spacing: 16px;
  z-index: 3;
`;

const Logo = styled.a`
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
    display: none;
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
export default Header;
