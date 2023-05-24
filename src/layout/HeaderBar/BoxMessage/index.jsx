import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Badge, Button, Dropdown, Modal, Space, Tooltip } from 'antd';
import { AliwangwangOutlined, MessageOutlined } from '@ant-design/icons';
import { useContext, useState, useEffect, useCallback } from 'react';
import Message from 'components/Message';
import classNames from 'classnames/bind';
import styles from './BoxMessage.module.scss';
const cn = classNames.bind(styles);
BoxMessage.propTypes = {};
const data = [
   {
      id: 1,
      userName: 'Cong Tuan',
      message: 'Hello',
      checked: false,
   },
   {
      id: 2,
      userName: 'Cong Duy',
      message: 'Hello 1',
      checked: false,
   },
   {
      id: 3,
      userName: 'Cong Lai',
      message: 'Hello 2',
      checked: true,
   },
   {
      id: 4,
      userName: 'Thuy Ngo',
      message: 'Alo? may an gi chua 3',
      checked: true,
   },
   {
      id: 5,
      userName: 'Cong Loc',
      message: 'Alo? may an gi chua 4',
      checked: true,
   },
   {
      id: 6,
      userName: 'Cong Tuan',
      message: 'Alo? may an gi chua 5',
      checked: true,
   },
   {
      id: 7,
      userName: 'Cong Tuan',
      message: 'Alo? may an gi chua6',
      checked: true,
   },
   {
      id: 8,
      userName: 'Cong Tuan',
      message: 'Alo? may an gi chua 7',
      checked: true,
   },
   {
      id: 9,
      userName: 'Cong Tuan',
      message: 'Alo? may an gi chua 8',
      checked: true,
   },
   {
      id: 10,
      userName: 'Cong Tuan',
      message: 'Alo? may an gi chua 9',
      checked: true,
   },
   {
      id: 11,
      userName: 'Cong Tuan',
      message: 'Alo? may an gi chua',
      checked: true,
   },
   {
      id: 12,
      userName: 'Cong Tuan',
      message: 'Alo? may an gi chua',
      checked: true,
   },
   {
      id: 13,
      userName: 'Cong Tuan',
      message: 'Alo? may an gi chua',
      checked: true,
   },
   {
      id: 14,
      userName: 'Cong Tuan',
      message: 'Alo? may an gi chuaAlo? may an gi chuaAlo? may an gi chuaAlo? may an gi chua',
      checked: true,
   },
];
function BoxMessage(props) {
   const { children } = props;
   const [open, setOpen] = useState(false);
   const [items, setItems] = useState(data);
   const handleCloseModal = (e) => {
      e.stopPropagation();
   };
   const handleOutsideClick = (e) => {
      if (e.target === e.currentTarget) {
         setOpen(false);
      }
   };
   const handleRemoveMessage = (id) => {
      setItems((preItems) => preItems.filter((val) => val.id !== id));
   };
   return (
      <div className={cn('wrapper')}>
         <Tooltip onClick={() => setOpen(!open)}>
            <Button shape="circle" icon={<MessageOutlined />} size="large" />
         </Tooltip>
         {open && (
            <>
               <div className={cn('box-wrap')}>
                  <div className={cn('layer')} onClick={handleOutsideClick}></div>
                  <div onClick={handleCloseModal} className={cn('container')}>
                     <div>
                        <h2>Chat</h2>
                     </div>
                     <div className={cn('wrap-message')}>
                        {items.map((item, index) => {
                           return (
                              <Message
                                 setOpen={setOpen}
                                 key={item.id}
                                 user={item}
                                 onRemove={handleRemoveMessage}
                              />
                           );
                        })}
                     </div>
                  </div>
               </div>
            </>
         )}
      </div>
   );
}

export default BoxMessage;
