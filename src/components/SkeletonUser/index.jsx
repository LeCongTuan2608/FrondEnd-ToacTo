import React from 'react';
import PropTypes from 'prop-types';
import { Skeleton } from 'antd';
SkeletonUser.propTypes = {};

function SkeletonUser(props) {
   return (
      <div
         style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            alignItems: 'flex-start',
            background: 'white',
            padding: '0.6rem',
            borderRadius: '.7rem',
         }}>
         <Skeleton active avatar />
      </div>
   );
}

export default SkeletonUser;
