import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './BoxNotification.module.scss';
import { useContext, useState, useEffect } from 'react';
import { Button, Tooltip } from 'antd';
import { BellOutlined } from '@ant-design/icons';
const cn = classNames.bind(styles);
BoxNotification.propTypes = {};

function BoxNotification(props) {
   const [open, setOpen] = useState(false);
   const handleCloseModal = (e) => {
      e.stopPropagation();
   };
   const handleOutsideClick = (e) => {
      if (e.target === e.currentTarget) {
         setOpen(false);
      }
   };
   return (
      <div className={cn('wrapper')}>
         <Tooltip onClick={() => setOpen(!open)}>
            <Button shape="circle" icon={<BellOutlined />} size="large" />
         </Tooltip>
         {open && (
            <>
               <div className={cn('box-wrap')}>
                  <div className={cn('layer')} onClick={handleOutsideClick}></div>
                  <div onClick={handleCloseModal} className={cn('container')}>
                     <div>
                        <h2>Notification</h2>
                     </div>
                     <div className={cn('wrap-message')}>
                        <h3>hello anh nhas</h3>
                        <h3>hello anh nhas</h3>
                        <h3>hello anh nhas</h3>
                        <h3>hello anh nhas</h3>
                        <h3>hello anh nhas</h3>
                        <h3>hello anh nhas</h3>
                        <h3>hello anh nhas</h3>
                     </div>
                  </div>
               </div>
            </>
         )}
      </div>
   );
}

export default BoxNotification;
