import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './PwdSecurity.module.scss';
const cn = classNames.bind(styles);

PwdSecurity.propTypes = {};

function PwdSecurity(props) {
   return (
      <div>
         <div>
            <h2>Change Password</h2>
         </div>
         <h1>PwdSecurity</h1>
      </div>
   );
}

export default PwdSecurity;
