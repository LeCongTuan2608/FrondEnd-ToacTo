import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Badge, Button, Dropdown, Modal, Space, Tooltip } from 'antd';
import { AliwangwangOutlined, MessageOutlined } from '@ant-design/icons';
import { useContext, useState, useEffect, useCallback } from 'react';
import Message from 'components/Message';
import classNames from 'classnames/bind';
import styles from './BoxMessage.module.scss';
import Conversation from 'API/Conversation';
import socket from '../../../socket/index';
const cn = classNames.bind(styles);
BoxMessage.propTypes = {};
// const messages = [
//    {
//       user_1: '@abcxyz',
//       user_2: '@congtuan',
//       last_message: 'hello',
//       checked: false,
//       conversation_id: 1,
//       user_1_info: {
//          full_name: 'Tuan Tet',
//          user_name: '@abcxyz',
//       },
//       user_2_info: {
//          full_name: 'Le cong tuan',
//          user_name: '@congtuan',
//       },
//    },
// ];

function BoxMessage(props) {
   const { children } = props;
   const [open, setOpen] = useState(false);
   const [conversation, setConversation] = useState([]);
   const [newMes, setNewMes] = useState({});
   useEffect(() => {
      const getConversation = async () => {
         try {
            const jwt = {
               type: 'Bearer',
               token: localStorage.getItem('token'),
            };
            const response = await Conversation.getAllConversation(jwt);
            const data = response.data.conversation;
            setConversation(data);
         } catch (error) {
            console.log('error:', error);
         }
      };
      getConversation();
   }, [newMes]);
   // khi nhận được tin nhắn mới từ server refresh lại hàm getConversation để nhận tin nhắn mới
   useEffect(() => {
      socket.on('getMessage', (data) => {
         setNewMes(data);
      });
   }, []);
   const handleCloseModal = (e) => {
      e.stopPropagation();
   };
   const handleOutsideClick = (e) => {
      if (e.target === e.currentTarget) {
         setOpen(false);
      }
   };
   const handleRemoveMessage = (id) => {
      setConversation((preItems) => preItems.filter((val) => val.id !== id));
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
                        {conversation.map((item, index) => {
                           return (
                              <Message
                                 setOpen={setOpen}
                                 key={item.conversation_id}
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
