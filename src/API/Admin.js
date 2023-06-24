import { config } from 'utils';
import axiosClient from './axiosClient';

const Admin = {
   AllUsers(jwt, params) {
      const url = 'admin/all-users';
      return axiosClient.get(url, config(jwt.type, jwt.token, params));
   },
   AllPosts(jwt, params) {
      const url = 'admin/all-posts';
      return axiosClient.get(url, config(jwt.type, jwt.token, params));
   },
   PostsBanned(jwt, params) {
      const url = 'admin/posts-banned';
      return axiosClient.get(url, config(jwt.type, jwt.token, params));
   },
   UsersBanned(jwt, params) {
      const url = `admin/users-banned`;
      return axiosClient.get(url, config(jwt.type, jwt.token, params));
   },
   banUser(jwt, user_name) {
      const url = `admin/ban-users/${user_name}`;
      return axiosClient.get(url, config(jwt.type, jwt.token));
   },
   banPosts(jwt, id) {
      const url = `admin/ban-posts/${id}`;
      return axiosClient.get(url, config(jwt.type, jwt.token));
   },
};
export default Admin;
