import React from 'react';
import PropTypes from 'prop-types';
import img_avatar from '../../images/avatar.png';
import { CheckOutlined, DeleteOutlined, MoreOutlined } from '@ant-design/icons';
import { Button, Dropdown, Tooltip } from 'antd';
import classNames from 'classnames/bind';
import styles from './Message.module.scss';
import { useContext, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addChatBox } from 'store/slices/chatBoxSlice';
import Conversation from 'API/Conversation';
import { ConversationContext } from 'Context/ConversationContext';
const cn = classNames.bind(styles);

Message.propTypes = {};
Message.defaultProps = {
   user: {
      userName: 'undefine',
      message: 'Not found',
      checked: false,
   },
};

function Message(props) {
   const { conversationItem, setOpen, onRemove } = props;
   const userName = localStorage.getItem('user_name');
   const [checked, setChecked] = useState(
      conversationItem.checked && conversationItem.checked.includes(userName),
   );
   const dispatch = useDispatch();
   const { mesNotSeen, setMesNotSeen, conversation, setConversation } =
      useContext(ConversationContext);
   const jwt = {
      type: localStorage.getItem('type'),
      token: localStorage.getItem('token'),
   };
   const handleOpenChat = async () => {
      try {
         dispatch(addChatBox(conversationItem));
         setOpen(false);
         if (!checked) {
            setMesNotSeen(mesNotSeen - 1);
            setConversation((pre) =>
               pre.map((obj) => {
                  if (obj.id === conversationItem.id && obj.checked)
                     return { ...obj, checked: [...obj.checked, userName] };
                  return obj;
               }),
            );
            await Conversation.checkedConversation(conversationItem.id, jwt);
         }
      } catch (error) {
         console.log('error:', error);
      }
   };
   const handleCheckMessage = () => {
      setChecked(!checked);
   };
   const items = [
      {
         key: '1',
         label: (
            <div
               style={{ display: 'flex', gap: 15, alignItems: 'center', padding: '5px 20px' }}
               onClick={handleCheckMessage}>
               <CheckOutlined />
               {checked ? 'Mark as read' : 'Mark as unread'}
            </div>
         ),
      },
      {
         key: '2',
         danger: true,
         label: (
            <div
               onClick={() => onRemove(conversationItem.id)}
               style={{ display: 'flex', gap: 15, alignItems: 'center', padding: '5px 20px' }}>
               <DeleteOutlined />
               Delete
            </div>
         ),
      },
   ];
   return (
      <div className={cn('wrapper')}>
         <div onClick={handleOpenChat}>
            <div className={cn('message-wrap')}>
               <div className={cn('item-first')}>
                  <img src={conversationItem.avatar || img_avatar} alt="" />
               </div>
               <div className={cn('item-middle')}>
                  <div className={cn('middle-child')}>
                     <span
                        style={{
                           fontWeight: checked ? 450 : 500,
                        }}>
                        {(conversationItem.group && conversationItem.group_name) ||
                           conversationItem.Users.filter(
                              (user) => !user.user_name.includes(userName),
                           )
                              .map((user) => user.full_name)
                              .join(', ')}
                     </span>
                     <div>
                        <p
                           style={{
                              fontWeight: checked ? 450 : 500,
                              color: checked ? null : 'rgb(0 96 230)',
                           }}>
                           {conversationItem.last_message.sender === userName && <span>You: </span>}
                           {conversationItem?.last_message.content}
                        </p>
                        <span style={{ padding: '0 10px' }}>15m</span>
                     </div>
                  </div>
                  <div className={cn('item-end')}>{!checked && <div></div>}</div>
               </div>
            </div>
         </div>

         <div className={cn('btn-more')}>
            <Tooltip>
               <Dropdown menu={{ items }} trigger={['click']}>
                  <Button shape="circle" icon={<MoreOutlined />} />
               </Dropdown>
            </Tooltip>
         </div>
      </div>
   );
}

export default Message;
