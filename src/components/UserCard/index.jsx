import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Avatar, Button, notification } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { ThemeContext } from 'Context/ThemeContext';
import img_avt from '../../images/avatar.png';
UserCard.propTypes = {};

function UserCard(props) {
   const { user, followers } = props;
   const { theme } = useContext(ThemeContext);
   const [follow, setFollow] = useState(false);
   const [api, contextHolder] = notification.useNotification();
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
               src={img_avt}
               style={{ border: '1px solid #bdbdbdc2' }}
            />
         </div>
         <div
            style={{
               display: 'flex',
               flexDirection: 'column',
               flex: 1,
               textAlign: 'start',
               padding: '0 10px',
               gap: 10,
            }}>
            <p style={{ margin: 0, fontSize: 15 }}>
               <span>
                  <b>{user?.name}</b>
               </span>
            </p>
            <p style={{ margin: 0, opacity: 0.7 }}>
               <span>
                  <i>Followers: {user?.followers}</i>
               </span>
            </p>
         </div>
         <div>
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
         </div>
      </div>
   );
}

export default UserCard;
