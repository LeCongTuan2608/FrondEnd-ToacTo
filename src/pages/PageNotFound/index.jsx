import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

PageNotFound.propTypes = {};

function PageNotFound(props) {
   return (
      <div>
         <h1>404</h1>
         <h1>PAGE NOT FOUND</h1>
         <Link to="/">Back to the Homepage</Link>
      </div>
   );
}

export default PageNotFound;
