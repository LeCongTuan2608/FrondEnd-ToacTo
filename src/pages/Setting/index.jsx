import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu } from 'antd';
import { ThemeContext } from 'Context/ThemeContext';
import styles from './Setting.module.scss';
import classNames from 'classnames/bind';
import { ReadOutlined, TeamOutlined } from '@ant-design/icons';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
const cn = classNames.bind(styles);
Setting.propTypes = {};

function getItem(label, key, icon, children, type) {
   return {
      key,
      icon,
      children,
      label,
      type,
   };
}
const items = [
   getItem('Account', 'account_manager', <ReadOutlined />, [
      getItem('Personal information', 'personal-information'),
      getItem('Password and security', 'password-security'),
   ]),
   getItem('Follow', 'follow', <ReadOutlined />, [
      getItem('Following', 'following'),
      getItem('Followers', 'followers'),
   ]),
   getItem('Blocked', 'blocked', <TeamOutlined />, [
      getItem('Blocked posts', 'blocked-posts'),
      getItem('Blocked users', 'blocked-users'),
   ]),
];
function Setting(props) {
   const { theme } = useContext(ThemeContext);
   const location = useLocation();
   const [selectedKey, setSelectedKeys] = useState('personal-information');
   const navigate = useNavigate();
   useEffect(() => {
      if (!location.pathname.split('/')[2]) {
         navigate('personal-information');
      }
   }, []);

   const handleSelectedKey = ({ item, key, keyPath, domEvent }) => {
      console.log('key:', key);
      setSelectedKeys(key);
      navigate(key);
   };

   return (
      <Layout style={{ position: 'relative' }}>
         <div className={cn('slider-bar')}>
            <div className={cn('menu-wrap')}>
               <Menu
                  defaultOpenKeys={['account_manager', 'follow', 'blocked']}
                  mode="inline"
                  theme={theme === 'light' ? 'light' : 'dark'}
                  items={items}
                  selectedKeys={selectedKey}
                  onClick={handleSelectedKey}
               />
            </div>
         </div>
         <div className={cn('container')}>
            <div className={cn('content')}>
               <Outlet />
            </div>
         </div>
      </Layout>
   );
}

export default Setting;
