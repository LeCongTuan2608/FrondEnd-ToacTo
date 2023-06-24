import { config } from 'utils';
import axiosClient from './axiosClient';

const Messages = {
   getAllMessages(conversationId, jwt) {
      const url = `message/${conversationId}`;
      return axiosClient.get(url, config(jwt.type, jwt.token));
   },
   createMessages(data, jwt) {
      const url = `message`;
      return axiosClient.post(url, data, config(jwt.type, jwt.token));
   },
   removeMessages(mesID, jwt) {
      const url = `message/${mesID}`;
      return axiosClient.patch(url, {}, config(jwt.type, jwt.token));
   },
};
export default Messages;
