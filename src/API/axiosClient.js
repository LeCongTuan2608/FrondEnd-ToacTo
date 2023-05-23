import axios from 'axios';

const url = 'http://localhost:3000/';
const axiosClient = axios.create({
   baseURL: url,
   headers: {
      'Content-Type': 'application/JSON',
   },
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
   function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      if (error.response.status === 401) {
         window.location.replace('/login');
      }
      return Promise.reject(error);
   },
);

export default axiosClient;
