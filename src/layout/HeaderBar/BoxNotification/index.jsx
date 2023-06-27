import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './BoxNotification.module.scss';
import { useContext, useState, useEffect } from 'react';
import { Badge, Button, Tooltip } from 'antd';
import { BellOutlined } from '@ant-design/icons';
import ItemNotifi from './ItemNotifi';
import Notification from 'API/Notification';
import ItemNotifiSkeleton from './ItemNotifiSkeleton';
import socket from 'socket';
const cn = classNames.bind(styles);
BoxNotification.propTypes = {};

function BoxNotification(props) {
   const [open, setOpen] = useState(false);
   const [notifi, setNotifi] = useState([]);
   const [loading, setLoading] = useState(true);
   const [notifiCount, setNotifiCount] = useState(0);
   const btnIconRef = useRef(null);
   const jwt = {
      type: localStorage.getItem('type'),
      token: localStorage.getItem('token'),
   };
   const userName = localStorage.getItem('user_name');

   useEffect(() => {
      const getNotifi = async () => {
         try {
            setLoading(true);
            const res = await Notification.getNotification(jwt);
            const results = res.data.results;
            const count = res.data.notificationCount;
            setNotifiCount(count);
            setNotifi(results);
            setTimeout(() => {
               setLoading(false);
            }, 500);
         } catch (error) {
            console.log('error:', error);
         }
      };
      getNotifi();
   }, [open]);
   useEffect(() => {
      socket.on('getNotification', (data) => {
         const { sender, receiver } = data;
         if (receiver === userName) {
            setNotifiCount((pre) => pre + 1);
         }
      });
   }, []);
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

   const handleRemoveNotifi = (id) => {
      setNotifi((pre) => {
         return pre.filter((item) => item.id !== id);
      });
   };

   return (
      <div className={cn('wrapper')}>
         <Tooltip onClick={() => setOpen(!open)}>
            <Badge count={notifiCount} size="small">
               <Button shape="circle" icon={<BellOutlined />} size="large" ref={btnIconRef} />
            </Badge>
         </Tooltip>
         {open && (
            <div className={cn('box-wrap')}>
               <div onClick={handleCloseModal} className={cn('container')}>
                  <div>
                     <h2>Notification</h2>
                  </div>
                  <div className={cn('wrap-notifi')}>
                     {loading ? (
                        <>
                           <ItemNotifiSkeleton />
                           <ItemNotifiSkeleton />
                           <ItemNotifiSkeleton />
                           <ItemNotifiSkeleton />
                           <ItemNotifiSkeleton />
                        </>
                     ) : (
                        notifi.map((item) => {
                           return (
                              <ItemNotifi
                                 key={item.id}
                                 data={item}
                                 handleRemoveNotifi={handleRemoveNotifi}
                              />
                           );
                        })
                     )}
                  </div>
               </div>
            </div>
         )}
      </div>
   );
}

export default BoxNotification;
