import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './BoxNotification.module.scss';
import { useContext, useState, useEffect } from 'react';
import { Badge, Button, Dropdown, Menu, Tooltip } from 'antd';
import {
   BellOutlined,
   CheckOutlined,
   DeleteOutlined,
   EllipsisOutlined,
   MoreOutlined,
} from '@ant-design/icons';
import ItemNotifi from './ItemNotifi';
import Notification from 'API/Notification';
import ItemNotifiSkeleton from './ItemNotifiSkeleton';
import socket from 'socket';
import { ThemeContext } from 'Context/ThemeContext';
const cn = classNames.bind(styles);
BoxNotification.propTypes = {};

function BoxNotification(props) {
   const { theme } = useContext(ThemeContext);
   const [open, setOpen] = useState(false);
   const [notifi, setNotifi] = useState([]);
   const [loading, setLoading] = useState(true);
   const [notifiCount, setNotifiCount] = useState(0);
   const [current, setCurrent] = useState('all');
   const btnIconRef = useRef(null);
   const jwt = {
      type: localStorage.getItem('type'),
      token: localStorage.getItem('token'),
   };
   const userName = localStorage.getItem('user_name');

   useEffect(() => {
      if (current === 'all') {
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
      }
   }, [open, current]);
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

   const handleRemoveNotifi = async (id) => {
      try {
         await Notification.deleteNotification(jwt, id);
         setNotifi((pre) => {
            return pre.filter((item) => {
               if (item.id === id && !item.checked) {
                  setNotifiCount((pre) => pre - 1);
               }
               return item.id !== id;
            });
         });
      } catch (error) {
         console.log('error:', error);
      }
   };
   const onClick = (e) => {
      setCurrent(e.key);
      if (e.key === 'unread') {
         setNotifi((pre) => {
            return pre.filter((item) => !item.checked);
         });
      }
   };
   const handleReadAll = async () => {
      try {
         await Notification.checkedAllNotification(jwt);
         setNotifiCount(0);
         setNotifi((pre) => {
            return pre.map((item) => {
               return { ...item, checked: true };
            });
         });
      } catch (error) {
         console.log('error:', error);
      }
   };
   const items = [
      {
         key: '1',
         label: (
            <div
               onClick={handleReadAll}
               style={{ display: 'flex', gap: 15, alignItems: 'center', padding: '5px 20px' }}>
               <CheckOutlined />
               Mark all as read
            </div>
         ),
      },
      {
         key: '2',
         danger: true,
         label: (
            <div style={{ display: 'flex', gap: 15, alignItems: 'center', padding: '5px 20px' }}>
               <DeleteOutlined />
               Delete all
            </div>
         ),
      },
   ];
   const option = [
      {
         label: 'All',
         key: 'all',
      },
      {
         label: 'Unread',
         key: 'unread',
      },
   ];
   return (
      <div className={cn('wrapper')}>
         <Tooltip onClick={() => setOpen(!open)}>
            <Badge count={notifiCount} size="small">
               <Button shape="circle" icon={<BellOutlined />} size="large" ref={btnIconRef} />
            </Badge>
         </Tooltip>
         {open && (
            <div className={cn('box-wrap')}>
               <div
                  onClick={handleCloseModal}
                  className={cn('container')}
                  style={{
                     background: theme === 'dark' ? '#242526' : null,
                     color: theme === 'dark' ? 'white' : null,
                  }}>
                  <div className={cn('container-header')}>
                     <div className={cn('header-title')}>
                        <div>
                           <span>
                              <h2>Notification</h2>
                           </span>
                        </div>
                        <Tooltip>
                           <Dropdown menu={{ items }} trigger={['click']}>
                              <Button shape="circle" icon={<EllipsisOutlined />} />
                           </Dropdown>
                        </Tooltip>
                     </div>
                     <div className={cn('header-option')}>
                        <Menu
                           onClick={onClick}
                           selectedKeys={[current]}
                           mode="horizontal"
                           items={option}
                           style={{
                              background: theme === 'dark' ? '#242526' : null,
                              color: theme === 'dark' ? 'white' : null,
                           }}
                        />
                     </div>
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
                                 setNotifiCount={setNotifiCount}
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
