import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Badge, Button, Dropdown, Modal, Space, Tooltip } from 'antd';
import { AliwangwangOutlined, MessageOutlined } from '@ant-design/icons';
import { useContext, useState, useEffect } from 'react';
import Message from 'components/Message';
import classNames from 'classnames/bind';
import styles from './BoxMessage.module.scss';
const cn = classNames.bind(styles);
BoxMessage.propTypes = {};
const data = [
   {
      userName: 'Cong Tuan',
      message: 'Hello',
      checked: false,
   },
   {
      userName: 'Cong Tuan',
      message:
         'Hello sdkjlfhkjsd fkjsdhfkjsdhfkjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj',
      checked: false,
   },
   {
      userName: 'Cong Tuan',
      message:
         'Hello sdkjlfhkjsd fkjsdhfkjsdhfkjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj',
      checked: true,
   },
   {
      userName: 'Cong Tuan',
      message: 'Alo? may an gi chua',
      checked: true,
   },
   {
      userName: 'Cong Tuan',
      message: 'Alo? may an gi chua',
      checked: true,
   },
   {
      userName: 'Cong Tuan',
      message: 'Alo? may an gi chua',
      checked: true,
   },
   {
      userName: 'Cong Tuan',
      message: 'Alo? may an gi chua',
      checked: true,
   },
   {
      userName: 'Cong Tuan',
      message: 'Alo? may an gi chua',
      checked: true,
   },
   {
      userName: 'Cong Tuan',
      message: 'Alo? may an gi chua',
      checked: true,
   },
   {
      userName: 'Cong Tuan',
      message: 'Alo? may an gi chua',
      checked: true,
   },
   {
      userName: 'Cong Tuan',
      message: 'Alo? may an gi chua',
      checked: true,
   },
   {
      userName: 'Cong Tuan',
      message: 'Alo? may an gi chua',
      checked: true,
   },
   {
      userName: 'Cong Tuan',
      message: 'Alo? may an gi chua',
      checked: true,
   },
   {
      userName: 'Cong Tuan',
      message: 'Alo? may an gi chua',
      checked: true,
   },
];
function BoxMessage(props) {
   const { children } = props;
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
                        {data.map((item, index) => {
                           return (
                              <Message
                                 setOpen={setOpen}
                                 key={index}
                                 user={{
                                    userName: item.userName,
                                    message: item.message,
                                    checked: item.checked,
                                 }}
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
