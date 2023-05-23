import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './ChatBox.module.scss';
import { useDispatch } from 'react-redux';
import { removeChatBox } from 'store/slices/chatBoxSlice';
import { CloseOutlined, SendOutlined } from '@ant-design/icons';
import { Button, Input, Tooltip } from 'antd';
import img_avatar from '../../../../images/avatar.png';
const cn = classNames.bind(styles);
ChatBox.propTypes = {};
const messages = [
   {
      id: 1,
      content: 'hello ae',
      date: '22/05/2023',
      sender: 'Cong Duy',
      receiver: 'Cong Tuan',
   },
   {
      id: 2,
      content: 'chao',
      date: '22/05/2023',
      sender: 'Cong Tuan',
      receiver: 'Cong Duy',
   },
   {
      id: 3,
      content: 'gi day',
      date: '22/05/2023',
      sender: 'Cong Tuan',
      receiver: 'Cong Duy',
   },
   {
      id: 4,
      content: 'dang lam gi z',
      date: '22/05/2023',
      sender: 'Cong Tuan',
      receiver: 'Cong Duy',
   },
   {
      id: 5,
      content: 'dang lam viec',
      date: '22/05/2023',
      sender: 'Cong Duy',
      receiver: 'Cong Tuan',
   },
   {
      id: 6,
      content: 'um',
      date: '22/05/2023',
      sender: 'Cong Tuan',
      receiver: 'Cong Duy',
   },
   {
      id: 7,
      content: 'um',
      date: '22/05/2023',
      sender: 'Cong Tuan',
      receiver: 'Cong Duy',
   },
   {
      id: 8,
      content: 'um',
      date: '22/05/2023',
      sender: 'Cong Tuan',
      receiver: 'Cong Duy',
   },
   {
      id: 9,
      content: 'um',
      date: '22/05/2023',
      sender: 'Cong Tuan',
      receiver: 'Cong Duy',
   },
   {
      id: 10,
      content: 'um',
      date: '22/05/2023',
      sender: 'Cong Tuan',
      receiver: 'Cong Duy',
   },
   {
      id: 11,
      content: 'um',
      date: '22/05/2023',
      sender: 'Cong Tuan',
      receiver: 'Cong Duy',
   },
   {
      id: 12,
      content: 'um',
      date: '22/05/2023',
      sender: 'Cong Tuan',
      receiver: 'Cong Duy',
   },
];
function ChatBox(props) {
   const { chatBox } = props;
   const dispatch = useDispatch();
   const [userName] = useState(localStorage.getItem('userName'));
   const containerDiv = useRef();
   useEffect(() => {
      containerDiv.current && (containerDiv.current.scrollTop = containerDiv.current.scrollHeight);
   }, []);
   const onClose = () => {
      dispatch(removeChatBox(chatBox.id));
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
                  {messages.map((mes, index) => {
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
               <Input type="text" placeholder="input with clear icon" allowClear />
               <Tooltip title="send">
                  <Button shape="circle" icon={<SendOutlined />} />
               </Tooltip>
            </div>
         </div>
      </div>
   );
}

export default ChatBox;
