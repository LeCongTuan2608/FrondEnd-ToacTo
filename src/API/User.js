import axiosClient from './axiosClient';

const config = (type, token) => {
   return { headers: { Authorization: `${type} ${token}` } };
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
   getSuggest(jwt) {
      const url = 'users/suggest';
      return axiosClient.get(url, config(jwt.type, jwt.token));
   },
};
export default User;
