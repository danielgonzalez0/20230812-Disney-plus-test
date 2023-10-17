import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled, { StyleSheetManager, css, keyframes } from 'styled-components';
import { addLike, deleteLike } from '../../redux/features/likesSlice';
import { doc, setDoc } from 'firebase/firestore';
import db from '../../utils/firebase';

const rotateAnimation = keyframes`
 0% {
    -webkit-transform: rotate(-360deg);
            transform: rotate(-360deg);
    
  }
  100% {
    -webkit-transform: rotate(0);
            transform: rotate(0);
   
  }
`;

const Container = styled.button.attrs((props) => ({
  as: 'button',
}))`
  cursor: pointer;
  position: relative;
  width: 50px;
  height: 50px;
  border-radius: 50px;
  background: #00000099;
  color: ${(props) => (props.isliked === 'true' ? '#0063e5' : '#f9f9f9')};
  border: 2px solid #f9f9f9;
  transform-origin: center;
  animation: ${({ isrotating }) =>
    isrotating === 'true'
      ? css`
          ${rotateAnimation} 0.2s ease-in-out
        `
      : 'none'};
  &:hover,
  &:focus-visible {
    background: #f9f9f9;
    border: 2px solid #f9f9f9;
    color: ${(props) => (props.isliked === 'true' ? '#0063e5' : 'black')};
  }
  span {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 30px !important;
    width: 30px;
    height: 30px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    /* top: 2px;
    left: 8px; */
  }

  @media screen and (max-width: 700px) {
    width: 30px;
    height: 30px;
    span {
      font-size: 20px !important;
    }
  }
`;

const LikeBtn = ({ id, type, name }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const likes = useSelector((state) => state.like);
  const userName = useSelector((state) => state.user.name);
  const dispatch = useDispatch();

  const likesRef = doc(db, 'likes', userName);

  /**
   * Met à jour les "likes" dans la base de données Firebase.
   *
   * Cette fonction envoie les données fournies à la référence Firestore spécifiée.
   *
   * @async
   * @function
   * @param {Array} data - Les données des "likes" à envoyer à Firebase.
   * @returns {void}
   */
  const setLikesOnFirebase = async (data) => {
    await setDoc(likesRef, {
      data: data,
    });
  };

  useEffect(() => {
    const check = checkIsInLikeList();
    if (check) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, []);

  /**
   * Vérifie si un élément avec l'ID spécifié existe dans la liste de likes.
   * @param {number} id - L'ID de l'élément à vérifier.
   * @param {Array<Object>} likes - Le tableau des éléments aimés.
   * @returns {boolean} - True si l'élément est trouvé dans la liste de likes, sinon false.
   */
  const checkIsInLikeList = () => {
    if (likes.filter((like) => like.id === id).length > 0) {
      return true;
    } else {
      return false;
    }
  };

  /**
   * Gère l'animation de rotation du bouton "J'aime".
   *
   * Cette fonction anime le bouton "J'aime" en le faisant tourner, puis met à jour l'état "isLiked" et réinitialise l'animation.
   *
   * @function
   * @returns {void}
   */
  const handleAnimation = () => {
    if (!isRotating) {
      setIsRotating(true);
      setTimeout(() => {
        setIsLiked(!isLiked);
        setIsRotating(false);
      }, 200); // Durée de l'animation de rotation
    }
  };

  /**
   * Gère le clic sur le bouton "J'aime" d'un élément.
   *
   * Cette fonction gère l'ajout ou la suppression d'un "like" pour un élément, met à jour les données dans Firebase, et déclenche une animation.
   *
   * @async
   * @function
   * @returns {void}
   */
  const handleLikeClick = async () => {
    if (isLiked) {
      await handleIsUnliked();
      const uploadData = likes.filter((like) => like.id !== id);
      setLikesOnFirebase(uploadData);
    } else {
      await handleIsLiked();
      const uploadData = [...likes, { id: id, type: type, name: name }];
      setLikesOnFirebase(uploadData);
    }
    handleAnimation();
  };

  /**
   * Gère l'ajout d'un "like" pour un élément donné.
   *
   * Cette fonction crée un objet "like" contenant des informations spécifiques, l'envoie dans Redux à l'aide de `dispatch`
   *
   * @async
   * @function
   * @returns {void}
   */
  const handleIsLiked = async () => {
    //créer un objet
    const like = {
      id: id,
      type: type,
      name: name,
    };

    //envoyer objet dans redux
    dispatch(addLike(like));
  };

  /**
   * Gère la suppression d'un "like" pour un élément donné.
   *
   * @async
   * @function
   * @returns {void}
   */
  const handleIsUnliked = async () => {
    dispatch(deleteLike(id));
  };

  return (
    //permet de filtrer les props utilisés pour le style
    //évite les erreurs liées au fait que react ne reconnait pas les props
    <StyleSheetManager
      shouldForwardProp={(prop) => prop !== 'isliked' && prop !== 'isrotating'}
    >
      <Container
        isrotating={isRotating.toString()}
        isliked={isLiked.toString()}
        onClick={() => handleLikeClick()}
      >
        <span>{isLiked ? '✓' : '+'}</span>
      </Container>
    </StyleSheetManager>
  );
};

export default LikeBtn;
