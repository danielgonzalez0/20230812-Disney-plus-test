import React, { useState } from 'react';
import styled from 'styled-components';
import db, { auth } from '../../utils/firebase';
import { signInAnonymously } from 'firebase/auth';
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

import { getAllMovies } from '../../services/api';
import { deleteContent, setContent } from '../../redux/features/contentSlice';
import SpinnerFullPage from '../../components/spinner/SpinnerFullPage';
import { doc, getDoc } from 'firebase/firestore';
import { getLikes } from '../../redux/features/likesSlice';
// import ConnexionLogin from './ConnexionLogin';

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
  p {
    margin-bottom: 15px;
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
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const getLikesList = async (name) => {
    //read data
    try {
      const userData = doc(db, 'likes', `${name}`);
      const docSnap = await getDoc(userData);
      if (docSnap.exists()) {
        dispatch(getLikes(docSnap.data().data));
      } else {
        // docSnap.data() will be undefined in this case
        console.log('No such document!');
      }
    } catch (err) {
      console.error(err);
    }
    //set likes list
  };

  const fetchdata = async () => {
    try {
      const movieData = await getAllMovies(25, 'movies');
      const serieData = await getAllMovies(25, 'series');
      const contentData = [...movieData, ...serieData];
      return contentData;
    } catch (error) {
      throw error;
    }
  };

  const users = [
    { name: 'Tony', img: user1 },
    { name: 'B-max', img: user2 },
    { name: 'Raya', img: user3 },
    { name: 'Meilin', img: user4 },
  ];


  /**
   * Gère l'authentification anonyme ou la déconnexion de l'utilisateur.
   *
   * @param {Object} profil - Les informations du profil utilisateur (nom et image).
   */
  const handleAuthAnonymous = (profil) => {
    if (!user.name) {
      signInAnonymously(auth)
        .then((res) => {
          // console.log(res);
          if (res.user.isAnonymous) {
            dispatch(
              setUserLoginDetails({
                name: profil.name,
                email: 'anonyme@gmail.com',
                photo: profil.img,
              })
            );
          }
        })
        .then(() => {

          setIsLoading(true);
          fetchdata()
            .then((contentData) => {
              dispatch(setContent(contentData));
            })
            .then(() => {
              setTimeout(() => {
                setIsLoading(false);
                getLikesList(profil.name);
                navigate('/home');
              }, 500)
            })
            .catch((err) => {
              console.log(err.message);
            });
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
      auth
        .signOut()
        .then(() => {
          dispatch(setSignOutState());
          dispatch(deleteContent());
          navigate('/');
        })
        .catch((err) => console.log(err.message));
    }
  };

  if (isLoading) return <SpinnerFullPage />;

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
    </Container>
  );
};

export default Connexion;
