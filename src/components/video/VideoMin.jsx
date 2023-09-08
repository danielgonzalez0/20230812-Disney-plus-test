import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import styled from 'styled-components';
import Video from './Video';

const Container = styled.div`
  cursor: pointer;
  position: relative;
  transition: transform 300ms ease-out 0s;
  background: linear-gradient(rgb(48, 50, 62), rgb(30, 31, 42));
  width: 25vw;
  min-height: 120px;
  min-width: 213px;
  max-width: 253px;
  height: calc(0.5625 * 25vw);
  border-radius: 10px;
  max-height: 143px;
  box-shadow: rgba(0, 0, 0, 0.69) 0px 26px 30px -10px,
    rgba(0, 0, 0, 0.73) 0px 16px 10px -10px;
  .react-player__preview {
    border-radius: 10px;
  }
`;



const VideoMin = ({ id, playing }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.pointerEvents = 'none';
    } else {
      document.body.style.overflow = 'auto';
      document.body.style.pointerEvents = 'auto';
    }
  }, [isOpen]);

  return (
    <Container>
      {!isOpen && (
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${id}`}
          controls={true}
          width={'100%'}
          height={'100%'}
          playing={playing}
          light={true}
          onClickPreview={() => setIsOpen(true)}
        />
      )}
      {isOpen && <Video close={setIsOpen} playing={true} id={id} />}
    </Container>
  );
};

export default VideoMin;
