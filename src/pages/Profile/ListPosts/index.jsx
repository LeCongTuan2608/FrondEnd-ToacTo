import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Posts from 'components/Posts';
import classNames from 'classnames/bind';
import styles from './ListPosts.module.scss';
import { ArrowUpOutlined } from '@ant-design/icons';
import PostsSkeleton from 'components/PostsSkeleton';
import { useLocation, useSearchParams } from 'react-router-dom';
import Post from 'API/Post';
import User from 'API/User';
const cn = classNames.bind(styles);
ListPosts.propTypes = {};

function ListPosts(props) {
   const [posts, setPosts] = useState([]);
   const [loading, setLoading] = useState(true);
   const [searchParams, setSearchParams] = useSearchParams();
   const userName = searchParams.get('user_name');
   const jwt = {
      type: localStorage.getItem('type'),
      token: localStorage.getItem('token'),
   };
   const location = useLocation();
   useEffect(() => {
      const getPosts = async () => {
         try {
            const res = await Post.getPostByUser(jwt, {}, userName);
            const results = res.data.results;
            setPosts(results);
            setLoading(false);
         } catch (error) {
            console.log('error:', error);
            setLoading(false);
         }
      };
      getPosts();
   }, [location.pathname]);
   return (
      <div className={cn('list-wrap')}>
         {loading ? (
            <>
               <PostsSkeleton key={1} />
               <PostsSkeleton key={2} />
            </>
         ) : posts.length > 0 ? (
            posts.map((post) => {
               return <Posts key={post.posts_id} post={post} />;
            })
         ) : (
            <div className={cn('posts-is-empty')}>
               <h2>You don't have any posts!!</h2>
            </div>
         )}
      </div>
   );
}

export default ListPosts;
