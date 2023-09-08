import React from 'react';
import ReactPlayer from 'react-player';
import styled from 'styled-components';

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: black;
  z-index: 200;
  overflow-y: hidden;
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

const Video = ({ close, id, playing}) => {
  return (
    <Container>
      <button className="closeBtn" onClick={() => close(false)}>
        Retour
      </button>
      <ReactPlayer
        url={`https://www.youtube.com/watch?v=${id}`}
        className="player"
        controls={true}
        width={'100%'}
        height={'100%'}
        playing={playing}
        onEnded={() => close(false)}
      />
    </Container>
  );
};

export default Video;
