import { config } from 'utils';
import axiosClient from './axiosClient';

const Notification = {
   getNotification(jwt, params) {
      const url = 'notification';
      return axiosClient.get(url, config(jwt.type, jwt.token, params));
   },
   checkedNotification(jwt, id) {
      const url = `notification/by-id/${id}`;
      return axiosClient.get(url, config(jwt.type, jwt.token));
   },
   deleteNotification(jwt, id) {
      const url = `notification/by-id/${id}`;
      return axiosClient.delete(url, config(jwt.type, jwt.token));
   },
   checkedAllNotification(jwt) {
      const url = `notification/checked-all`;
      return axiosClient.get(url, config(jwt.type, jwt.token));
   },
};
export default Notification;
