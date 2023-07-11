import { config } from 'utils';
import axiosClient from './axiosClient';
const Post = {
   newPost(data, jwt) {
      const url = 'feed-posts/posts/new';
      return axiosClient.post(url, data, config(jwt.type, jwt.token));
   },
   getPost(jwt, params) {
      const url = 'feed-posts';
      return axiosClient.get(url, config(jwt.type, jwt.token, params));
   },
   getPostByUser(jwt, params, userName) {
      const url = `feed-posts/posts/${userName}`;
      return axiosClient.get(url, config(jwt.type, jwt.token, params));
   },
   updatePosts(jwt, id, data) {
      const url = `feed-posts/posts/by-id/${id}`;
      return axiosClient.patch(url, data, config(jwt.type, jwt.token));
   },
   deletePosts(jwt, id) {
      const url = `feed-posts/posts/by-id/${id}`;
      return axiosClient.delete(url, config(jwt.type, jwt.token));
   },
   // ==============================================================
   setLiked(jwt, id) {
      const url = `feed-posts/posts/liked/${id}`;
      return axiosClient.get(url, config(jwt.type, jwt.token));
   },
   getComments(jwt, id, params) {
      const url = `feed-posts/posts/comment/${id}`;
      return axiosClient.get(url, config(jwt.type, jwt.token, params));
   },
   deleteComments(jwt, id) {
      const url = `feed-posts/posts/comment/${id}`;
      return axiosClient.delete(url, config(jwt.type, jwt.token));
   },
   newComment(jwt, data) {
      const url = `feed-posts/posts/comment`;
      return axiosClient.post(url, data, config(jwt.type, jwt.token));
   },
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
