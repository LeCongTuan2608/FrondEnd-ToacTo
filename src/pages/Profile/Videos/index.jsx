import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Videos.module.scss';
import videos from '../../../videos/aeccc.mp4';
import hutao from '../../../videos/hutao.mp4';
import { Button, Carousel, Image, Modal } from 'antd';
import VideoModal from './VideoModal';
const cn = classNames.bind(styles);
Videos.propTypes = {};

function Videos(props) {
   const arr = [
      { key: 1, url: videos },
      { key: 2, url: hutao },
      { key: 3, url: videos },
      { key: 4, url: hutao },
      { key: 5, url: videos },
      { key: 6, url: hutao },
   ];

   return (
      <div className={cn('videos-wrap')} style={{ paddingBottom: arr.length >= 6 ? null : 300 }}>
         <div className={cn('list-videos')}>
            {arr.map((item, index) => {
               return <VideoModal item={item} key={index} />;
            })}
         </div>
      </div>
   );
}

export default Videos;
