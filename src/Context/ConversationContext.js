import Conversation from 'API/Conversation';
import User from 'API/User';
import { createContext, useEffect, useState } from 'react';

export const ConversationContext = createContext({});

export const ConversationProvider = ({ children }) => {
   const [conversation, setConversation] = useState([]);
   const [mesNotSeen, setMesNotSeen] = useState(0);
   const [refresh, setRefresh] = useState(false);
   const jwt = {
      type: localStorage.getItem('type'),
      token: localStorage.getItem('token'),
   };
   const user_name = localStorage.getItem('user_name');
   useEffect(() => {
      const getConversation = async () => {
         try {
            const response = await Conversation.getAllConversation(jwt);
            const data = response?.data?.conversation;
            const count = data && data.filter((conv) => !conv?.checked?.includes(user_name));
            setMesNotSeen(count.length);
            setConversation(data);
         } catch (error) {
            console.log('error:', error);
         }
      };
      jwt.token && getConversation();
   }, [refresh]);
   useEffect(() => {
      const count =
         conversation && conversation.filter((conv) => !conv?.checked?.includes(user_name));
      jwt.token && setMesNotSeen(count.length);
   }, [conversation]);
   return (
      <ConversationContext.Provider
         value={{ conversation, setConversation, mesNotSeen, setMesNotSeen, setRefresh }}>
         {children}
      </ConversationContext.Provider>
   );
};
