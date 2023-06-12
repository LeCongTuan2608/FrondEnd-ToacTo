import axiosClient from './axiosClient';
const config = (type, token, params) => {
   return { headers: { Authorization: `${type} ${token}` }, params: params || null };
};
const Post = {
   newPost(data, jwt) {
      const url = 'feed-posts/posts/new';
      return axiosClient.post(url, data, {
         headers: {
            Authorization: `${jwt.type} ${jwt.token}`,
            'Content-Type': 'multipart/form-data',
         },
      });
   },
   //    logout(data) {
   //       const url = 'auth/logout';
   //       return axiosClient.post(url, data);
   //    },
   //    // ========================== suggest ================================
   //    getSuggest(params, jwt) {
   //       const url = 'users/suggest';
   //       return axiosClient.get(url, config(jwt.type, jwt.token, params));
   //    },
   //    // ========================== getFollower ================================
   //    getFollower(params, jwt) {
   //       const url = 'users/followers';
   //       return axiosClient.get(url, config(jwt.type, jwt.token, params));
   //    },
   //    // ========================== getFollower ================================
   //    getFollowing(params, jwt) {
   //       const url = 'users/following';
   //       return axiosClient.get(url, config(jwt.type, jwt.token, params));
   //    },
   //    // ========================== friends ================================
   //    getFriends(params, jwt) {
   //       const url = 'users/friends';
   //       return axiosClient.get(url, config(jwt.type, jwt.token, params));
   //    },
   //    // ========================== follow ================================
   //    handleFollow(params, jwt) {
   //       const url = `users/follow/${params}`;
   //       return axiosClient.get(url, config(jwt.type, jwt.token));
   //    },
};
export default Post;
