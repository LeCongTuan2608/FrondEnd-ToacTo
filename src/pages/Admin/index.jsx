import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Admin.module.scss';
import { Button, Layout, Menu } from 'antd';
import {
   AppstoreOutlined,
   ContainerOutlined,
   DesktopOutlined,
   MailOutlined,
   MenuFoldOutlined,
   MenuUnfoldOutlined,
   PieChartOutlined,
   ReadOutlined,
   TeamOutlined,
} from '@ant-design/icons';
import { ThemeContext } from 'Context/ThemeContext';
import PostsSkeleton from 'components/PostsSkeleton';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
const cn = classNames.bind(styles);

Admin.propTypes = {};
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
   getItem('Posts', 'posts_manager', <ReadOutlined />, [getItem('All Posts', 'posts')]),
   getItem('Users', 'users_manager', <TeamOutlined />, [getItem('All users', 'users')]),
   getItem('Ban', 'ban', <TeamOutlined />, [
      getItem('Posts has been ban', 'posts/ban'),
      getItem('Users has been ban', 'users/ban'),
   ]),
];
function Admin(props) {
   const { theme } = useContext(ThemeContext);
   const location = useLocation();
   const [selectedKey, setSelectedKeys] = useState('posts');
   const navigate = useNavigate();
   const role = localStorage.getItem('role_id');
   useEffect(() => {
      if (!location.pathname.split('/')[2]) {
         navigate('posts');
      }
   }, []);
   const handleSelectedKey = ({ item, key, keyPath, domEvent }) => {
      console.log('key:', key);
      setSelectedKeys(key);
      navigate(key);
   };
   if (role !== '1') {
      return <Navigate to="/" replace />;
   }
   return (
      <Layout style={{ position: 'relative' }}>
         <div
            className={cn('slider-bar')}
            style={{ background: theme === 'dark' ? 'rgb(0,12,23)' : null }}>
            <div className={cn('menu-wrap')}>
               <Menu
                  defaultOpenKeys={['posts_manager', 'users_manager', 'ban']}
                  mode="inline"
                  theme={theme === 'light' ? 'light' : 'dark'}
                  items={items}
                  selectedKeys={selectedKey}
                  onClick={handleSelectedKey}
               />
            </div>
         </div>
         <div
            className={cn('container')}
            style={{ background: theme === 'dark' ? 'rgb(24, 25, 26)' : null }}>
            <div className={cn('content')}>
               <Outlet />
            </div>
         </div>
      </Layout>
   );
}

export default Admin;
