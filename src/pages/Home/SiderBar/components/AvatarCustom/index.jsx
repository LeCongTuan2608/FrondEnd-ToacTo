import React from 'react';
import PropTypes from 'prop-types';
import { Avatar } from 'antd';
import avatar_default from '../../../../../images/img-user-default.jpg';
AvatarCustom.propTypes = {};

function AvatarCustom(props) {
   const { avatar } = props;
   return (
      <Avatar
         src={avatar || avatar_default}
         style={{
            backgroundColor: '#fde3cf',
            color: '#f56a00',
         }}>
         U
      </Avatar>
   );
}

export default AvatarCustom;
