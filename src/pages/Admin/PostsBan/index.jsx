import React from 'react';
import PropTypes from 'prop-types';
import PostsSkeleton from 'components/PostsSkeleton';

PostsBan.propTypes = {};

function PostsBan(props) {
   return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
         <PostsSkeleton />
         <PostsSkeleton />
         <PostsSkeleton />
      </div>
   );
}

export default PostsBan;
