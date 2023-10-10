import React from 'react';
import ReactPlayer from 'react-player';
import { useDispatch } from 'react-redux';
import { setVideoParams } from '../../redux/features/videoSlice';

const VideoMin = ({ id, playing, isDragging, isVisible }) => {
  const dispatch = useDispatch();

  return (
    <>
      <ReactPlayer
        url={`https://www.youtube.com/watch?v=${id}`}
        controls={true}
        width={'100%'}
        height={'100%'}
        playing={playing}
        previewTabIndex={isVisible === true ? 0 : -1}
        light={true}
        onClickPreview={() =>
          isDragging ? null : dispatch(setVideoParams(id))
        }
      />
    </>
  );
};

export default VideoMin;
