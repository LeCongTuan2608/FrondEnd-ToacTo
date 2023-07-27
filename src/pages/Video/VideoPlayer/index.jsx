import React, { useContext, useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styles from './VideoPlayer.module.scss';
import classNames from 'classnames/bind';
import ReactPlayer from 'react-player';
const cn = classNames.bind(styles);
VideoPlayer.propTypes = {};

function VideoPlayer(props) {
   const { videoData } = props;
   const videoRef = useRef(null);
   const videoLayer = useRef(null);
   const handlePause = () => {
      videoLayer.current.getInternalPlayer().pause();
   };
   const handlePlay = () => {
      videoLayer.current.getInternalPlayer().play();
   };
   return (
      <div className={cn('wrapper')}>
         <ReactPlayer
            className={cn('video-layer')}
            ref={videoLayer}
            loop
            playing
            muted
            url={videoData?.url}
         />
         <ReactPlayer
            className={cn('video-control')}
            ref={videoRef}
            controls
            loop
            playing
            pip
            onPause={handlePause}
            onPlay={handlePlay}
            url={videoData?.url}
         />
      </div>
   );
}

export default VideoPlayer;
