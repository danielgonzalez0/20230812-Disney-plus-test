import React from 'react';
import ReactPlayer from 'react-player';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { deleteVideoParams } from '../../redux/features/videoSlice';

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: black;
  z-index: 4000000;
  pointer-events: visible;

  .closeBtn {
    position: absolute;
    top: 10px;
    right: 20px;
    padding: 20px;
    border-radius: 50px;
    background: black;
    color: white;
    border: solid 2px black;
    cursor: pointer;
    transition: all ease-in-out 0.1s;
    &:hover,
    &:focus-visible {
      transform: scale(1.1);
      background: #363636;
    }
    &:focus-visible {
      border: solid 2px black;
      outline: solid 2px white;
    }
  }
`;

const Video = ({ id, playing }) => {
  const dispatch = useDispatch();
  return (
    <Container>
      <button
        className="closeBtn"
        onClick={() => dispatch(deleteVideoParams())}
      >
        Retour
      </button>
      <ReactPlayer
        url={`https://www.youtube.com/watch?v=${id}`}
        className="player"
        controls={true}
        width={'100%'}
        height={'100%'}
        playing={playing}
        onEnded={() => dispatch(deleteVideoParams())}
      />
    </Container>
  );
};

export default Video;
