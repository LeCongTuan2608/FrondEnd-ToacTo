import React, { useEffect, useState, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './ChatBox.module.scss';
import { useDispatch } from 'react-redux';
import { removeChatBox } from 'store/slices/chatBoxSlice';
import { CloseOutlined, SendOutlined } from '@ant-design/icons';
import { Button, Input, Tooltip } from 'antd';
import img_avatar from '../../images/avatar.png';
import InputMes from './InputMes';
const cn = classNames.bind(styles);
ChatBox.propTypes = {};
const messages = [
   {
      id: 1,
      content: 'hello ae',
      date: '22/05/2023',
      sender: '@congtuy',
      receiver: '@CongTuan',
   },
   {
      id: 2,
      content: 'chao',
      date: '22/05/2023',
      sender: '@congtuan',
      receiver: '@CongDuy',
   },
   {
      id: 3,
      content: 'gi day',
      date: '22/05/2023',
      sender: '@congtuan',
      receiver: '@CongDuy',
   },
   {
      id: 4,
      content: 'dang lam gi z',
      date: '22/05/2023',
      sender: '@congtuan',
      receiver: '@CongDuy',
   },
   {
      id: 5,
      content: 'dang lam viec',
      date: '22/05/2023',
      sender: '@congtuy',
      receiver: '@CongTuan',
   },
   {
      id: 6,
      content: 'um',
      date: '22/05/2023',
      sender: '@congtuan',
      receiver: '@CongDuy',
   },
   {
      id: 7,
      content: 'um',
      date: '22/05/2023',
      sender: '@congtuan',
      receiver: '@CongDuy',
   },
   {
      id: 8,
      content: 'um',
      date: '22/05/2023',
      sender: '@congtuan',
      receiver: '@CongDuy',
   },
   {
      id: 9,
      content: 'um',
      date: '22/05/2023',
      sender: '@congtuan',
      receiver: '@CongDuy',
   },
   {
      id: 10,
      content: 'um',
      date: '22/05/2023',
      sender: '@congtuan',
      receiver: '@CongDuy',
   },
   {
      id: 11,
      content: 'um',
      date: '22/05/2023',
      sender: '@congtuan',
      receiver: '@CongDuy',
   },
   {
      id: 12,
      content: 'umkjsldjhdjdjdjdjdjdjdjdjdjdjdjdjdjdjdjdjdjdjdjdjdj',
      date: '22/05/2023',
      sender: '@congtuan',
      receiver: '@CongDuy',
   },
];
const currentDate = new Date(); // Lấy ngày hiện tại
function ChatBox(props) {
   const { chatBox } = props;
   const dispatch = useDispatch();
   const [userName] = useState(localStorage.getItem('user_name'));
   const [message, setMessage] = useState(messages);
   const containerDiv = useRef(null);
   useEffect(() => {
      containerDiv.current && (containerDiv.current.scrollTop = containerDiv.current.scrollHeight);
   }, [message]);
   const onClose = () => {
      dispatch(removeChatBox(chatBox.id));
   };

   const onSubmit = (value) => {
      const newMessage = {
         id: message.length + 1,
         content: value,
         date: currentDate.toDateString(),
         sender: userName,
         receiver: chatBox.userName,
      };
      setMessage([...message, newMessage]);
   };

   return (
      <div className={cn('wrapper')}>
         <div className={cn('chat-box')}>
            <div className={cn('chat-header')}>
               <div className={cn('avatar')}>
                  <img src={img_avatar} alt="" />
               </div>
               <div className={cn('user-name')}>
                  <h3>{chatBox.userName}</h3>
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
                              <p>{mes.content}</p>
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
