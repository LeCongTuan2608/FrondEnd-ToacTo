import React from 'react';
import PropTypes from 'prop-types';
import PostsSkeleton from 'components/PostsSkeleton';

AllPosts.propTypes = {};

function AllPosts(props) {
   return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
         <PostsSkeleton />
         <PostsSkeleton />
         <PostsSkeleton />
      </div>
   );
}

export default AllPosts;
