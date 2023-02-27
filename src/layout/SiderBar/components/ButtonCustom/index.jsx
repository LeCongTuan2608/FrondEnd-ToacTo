import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, notification } from 'antd';
import { ThemeContext } from 'Context/ThemeContext';
import { CheckOutlined, RadiusBottomleftOutlined } from '@ant-design/icons';
ButtonCustom.propTypes = {};

function ButtonCustom(props) {
   const { title, user } = props;
   const [follow, setFollow] = useState(false);
   const [api, contextHolder] = notification.useNotification();
   const { theme } = useContext(ThemeContext);

   const showNotification = (e, type) => {
      // goi api o day, va check
      // type = 'error';
      setFollow(!follow);
      api[type]({
         message: `${e.target.innerText} is success`,
         description: `You has ${e.target.innerText} the ${user.label}!!`,
         placement: 'bottomRight',
         style:
            theme === 'dark'
               ? {
                    background: '#575758',
                    color: 'white',
                 }
               : {},
      });
   };
   return (
      <>
         {contextHolder}
         {title !== 'Friends' ? (
            title !== 'Following' ? (
               <Button
                  type="dashed"
                  danger={follow}
                  onClick={(e) => {
                     showNotification(e, follow ? 'warning' : 'success');
                  }}
                  style={follow && theme === 'light' ? { background: '#fff1f0' } : {}}>
                  {!follow ? 'Follow' : 'Unfollow'}
               </Button>
            ) : (
               <Button
                  type="dashed"
                  danger={!follow}
                  onClick={(e) => {
                     showNotification(e, !follow ? 'warning' : 'success');
                  }}
                  style={!follow && theme === 'light' ? { background: '#fff1f0' } : {}}>
                  {follow ? 'Follow' : 'Unfollow'}
               </Button>
            )
         ) : (
            ''
         )}
      </>
   );
}

export default ButtonCustom;
