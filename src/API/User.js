import axiosClient from './axiosClient';

const config = (type, token, params) => {
   return { headers: { Authorization: `${type} ${token}` }, params: params || null };
};
const User = {
   //======================== authentication ======================
   login(data) {
      const url = 'auth/login';
      return axiosClient.post(url, data);
   },
   refreshToken(data, jwt) {
      const url = 'token/refresh';
      return axiosClient.post(url, data, config(jwt.type, jwt.token));
   },

   //======================== user actions ========================
   register(data) {
      const url = 'auth/register';
      return axiosClient.post(url, data);
   },
   update(data, jwt) {
      const url = 'auth/register';
      return axiosClient.post(url, data, config(jwt.type, jwt.token));
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
