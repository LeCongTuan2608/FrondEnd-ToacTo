import axios from 'axios';
import User from './User';

// const url = 'https://web-social-2c4s.onrender.com/';
const url = 'http://localhost:4000/';
const axiosClient = axios.create({
   baseURL: url,
   // headers: {
   //    'Content-Type': 'application/JSON',
   //    'Content-Type': 'multipart/form-data',
   // },
});
// Add a request interceptor
axios.interceptors.request.use(
   function (config) {
      // Do something before request is sent
      return config;
   },
   function (error) {
      // Do something with request error
      return Promise.reject(error);
   },
);

// Add a response interceptor
axios.interceptors.response.use(
   function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
   },
   async function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      // if (error.response.status === 401) {
      //    window.location.replace('/login');
      // }
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest?.sent) {
         originalRequest.sent = true;
         try {
            const new_access_token = await User.refreshToken(localStorage.getItem('refresh_token'));
            originalRequest.headers.Authorization = `Bearer ${new_access_token}`;
            return axios(originalRequest);
         } catch (error) {
            console.log('error:', error);
            if (error.response.status === 401) window.location.replace('/login');
         }
      }
      return Promise.reject(error);
   },
);

export default axiosClient;
