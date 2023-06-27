import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, List, Skeleton } from 'antd';

ItemNotifiSkeleton.propTypes = {};

function ItemNotifiSkeleton(props) {
   return (
      <div style={{ padding: '0.3rem 0.6rem' }}>
         <Skeleton avatar paragraph={{ rows: 1 }} active />
      </div>
   );
}

export default ItemNotifiSkeleton;
