import React, { useCallback } from 'react';
import styled from 'styled-components';
import { colors } from '../../utils/variables';
import { auth, provider } from '../../utils/firebase';
import { signInWithPopup, signInAnonymously } from 'firebase/auth';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  setSignOutState,
  setUserLoginDetails,
} from '../../redux/features/userSlice';
import user1 from './user1.png';
import user2 from './user2.png';
import user3 from './user3.png';
import user4 from './user4.png';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  width: 100vw;
  padding-top: 100px;
  padding-bottom: 20px;
  h2,
  p {
    font-size: 32px;
    letter-spacing: 0.11px;
    line-height: 1.2;
    text-align: center;
    font-weight: 700;
  }
`;

const AuthButton = styled.button`
  color: ${colors.white};
  background: ${colors.blue1};
  width: 80%;
  max-width: 360px;
  letter-spacing: 1.5px;
  margin-bottom: 12px;
  font-size: 18px;
  padding: 16.5px 0;
  border: 1px solid transparent;
  border-radius: 4px;
  margin: 30px 0;
  cursor: pointer;
  &:hover {
    background: ${colors.blue2};
  }
`;

const ProfilsDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  max-width: 750px;
  gap: 20px;
  margin: 40px 0 100px;
`;

const ProfilContainer = styled.div`
  margin: 15px;
  .profil {
    img {
      position: relative;
      min-width: 120px;
      max-width: 140px;
      height: auto;
      cursor: pointer;
      border-radius: 50%;
      border: 4px solid rgba(249, 249, 249, 0);
      &:hover {
        transform: scale(1.05);
        transition: all 250ms cubic-bezier(0.455, 0.03, 0.515, 0.955) 0s;
        border: 4px solid rgba(249, 249, 249, 0.8);
      }
    }
    h3 {
      font-size: 24px;
      letter-spacing: 0.11px;
      line-height: 1.2;
      margin: 0;
      margin-top: 1.5rem;
      text-align: center;
    }
  }
`;

const Connexion = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const users = [
    { name: 'Tony', img: user1 },
    { name: 'B-max', img: user2 },
    { name: 'Raya', img: user3 },
    { name: 'Meilin', img: user4 },
  ];

  const setUser = useCallback(
    (user) => {
      console.log(user);
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

  const handleAuthGoogle = () => {
    console.log(user.name);
    if (!user.name) {
      signInWithPopup(auth, provider)
        .then((res) => {
          setUser(res.user);
          navigate('/home');
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
      auth
        .signOut()
        .then(() => {
          dispatch(setSignOutState());
          navigate('/');
        })
        .catch((err) => console.log(err.message));
    }
  };

  const handleAuthAnonymous = (profil) => {
    if (!user.name) {
      signInAnonymously(auth)
        .then((res) => {
          console.log(res);
          if (res.user.isAnonymous) {
            dispatch(
              setUserLoginDetails({
                name: profil.name,
                email: 'anonyme@gmail.com',
                photo: profil.img,
              })
            );
            navigate('/home');
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
      auth
        .signOut()
        .then(() => {
          dispatch(setSignOutState());
          navigate('/');
        })
        .catch((err) => console.log(err.message));
    }
  };

  return (
    <Container>
      <h2>Qui est-ce ?</h2>
      <ProfilsDiv>
        {users.map((user, index) => (
          <ProfilContainer
            aria-label="profil1"
            role="button"
            tabIndex={0}
            key={index}
            onClick={() => handleAuthAnonymous(user)}
          >
            <div className="profil">
              <img src={user.img} alt={user.name} />
              <h3>{user.name}</h3>
            </div>
          </ProfilContainer>
        ))}
      </ProfilsDiv>
      <p>Non isncrit ?</p>
      <AuthButton onClick={handleAuthGoogle}>
        Se connecter avec Google
      </AuthButton>
    </Container>
  );
};

export default Connexion;
