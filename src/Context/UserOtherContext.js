import User from 'API/User';
import { createContext, useEffect, useState } from 'react';

export const UserOtherContext = createContext({});

export const UserOtherProvider = ({ children }) => {
   //==================== suggest =============================
   const [suggest, setSuggest] = useState([]);
   const [limitSuggest, setLimitSuggest] = useState(10);
   const [offsetSuggest, setOffSetSuggest] = useState(0);

   //==================== friends =============================
   const [friends, setFriends] = useState([]);
   const [limitFriend, setLimitFriend] = useState(5);
   const [offsetFriend, setOffSetFriend] = useState(0);

   //==================== follower =============================
   const [follower, setFollower] = useState([]);
   const [limitFollower, setLimitFollower] = useState(5);
   const [offsetFollower, setOffSetFollower] = useState(0);

   //==================== following =============================
   const [following, setFollowing] = useState([]);
   const [limitFollowing, setLimitFollowing] = useState(5);
   const [offsetFollowing, setOffSetFollowing] = useState(0);
   //=================================================
   const [newUser, setNewUser] = useState(false);
   const [login, setLogin] = useState(false);
   const jwt = {
      type: localStorage.getItem('type'),
      token: localStorage.getItem('token'),
   };
   const userName = localStorage.getItem('user_name');
   useEffect(() => {
      const getSuggest = async () => {
         try {
            const response = await User.getSuggest(
               { offset: offsetSuggest, limit: limitSuggest },
               jwt,
            );
            const data = response.data.results;
            setSuggest(data);
         } catch (error) {
            console.log('error:', error);
         }
      };
      jwt.token && getSuggest();
   }, [offsetSuggest, limitSuggest, newUser, login]);

   useEffect(() => {
      const getFriends = async () => {
         try {
            const response = await User.getFriends(
               { offset: offsetFriend, limit: limitFriend },
               jwt,
            );
            const data = response.data.results;
            // console.log('response:', response);
            setFriends(data);
         } catch (error) {
            console.log('error:', error);
         }
      };
      jwt.token && getFriends();
   }, [offsetFriend, limitFriend, newUser, login]);

   useEffect(() => {
      const getFollower = async () => {
         try {
            const response = await User.getFollower(
               { limit: limitFollower, offset: offsetFollower },
               jwt,
            );
            const data = response.data.results;
            setFollower(data);
         } catch (error) {
            console.log('error:', error);
         }
      };
      jwt.token && getFollower();
   }, [offsetFollower, limitFollower, newUser, login]);

   useEffect(() => {
      const getFollowing = async () => {
         try {
            const response = await User.getFollowing(
               { limit: limitFollowing, offset: offsetFollowing },
               jwt,
            );
            const data = response.data.results;
            setFollowing(data);
         } catch (error) {
            console.log('error:', error);
         }
      };
      jwt.token && getFollowing();
   }, [offsetFollower, limitFollower, newUser, login]);

   return (
      <UserOtherContext.Provider
         value={{
            suggest,
            friends,
            follower,
            following,
            //
            setLimitSuggest,
            setLimitFriend,
            setLimitFollower,
            setLimitFollowing,
            //
            setOffSetSuggest,
            setOffSetFriend,
            setOffSetFollower,
            setOffSetFollowing,
            //
            setNewUser,
            setSuggest,
            setFriends,
            //
            setLogin,
         }}>
         {children}
      </UserOtherContext.Provider>
   );
};
