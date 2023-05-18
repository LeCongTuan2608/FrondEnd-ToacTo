import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Image } from 'antd';
import classNames from 'classnames/bind';
import styles from './Images.module.scss';
const cn = classNames.bind(styles);
Images.propTypes = {};
const images = [
   {
      id: 1,
      url: 'https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp',
   },
   {
      id: 2,
      url: 'https://gw.alipayobjects.com/zos/antfincdn/x43I27A55%26/photo-1438109491414-7198515b166b.webp',
   },
   {
      id: 3,
      url: 'https://gw.alipayobjects.com/zos/antfincdn/cV16ZqzMjW/photo-1473091540282-9b846e7965e3.webp',
   },
   {
      id: 4,
      url: 'https://gw.alipayobjects.com/zos/antfincdn/x43I27A55%26/photo-1438109491414-7198515b166b.webp',
   },
];
function Images(props) {
   const [visible, setVisible] = useState(false);
   const [current, setCurrent] = useState(0);
   return (
      <div className={cn('images-wrap')}>
         {images.map((image, key) => {
            if (key === 3) return;
            if (key === images.length - 2) {
               return (
                  <div style={{ position: 'relative' }}>
                     <Image preview={false} key={key} src={image.url} height={'100%'} />
                     <div
                        onClick={() => {
                           setVisible(true);
                           setCurrent(key);
                        }}
                        className={cn('image-overlay')}>
                        +{images.length - 3}
                     </div>
                  </div>
               );
            }
            return (
               <Image
                  preview={false}
                  key={key}
                  src={image.url}
                  onClick={() => {
                     setVisible(true);
                     setCurrent(key);
                  }}
               />
            );
         })}
         <div
            style={{
               display: 'none',
            }}>
            <Image.PreviewGroup
               preview={{
                  visible,
                  onVisibleChange: (vis) => setVisible(vis),
                  current: current,
               }}>
               {images.map((image, key) => {
                  return <Image src={image.url} key={key} />;
               })}
            </Image.PreviewGroup>
         </div>
      </div>
   );
}

export default Images;
