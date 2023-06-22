import React from 'react';
import PropTypes from 'prop-types';
import SkeletonUser from '../SkeletonUser';

UsersBan.propTypes = {};

function UsersBan(props) {
   return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
         <SkeletonUser />
         <SkeletonUser />
         <SkeletonUser />
      </div>
   );
}

export default UsersBan;
