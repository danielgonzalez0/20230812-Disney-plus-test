import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import Video from './Video';


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
    <>
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
    </>
  );
};

export default VideoMin;
