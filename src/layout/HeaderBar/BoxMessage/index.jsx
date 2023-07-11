import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Badge, Button, Dropdown, Modal, Space, Tooltip } from 'antd';
import {
   AliwangwangOutlined,
   CheckOutlined,
   DeleteOutlined,
   EllipsisOutlined,
   MessageOutlined,
} from '@ant-design/icons';
import { useContext, useState, useEffect, useCallback } from 'react';
import Message from 'components/Message';
import classNames from 'classnames/bind';
import styles from './BoxMessage.module.scss';
import Conversation from 'API/Conversation';
import socket from '../../../socket';
import { ConversationContext } from 'Context/ConversationContext';
import { useRef } from 'react';

const cn = classNames.bind(styles);
BoxMessage.propTypes = {};

function BoxMessage(props) {
   const { children } = props;
   const [open, setOpen] = useState(false);
   const btnIconRef = useRef(null);
   const [userName] = useState(localStorage.getItem('user_name'));
   const { conversation, setConversation, mesNotSeen, setRefresh, setMesNotSeen } =
      useContext(ConversationContext);
   const jwt = {
      type: localStorage.getItem('type'),
      token: localStorage.getItem('token'),
   };
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
   useEffect(() => {
      socket.on('getMessage', (data) => {
         if (
            conversation.map((conv) => conv.id).includes(data.conversation_id) ||
            data.receiver.includes(userName)
         ) {
            setRefresh((pre) => !pre);
         }
      });
      socket.on('getIdRemoveMes', (data) => {
         if (conversation.map((conv) => conv.id).includes(data.conversation_id)) {
            setRefresh((pre) => !pre);
         }
      });
   }, []);
   const handleCloseModal = (e) => {
      e.stopPropagation();
   };
   const handleRemoveMessage = async (id) => {
      try {
         const response = await Conversation.removeConversation(id, jwt);
         const result = response.data.result;
         setConversation((preItems) => preItems.filter((val) => val.id !== result.id));
      } catch (error) {
         console.log('error:', error);
      }
   };
   const items = [
      {
         key: '1',
         label: (
            <div style={{ display: 'flex', gap: 15, alignItems: 'center', padding: '5px 20px' }}>
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
   return (
      <div className={cn('wrapper')}>
         <Tooltip
            onClick={() => {
               setOpen(!open);
               !open && setRefresh((pre) => !pre);
            }}>
            <Badge count={mesNotSeen} size="small">
               <Button shape="circle" icon={<MessageOutlined />} size="large" ref={btnIconRef} />
            </Badge>
         </Tooltip>
         {open && (
            <div className={cn('box-wrap')}>
               <div onClick={handleCloseModal} className={cn('container')}>
                  <div className={cn('container-header')}>
                     <div className={cn('header-title')}>
                        <div>
                           <span>
                              <h2>Chat</h2>
                           </span>
                        </div>
                        <Tooltip>
                           <Dropdown menu={{ items }} trigger={['click']}>
                              <Button shape="circle" icon={<EllipsisOutlined />} />
                           </Dropdown>
                        </Tooltip>
                     </div>
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
         )}
      </div>
   );
}

export default BoxMessage;
