import React from 'react';
import PropTypes from 'prop-types';
import { Avatar } from 'antd';

AvatarCustom.propTypes = {};

function AvatarCustom(props) {
   return (
      <Avatar
         style={{
            backgroundColor: '#fde3cf',
            color: '#f56a00',
         }}>
         U
      </Avatar>
   );
}

export default AvatarCustom;
