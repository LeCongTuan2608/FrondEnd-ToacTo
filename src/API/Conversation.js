import axiosClient from './axiosClient';

const config = (type, token) => {
   return { headers: { Authorization: `${type} ${token}` } };
};

const Conversation = {
   getAllConversation(jwt) {
      const url = 'conversation';
      return axiosClient.get(url, config(jwt.type, jwt.token));
   },
   checkedConversation(conversationId, jwt) {
      const url = `conversation/checked/${conversationId}`;
      return axiosClient.get(url, config(jwt.type, jwt.token));
   },
   getConversation(user_name, jwt) {
      const url = `conversation/by-user-name/${user_name}`;
      return axiosClient.get(url, config(jwt.type, jwt.token));
   },
   deleteConversation(conversationId, jwt) {
      const url = `conversation/${conversationId}`;
      return axiosClient.delete(url, config(jwt.type, jwt.token));
   },
};
export default Conversation;
