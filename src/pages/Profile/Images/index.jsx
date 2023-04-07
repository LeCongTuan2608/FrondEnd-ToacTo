import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Image, Layout } from 'antd';
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
   useEffect(() => {
      //fetch api list images
   }, []);
   return (
      <div className={cn('images-wrap')} style={{ marginBottom: images.length > 15 ? 100 : 300 }}>
         <div>
            <Image.PreviewGroup
               preview={{
                  visible,
                  onVisibleChange: (vis) => setVisible(vis),
               }}>
               {images.map((image, key) => {
                  if (key === 3) return;
                  return <Image key={key} src={image.url} />;
               })}
            </Image.PreviewGroup>
         </div>
      </div>
   );
}

export default Images;
