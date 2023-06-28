import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Avatar, Button, notification } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { ThemeContext } from 'Context/ThemeContext';
import img_avatar_default from '../../images/img-user-default.jpg';
import Conversation from 'API/Conversation';
import { useDispatch } from 'react-redux';
import { addChatBox } from 'store/slices/chatBoxSlice';
import { ConversationContext } from 'Context/ConversationContext';
UserCard.propTypes = {};

function UserCard(props) {
   const { user, followers } = props;
   const { theme } = useContext(ThemeContext);
   const [follow, setFollow] = useState(false);
   const [api, contextHolder] = notification.useNotification();
   const { setMesNotSeen, conversation, setConversation } = useContext(ConversationContext);
   const dispatch = useDispatch();
   const jwt = {
      type: localStorage.getItem('type'),
      token: localStorage.getItem('token'),
   };
   const userName = localStorage.getItem('user_name');
   const showNotification = (e, type) => {
      // goi api o day, va check
      // type = 'error';
      setFollow(!follow);
      // api[type]({
      //    message: `${e.target.innerText} is success`,
      //    description: `You has ${e.target.innerText} the ${name}!!`,
      //    placement: 'bottomRight',
      //    style:
      //       theme === 'dark'
      //          ? {
      //               background: '#575758',
      //               color: 'white',
      //            }
      //          : {},
      // });
   };
   const handleOpenChat = async (e) => {
      try {
         e.stopPropagation();
         const res = await Conversation.getConversation(user.user_name, jwt);
         const result = res.data.conversation;

         const newChatBox = !result && {
            users: [{ ...user }],
            group: false,
            member: [userName, user.user_name],
            blocked: result?.blocked,
         };
         dispatch(addChatBox(result || newChatBox));
         if (result && !result?.checked.includes(userName)) {
            setMesNotSeen((pre) => {
               return pre <= 0 ? pre : pre - 1;
            });
            setConversation((pre) =>
               pre.map((obj) => {
                  if (obj.id === conversation.id && obj.checked)
                     return { ...obj, checked: [...obj.checked, userName] };
                  return obj;
               }),
            );
            await Conversation.checkedConversation(result.id, jwt);
         }
      } catch (error) {
         console.log('error:', error);
      }
   };
   return (
      <div
         style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 10,
         }}>
         <div>
            <Avatar
               size={64}
               icon={<UserOutlined />}
               src={user.avatar?.url || img_avatar_default}
               style={{ border: '1px solid #bdbdbdc2' }}
            />
         </div>
         <div
            style={{
               display: 'flex',
               flexDirection: 'column',
               flex: 1,
               textAlign: 'start',
               justifyContent: 'center',
               gap: 5,
            }}>
            <p style={{ margin: 0, fontSize: 15 }}>
               <span>
                  <b>{user?.full_name}</b>
               </span>
            </p>
            <p style={{ margin: 0, opacity: 0.7 }}>
               <span>
                  <i>{user?.user_name}</i>
               </span>
            </p>
         </div>
         <div
            style={{
               display: 'flex',
               gap: 7,
            }}>
            <Button
               type="dashed"
               danger={follow}
               onClick={(e) => {
                  showNotification(e, follow ? 'warning' : 'success');
               }}
               style={
                  follow && theme === 'light'
                     ? { background: '#fff1f0' }
                     : { background: '#e7f3ff' }
               }>
               {!follow ? 'Follow' : 'Unfollow'}
            </Button>
            <Button onClick={handleOpenChat} style={{ background: '#e7f3ff' }}>
               Chat
            </Button>
         </div>
      </div>
   );
}

export default UserCard;
