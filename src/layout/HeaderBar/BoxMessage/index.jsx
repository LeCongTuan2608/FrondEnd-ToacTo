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
import { ConversationContext } from 'Context/ConversationContext';

const cn = classNames.bind(styles);
BoxMessage.propTypes = {};

function BoxMessage(props) {
   const { children } = props;
   const [open, setOpen] = useState(false);
   const [userName] = useState(localStorage.getItem('user_name'));
   const { conversation, setConversation, mesNotSeen, setRefresh, setMesNotSeen } =
      useContext(ConversationContext);
   useEffect(() => {
      socket.on('getMessage', (data) => {
         if (conversation.map((conv) => conv.id).includes(data.conversation_id))
            setRefresh((pre) => !pre);
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
         <Tooltip
            onClick={() => {
               setOpen(!open);
               !open && setRefresh((pre) => !pre);
            }}>
            <Badge count={mesNotSeen} size="small">
               <Button shape="circle" icon={<MessageOutlined />} size="large" />
            </Badge>
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
                                 key={item.id}
                                 conversationItem={item}
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
