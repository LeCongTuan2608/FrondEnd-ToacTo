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
      return axiosClient.post(url, config(jwt.type, jwt.token));
   },
};
export default Conversation;
