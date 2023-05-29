import axiosClient from './axiosClient';

const config = (type, token) => {
   return { headers: { Authorization: `${type} ${token}` } };
};
const Messages = {
   getAllMessages(conversationId, jwt) {
      const url = `message/${conversationId}`;
      return axiosClient.get(url, config(jwt.type, jwt.token));
   },
   createMessages(data, jwt) {
      const url = `message`;
      return axiosClient.post(url, data, config(jwt.type, jwt.token));
   },
};
export default Messages;
