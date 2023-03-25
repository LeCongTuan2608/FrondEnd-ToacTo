import React from 'react';
import PropTypes from 'prop-types';
import Posts from 'components/Posts';

ListPosts.propTypes = {};

function ListPosts(props) {
   return (
      <>
         <Posts />
         <Posts />
         <Posts />
      </>
   );
}

export default ListPosts;
