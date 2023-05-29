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
   const { user, setOpen, onRemove } = props;
   const userName = localStorage.getItem('user_name');
   const [checked, setChecked] = useState(user.sender === userName ? true : user.checked);
   const dispatch = useDispatch();
   const jwt = {
      type: 'Bearer',
      token: localStorage.getItem('token'),
   };
   const handleOpenChat = async () => {
      try {
         dispatch(addChatBox(user));
         setOpen(false);
         await Conversation.checkedConversation(user.conversation_id, jwt);
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
               onClick={() => onRemove(user.id)}
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
                  <img src={img_avatar} alt="" />
               </div>
               <div className={cn('item-middle')}>
                  <div className={cn('middle-child')}>
                     <span
                        style={{
                           fontWeight: checked ? 450 : 500,
                        }}>
                        {user?.user_1 === userName
                           ? user?.user_2_info.full_name
                           : user?.user_1_info.full_name}
                     </span>
                     <div>
                        <p
                           style={{
                              fontWeight: checked ? 450 : 500,
                              color: checked ? null : 'rgb(0 96 230)',
                           }}>
                           {user.sender === userName && <span>You: </span>}
                           {user?.last_message}
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
