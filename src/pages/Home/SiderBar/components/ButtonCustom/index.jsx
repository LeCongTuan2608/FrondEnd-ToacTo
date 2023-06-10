import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, notification, message } from 'antd';
import { ThemeContext } from 'Context/ThemeContext';
import { CheckOutlined, RadiusBottomleftOutlined } from '@ant-design/icons';
import User from 'API/User';
ButtonCustom.propTypes = {};

function ButtonCustom(props) {
   const { title, user, jwt } = props;
   const [follow, setFollow] = useState(title === 'Following' ? true : false);
   const { theme } = useContext(ThemeContext);
   const [messageApi, contextHolder] = message.useMessage();
   const showNotifine = (type, label) => {
      messageApi.open({
         type: type,
         content: label,
      });
   };
   const handleFollow = async (e) => {
      try {
         e.stopPropagation();
         const res = await User.handleFollow(user.user_name, jwt);
         if (follow) showNotifine('warning', `You just unfollowed ${user}!!`);
         else showNotifine('success', `You just followed ${user}`);
         setFollow(!follow);
      } catch (error) {
         console.log('error:', error);
         showNotifine('error', 'An error occurred during follow/unfollow');
      }
   };
   return (
      <>
         {contextHolder}
         {title !== 'Friends' ? (
            <Button
               type="dashed"
               danger={follow}
               onClick={handleFollow}
               style={follow && theme === 'light' ? { background: '#fff1f0' } : {}}>
               {!follow ? 'Follow' : 'Unfollow'}
            </Button>
         ) : null}
      </>
   );
}

export default ButtonCustom;
