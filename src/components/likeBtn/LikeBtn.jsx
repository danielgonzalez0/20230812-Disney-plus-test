import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled, { StyleSheetManager, css, keyframes } from 'styled-components';
import {
  addLike,
  deleteLike,
  setLikesOnFirebase,
} from '../../redux/features/likesSlice';
import { doc, updateDoc, deleteField, setDoc } from 'firebase/firestore';
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
    display: inline-block;
    font-size: 30px !important;
    width: 30px;
    height: 30px;
    position: absolute;
    top: 2px;
    left: 9px;
  }
`;

const LikeBtn = ({ id, type, name }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const likes = useSelector((state) => state.like);
  const userName = useSelector((state) => state.user.name);
  const dispatch = useDispatch();

  console.log('username', userName);

  const likesRef = doc(db, 'likes', userName);

  const setLikesOnFirebase = async (data) => {
    console.log(likes);
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
   * handle like btn animation
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

  const handleLikeClick = async () => {
    if (isLiked) {
      await handleIsUnliked();
      const uploadData = likes.filter((like) => like.id !== id);
      setLikesOnFirebase(uploadData);
      console.log(uploadData);
    } else {
      await handleIsLiked();
      const uploadData = [...likes, { id: id, type: type, name: name}];
      setLikesOnFirebase(uploadData);
      console.log(uploadData);
    }
    handleAnimation();
    // await handleFirebaseUpdate();
  };

  const handleIsLiked = async () => {
    //créer un objet
    const like = {
      id: id,
      type: type,
      name: name,
    };
    console.log(like);
    //envoyer objet dans redux
    dispatch(addLike(like));
    //mettre a jour firebase
  };

  const handleIsUnliked = async () => {
    dispatch(deleteLike(id));
  };
  // const handleFirebaseUpdate = async () => {
  //   dispatch(setLikesOnFirebase(userName));
  // };

  return (
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
