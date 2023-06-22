import React from 'react';
import PropTypes from 'prop-types';
import { Skeleton, Space } from 'antd';
import SkeletonUser from '../SkeletonUser';

AllUsers.propTypes = {};

function AllUsers(props) {
   return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
         <SkeletonUser />
         <SkeletonUser />
         <SkeletonUser />
      </div>
   );
}

export default AllUsers;
