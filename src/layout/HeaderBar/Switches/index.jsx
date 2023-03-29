import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Switch } from 'antd';
import classNames from 'classnames/bind';
import styles from './Switches.module.scss';
import { ThemeContext } from 'Context/ThemeContext';
const cn = classNames.bind(styles);
Switches.propTypes = {};

function Switches(props) {
   const { theme, setTheme } = useContext(ThemeContext);
   const changeTheme = (value) => {
      setTheme(theme === 'light' ? 'dark' : 'light');
   };

   return (
      <div className={cn('toggleWrapper')}>
         <input
            type="checkbox"
            className={cn('dn')}
            id={cn('dn')}
            onChange={changeTheme}
            defaultChecked={theme === 'dark' ? true : false}
         />
         <label htmlFor={cn('dn')} className={cn('toggle')}>
            <span className={cn('toggle__handler')}>
               <span className={cn('crater crater--1')}></span>
               <span className={cn('crater crater--2')}></span>
               <span className={cn('crater crater--3')}></span>
            </span>
            <span className={cn('star', 'star--1')}></span>
            <span className={cn('star', 'star--2')}></span>
            <span className={cn('star', 'star--3')}></span>
            <span className={cn('star', 'star--4')}></span>
            <span className={cn('star', 'star--5')}></span>
            <span className={cn('star', 'star--6')}></span>
         </label>
      </div>
   );
}

export default Switches;
