import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Avatar, Dropdown, Skeleton, Space } from 'antd';
import SkeletonUser from '../../../components/SkeletonUser';
import Admin from 'API/Admin';
import styles from './AllUsers.module.scss';
import classNames from 'classnames/bind';

import { ExclamationCircleOutlined, MoreOutlined, StopOutlined } from '@ant-design/icons';
import { ThemeContext } from 'Context/ThemeContext';
import UsersItem from './UsersItem';
const cn = classNames.bind(styles);

AllUsers.propTypes = {};

function AllUsers(props) {
   const { theme } = useContext(ThemeContext);
   const [users, setUsers] = useState([]);

   const [loading, setLoading] = useState(true);
   const jwt = {
      type: localStorage.getItem('type'),
      token: localStorage.getItem('token'),
   };
   useEffect(() => {
      const getUsers = async () => {
         try {
            const res = await Admin.AllUsers(jwt);
            const data = res.data.results;
            setLoading(false);
            setUsers(data);
         } catch (error) {
            console.log('error:', error);
         }
      };
      getUsers();
   }, []);
   const handleBlock = (_, id) => {
      console.log('id:', id);
   };
   const handleBan = async (_, id) => {
      try {
         const res = await Admin.banUser(jwt, id);
         const result = res.data.result;
         console.log('result:', result);
      } catch (error) {
         console.log('error:', error);
      }
   };
   return (
      <div className={cn('items')}>
         {users.length > 0 ? (
            users.map((item) => {
               return (
                  <UsersItem
                     key={item.user_name}
                     item={item}
                     handleBlock={handleBlock}
                     handleBan={handleBan}
                  />
               );
            })
         ) : (
            <h1>No user has been banned</h1>
         )}
         {loading && (
            <>
               <SkeletonUser />
               <SkeletonUser />
               <SkeletonUser />
            </>
         )}
      </div>
   );
}

export default AllUsers;
