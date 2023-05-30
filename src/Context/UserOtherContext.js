import User from 'API/User';
import { createContext, useEffect, useState } from 'react';

export const UserOtherContext = createContext({});

export const UserOtherProvider = ({ children }) => {
   const [suggest, setSuggest] = useState([]);
   const [refresh, setRefresh] = useState(false);
   const jwt = {
      type: localStorage.getItem('type'),
      token: localStorage.getItem('token'),
   };
   useEffect(() => {
      const getSuggest = async () => {
         try {
            const response = await User.getSuggest(jwt);
            setSuggest(response.data.results);
         } catch (error) {
            console.log('error:', error);
         }
      };
      getSuggest();
   }, [refresh]);
   return (
      <UserOtherContext.Provider value={{ suggest, setSuggest, refresh, setRefresh }}>
         {children}
      </UserOtherContext.Provider>
   );
};
