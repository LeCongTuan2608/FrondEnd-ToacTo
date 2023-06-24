import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './UsersItem.module.scss';
import classNames from 'classnames/bind';
import avatar_default from '../../../../images/img-user-default.jpg';
import { Avatar, Dropdown } from 'antd';
import {
   ExclamationCircleOutlined,
   FileExcelOutlined,
   MoreOutlined,
   StopOutlined,
} from '@ant-design/icons';
import { ThemeContext } from 'Context/ThemeContext';
const cn = classNames.bind(styles);
UsersItem.propTypes = {};

function UsersItem(props) {
   const { item, handleBlock, handleBan } = props;
   const { theme } = useContext(ThemeContext);
   const [open, setOpen] = useState(false);
   const handleMenuClick = (e) => {
      setOpen(false);
   };
   const handleOpenChange = (flag) => {
      setOpen(flag);
   };

   const items = [
      {
         key: '2',
         label: (
            <div
               style={{ display: 'flex', gap: 15, alignItems: 'center', padding: '5px 20px' }}
               onClick={(e) => {
                  handleBlock(e, item.user_name);
               }}>
               <StopOutlined />
               Block
            </div>
         ),
      },
      {
         key: '3',
         // danger: true,
         label: (
            <div
               style={{ display: 'flex', gap: 15, alignItems: 'center', padding: '5px 20px' }}
               onClick={(e) => {
                  handleBan(e, item.user_name);
               }}>
               <FileExcelOutlined />
               Remove the ban
            </div>
         ),
      },
   ];
   return (
      <div className={cn('item')}>
         <div className={cn('first')}>
            <div>
               <img src={avatar_default} alt="" />
            </div>
         </div>
         <div className={cn('middle')}>
            <span>
               <h3>
                  {item.full_name} (Role: {item.role.role_name})
               </h3>
            </span>
            <span>{item.user_name}</span>
            <div>
               <span>Relationship: {item.relationship}</span>
               <span>Location: {item.location}</span>
            </div>
         </div>
         <div className={cn('end')}>
            <Dropdown
               menu={{ items, onClick: handleMenuClick }}
               trigger={['click']}
               onOpenChange={handleOpenChange}
               open={open}>
               <Avatar
                  className={cn('more-option')}
                  size="large"
                  style={{
                     backgroundColor: theme === 'light' ? 'white' : '#242526',
                     color: theme === 'light' ? 'black' : 'white',
                  }}
                  icon={<MoreOutlined />}
               />
            </Dropdown>
         </div>
      </div>
   );
}

export default UsersItem;
