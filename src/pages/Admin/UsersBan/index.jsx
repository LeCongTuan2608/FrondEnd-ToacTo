import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import SkeletonUser from '../../../components/SkeletonUser';
import { ThemeContext } from 'Context/ThemeContext';
import Admin from 'API/Admin';
import UsersItem from './UsersItem';

UsersBan.propTypes = {};

function UsersBan(props) {
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
            const res = await Admin.UsersBanned(jwt);
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
         setUsers((pre) => pre.filter((u) => u.user_name !== id));
      } catch (error) {
         console.log('error:', error);
      }
   };
   return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
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
            <h1>No user has been banned!!</h1>
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

export default UsersBan;
