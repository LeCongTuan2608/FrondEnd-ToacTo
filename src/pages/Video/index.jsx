import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styles from './Video.module.scss';
import classNames from 'classnames/bind';
import ReactPlayer from 'react-player';
import VideoPlayer from './VideoPlayer';
import Post from 'API/Post';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
const cn = classNames.bind(styles);

Video.propTypes = {};

function Video(props) {
   const [listVideo, setListVideo] = useState([]);
   const [current, setCurrent] = useState(0);
   const [params, setParams] = useState({ offset: 0, limit: 10 });
   const jwt = {
      type: localStorage.getItem('type'),
      token: localStorage.getItem('token'),
   };
   useEffect(() => {
      const getData = async () => {
         try {
            const res = await Post.getVideo(jwt, params);
            const results = res.data.results;
            setListVideo([...listVideo, ...results]);
         } catch (error) {
            console.log('error:', error);
         }
      };
      getData();
   }, [params]);

   const handlePre = () => {
      current !== 0 && setCurrent((pre) => pre - 1);
   };
   const handleNext = () => {
      if (current !== listVideo.length - 1) {
         setCurrent((pre) => pre + 1);
         const count = listVideo.length - (current + 1);
         if (count <= 2) {
            setParams((pre) => {
               return { ...pre, offset: listVideo.length + 1 };
            });
         }
      }
   };

   return (
      <div className={cn('wrapper')}>
         <div className={cn('container')}>
            <div className={cn('video-wrap')}>
               <div
                  className={cn('btn', 'btn-pre', current === 0 && 'btn-disable')}
                  onClick={handlePre}>
                  <span>
                     <LeftOutlined />
                  </span>
               </div>
               <VideoPlayer videoData={listVideo[current]} />
               <div
                  className={cn(
                     'btn',
                     'btn-next',
                     current === listVideo.length - 1 && 'btn-disable',
                  )}
                  onClick={handleNext}>
                  <span>
                     <RightOutlined />
                  </span>
               </div>
            </div>
         </div>
      </div>
   );
}

export default Video;
