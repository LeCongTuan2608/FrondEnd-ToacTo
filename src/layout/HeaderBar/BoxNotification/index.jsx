import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './BoxNotification.module.scss';
import { useContext, useState, useEffect } from 'react';
import { Button, Tooltip } from 'antd';
import { BellOutlined } from '@ant-design/icons';
import ItemNotifi from './ItemNotifi';
const cn = classNames.bind(styles);
BoxNotification.propTypes = {};

function BoxNotification(props) {
   const [open, setOpen] = useState(false);
   const btnIconRef = useRef(null);
   // handle when click outside
   useEffect(() => {
      const handleClickOutsideTab = (e) => {
         const target = e.target;
         if (target.closest('.box-wrap') === null && !btnIconRef.current.contains(target)) {
            setOpen(false);
         }
      };
      document.addEventListener('click', handleClickOutsideTab);
      return () => {
         document.removeEventListener('click', handleClickOutsideTab);
      };
   }, []);
   const handleCloseModal = (e) => {
      e.stopPropagation();
   };
   return (
      <div className={cn('wrapper')}>
         <Tooltip onClick={() => setOpen(!open)}>
            <Button shape="circle" icon={<BellOutlined />} size="large" ref={btnIconRef} />
         </Tooltip>
         {open && (
            <div className={cn('box-wrap')}>
               <div onClick={handleCloseModal} className={cn('container')}>
                  <div>
                     <h2>Notification</h2>
                  </div>
                  <div className={cn('wrap-notifi')}>
                     <ItemNotifi />
                     <ItemNotifi />
                     <ItemNotifi />
                     <ItemNotifi />
                     <ItemNotifi />
                     <ItemNotifi />
                     <ItemNotifi />
                     <ItemNotifi />
                     <ItemNotifi />
                     <ItemNotifi />
                  </div>
               </div>
            </div>
         )}
      </div>
   );
}

export default BoxNotification;
