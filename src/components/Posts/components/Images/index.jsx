import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Image } from 'antd';
import classNames from 'classnames/bind';
import styles from './Images.module.scss';
const cn = classNames.bind(styles);
Images.propTypes = {};

function Images(props) {
   const { images } = props;
   const [visible, setVisible] = useState(false);
   const [current, setCurrent] = useState(0);
   return (
      <div
         className={cn('images-wrap')}
         style={
            images?.length === 1
               ? { gridTemplateRows: 'unset', gridTemplateColumns: 'unset' }
               : null
         }>
         {images.length === 1 ? (
            <div style={{ position: 'relative' }}>
               <Image preview={false} key={images[0]?.id} src={images[0]?.url} height={'100%'} />
            </div>
         ) : (
            images?.map((image, index) => {
               if (index === 3) return;
               if (index === 2) {
                  return (
                     <div style={{ position: 'relative' }}>
                        <Image preview={false} key={image.id} src={image.url} height={'100%'} />
                        <div
                           onClick={() => {
                              setVisible(true);
                              setCurrent(index);
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
                     key={image.id}
                     src={image.url}
                     onClick={() => {
                        setVisible(true);
                        setCurrent(index);
                     }}
                  />
               );
            })
         )}
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
               {images?.map((image, key) => {
                  return <Image src={image.url} key={image.id} />;
               })}
            </Image.PreviewGroup>
         </div>
      </div>
   );
}

export default Images;
