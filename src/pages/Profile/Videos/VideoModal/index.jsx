import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';
import classNames from 'classnames/bind';
import styles from './VideoModal.module.scss';
const cn = classNames.bind(styles);
VideoModal.propTypes = {};

function VideoModal(props) {
   const { item } = props;
   const [isModalOpen, setIsModalOpen] = useState(false);
   const videoElement = useRef(null);
   const showModal = (e) => {
      setIsModalOpen(true);
      //   videoElement.current.play();
   };
   const handleCancel = () => {
      setIsModalOpen(false);
   };
   const handleCloseModal = () => {
      videoElement.current.pause();
   };
   return (
      <div className={cn('video-item')}>
         <video
            src={item.url}
            onClick={showModal}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
         />
         <Modal
            open={isModalOpen}
            onCancel={handleCancel}
            footer={null}
            afterClose={handleCloseModal}
            centered
            className={cn('modal-video')}
            bodyStyle={{
               height: 540,
               background: 'black',
               borderRadius: 7,
            }}>
            <video
               src={item.url}
               controls
               style={{ width: '100%', height: '100%', objectFit: 'contain' }}
               ref={videoElement}
            />
         </Modal>
      </div>
   );
}

export default VideoModal;
