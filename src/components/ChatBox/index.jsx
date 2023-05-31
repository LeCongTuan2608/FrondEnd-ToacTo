import React, { useEffect, useState, useRef, useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './ChatBox.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { addChatBox, removeChatBox } from 'store/slices/chatBoxSlice';
import { CloseOutlined, SendOutlined } from '@ant-design/icons';
import { Button, Input, Tooltip } from 'antd';
import img_avatar from '../../images/avatar.png';
import InputMes from './InputMes';
import socket from '../../socket/index';
import Messages from 'API/Messages';
import { ConversationContext } from 'Context/ConversationContext';
const cn = classNames.bind(styles);
ChatBox.propTypes = {};

const currentDate = new Date(); // Lấy ngày hiện tại
function ChatBox(props) {
   const { chatBox } = props;
   const dispatch = useDispatch();
   const { mesNotSeen, setMesNotSeen, setRefresh } = useContext(ConversationContext);
   const [userName] = useState(localStorage.getItem('user_name'));
   const [newId, setNewId] = useState(chatBox.conversation_id);
   const data = useSelector((state) => state.chatBoxes);
   const [message, setMessage] = useState([]);
   const jwt = {
      type: localStorage.getItem('type'),
      token: localStorage.getItem('token'),
   };
   const containerDiv = useRef(null);
   useEffect(() => {
      const getMessage = async () => {
         try {
            const response = await Messages.getAllMessages(newId, jwt);
            const data = response.data.messages;
            setMessage(data);
         } catch (error) {
            console.log('error:', error);
         }
      };
      getMessage();
   }, [newId]);
   useEffect(() => {
      containerDiv.current && (containerDiv.current.scrollTop = containerDiv.current.scrollHeight);
   }, [message]);
   useEffect(() => {
      socket.on('getMessage', (data) => {
         if (data.receiver === userName && data.sender === chatBox.user_name) {
            setMessage((prev) => [...prev, data]);
            !newId && setNewId(data.conversation_id);
         }
      });
   }, []);
   const onClose = () => {
      dispatch(removeChatBox(chatBox.user_name));
   };

   const onSubmit = async (value) => {
      try {
         const newMessage = {
            content: value,
            date: currentDate.toDateString(),
            sender: userName,
            receiver: chatBox?.user_name,
            conversation_id: newId || null,
         };
         const res = await Messages.createMessages(newMessage, jwt);
         setMessage((pre) => [...pre, res.data.message]);
         !newId && setNewId(res.data.message.conversation_id);
         socket.emit('sendMessage', res.data.message);
      } catch (error) {
         console.log('error:', error);
      }
   };

   return (
      <div className={cn('wrapper')}>
         <div className={cn('chat-box')}>
            <div className={cn('chat-header')}>
               <div className={cn('avatar')}>
                  <img src={img_avatar} alt="" />
               </div>
               <div className={cn('user-name')}>
                  <h3>{chatBox?.full_name}</h3>
               </div>
               <div onClick={onClose} className={cn('btn-close')}>
                  <CloseOutlined style={{ fontSize: 20 }} />
               </div>
            </div>
            <div className={cn('chat-messages')}>
               <ul ref={containerDiv}>
                  {message.map((mes, index) => {
                     if (mes.sender === userName) {
                        return (
                           <li key={mes.id} className={cn('message', 'mine')}>
                              <p>
                                 {mes.content !== ''
                                    ? mes.content
                                    : 'This message has been deleted!'}
                              </p>
                           </li>
                        );
                     } else {
                        return (
                           <li key={mes.id} className={cn('message', 'friend')}>
                              <div className={cn('avatar')} style={{ width: 35, height: 35 }}>
                                 <img src={img_avatar} alt="" />
                              </div>
                              <p>{mes.content}</p>
                           </li>
                        );
                     }
                  })}
               </ul>
            </div>
            <div className={cn('chat-input')}>
               <InputMes onSubmit={onSubmit} />
            </div>
         </div>
      </div>
   );
}

export default ChatBox;
