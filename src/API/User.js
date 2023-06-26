import { config } from 'utils';
import axiosClient from './axiosClient';

const User = {
   //======================== authentication ======================
   login(data) {
      const url = 'auth/login';
      return axiosClient.post(url, data);
   },
   refreshToken(data) {
      const url = 'token/refresh';
      return axiosClient.post(url, data);
   },
   changePassword(jwt, data) {
      const url = 'auth/change-password';
      return axiosClient.patch(url, data, config(jwt.type, jwt.token));
   },
   changeEmail(jwt, data) {
      const url = 'auth/change-email';
      return axiosClient.patch(url, data, config(jwt.type, jwt.token));
   },

   //======================== user actions ========================
   getUser(jwt, userName) {
      const url = `users/profile/${userName}`;
      return axiosClient.get(url, config(jwt.type, jwt.token));
   },
   register(data) {
      const url = 'auth/register';
      return axiosClient.post(url, data);
   },
   update(data, jwt, user_name) {
      const url = `users/${user_name}`;
      return axiosClient.patch(url, data, config(jwt.type, jwt.token));
   },
   uploadAvatar(data, jwt) {
      const url = `users/avatar`;
      return axiosClient.patch(url, data, config(jwt.type, jwt.token));
   },
   logout(data) {
      const url = 'auth/logout';
      return axiosClient.post(url, data);
   },
   // ========================== suggest ================================
   getSuggest(params, jwt) {
      const url = 'users/suggest';
      return axiosClient.get(url, config(jwt.type, jwt.token, params));
   },
   // ========================== getFollower ================================
   getFollower(params, jwt) {
      const url = 'users/followers';
      return axiosClient.get(url, config(jwt.type, jwt.token, params));
   },
   // ========================== getFollower ================================
   getFollowing(params, jwt) {
      const url = 'users/following';
      return axiosClient.get(url, config(jwt.type, jwt.token, params));
   },
   // ========================== friends ================================
   getFriends(params, jwt) {
      const url = 'users/friends';
      return axiosClient.get(url, config(jwt.type, jwt.token, params));
   },
   // ========================== follow ================================
   handleFollow(params, jwt) {
      const url = `users/follow/${params}`;
      return axiosClient.get(url, config(jwt.type, jwt.token));
   },
};
export default User;
