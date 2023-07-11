import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './ItemNotifi.module.scss';
import img_avatar_default from '../../../../images/img-user-default.jpg';
import { Button, Dropdown, Tooltip } from 'antd';
import { CheckOutlined, DeleteOutlined, MoreOutlined } from '@ant-design/icons';
import Notification from 'API/Notification';
import { formatTime } from 'utils';
const cn = classNames.bind(styles);
ItemNotifi.propTypes = {};

function ItemNotifi(props) {
   const { data, handleRemoveNotifi, setNotifiCount, checkedNoti } = props;
   const [checked, setChecked] = useState(data.checked);
   const jwt = {
      type: localStorage.getItem('type'),
      token: localStorage.getItem('token'),
   };
   const handleChecked = async () => {
      try {
         await Notification.checkedNotification(jwt, data.id);
         if (checked) {
            setNotifiCount((pre) => pre + 1);
         } else {
            setNotifiCount((pre) => pre - 1);
         }
         setChecked(!checked);
      } catch (error) {
         console.log('error:', error);
      }
   };
   const items = [
      {
         key: '1',
         label: (
            <div
               onClick={handleChecked}
               style={{ display: 'flex', gap: 15, alignItems: 'center', padding: '5px 20px' }}>
               <CheckOutlined />
               {checked ? 'Mark as unread' : 'Mark as read'}
            </div>
         ),
      },
      {
         key: '2',
         danger: true,
         label: (
            <div
               onClick={() => {
                  handleRemoveNotifi(data.id);
               }}
               style={{ display: 'flex', gap: 15, alignItems: 'center', padding: '5px 20px' }}>
               <DeleteOutlined />
               Delete
            </div>
         ),
      },
   ];
   const position =
      data.type === 'FOLLOW' ? '0px -986px' : data.type === 'LIKE' ? '0px -1711px' : null;
   return (
      <div className={cn('wrapper')}>
         <div>
            <div className={cn('notifi-wrap')}>
               <div className={cn('item-first')}>
                  <div className={cn('avatar-wrap')}>
                     <img src={data.notifi_sender?.avatar?.url || img_avatar_default} alt="" />
                  </div>
                  <div className={cn('icon')}>
                     <i style={{ backgroundPosition: position }}></i>
                  </div>
               </div>
               <div className={cn('item-middle')}>
                  <div className={cn('middle-child')}>
                     <div>
                        <p>
                           <b>{data.notifi_sender?.full_name}</b> {data.content}
                        </p>
                        <span
                           style={{
                              fontWeight: checked ? 450 : 500,
                              color: checked ? null : 'rgb(0 96 230)',
                           }}>
                           {formatTime(data.createdAt)} before
                        </span>
                     </div>
                  </div>
                  <div className={cn('item-end')}>{!checked && <div></div>}</div>
               </div>
            </div>
         </div>

         <div className={cn('btn-more')}>
            <div>
               <Tooltip>
                  <Dropdown menu={{ items }} trigger={['click']}>
                     <Button shape="circle" icon={<MoreOutlined />} />
                  </Dropdown>
               </Tooltip>
            </div>
         </div>
      </div>
   );
}

export default ItemNotifi;
