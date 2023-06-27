import { config } from 'utils';
import axiosClient from './axiosClient';

const Notification = {
   getNotification(jwt, params) {
      const url = 'notification';
      return axiosClient.get(url, config(jwt.type, jwt.token, params));
   },
};
export default Notification;
