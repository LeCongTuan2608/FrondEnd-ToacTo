import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PostsSkeleton from 'components/PostsSkeleton';
import Admin from 'API/Admin';
import Posts from 'components/Posts';

AllPosts.propTypes = {};

function AllPosts(props) {
   const [posts, setPosts] = useState([]);
   const [loading, setLoading] = useState(true);
   const jwt = {
      type: localStorage.getItem('type'),
      token: localStorage.getItem('token'),
   };
   useEffect(() => {
      const getPostsBanned = async () => {
         try {
            setLoading(true);
            const res = await Admin.AllPosts(jwt);
            const results = res.data.results;
            setPosts(results);
            setLoading(false);
         } catch (error) {
            console.log('error:', error);
            setLoading(false);
         }
      };
      getPostsBanned();
   }, []);
   const handleBlock = async (e, id) => {};
   const handleBan = async (e, id) => {
      try {
         const res = await Admin.banPosts(jwt, id);
         setPosts((pre) => pre.filter((item) => item.posts_id !== id));
      } catch (error) {
         console.log('error:', error);
      }
   };
   return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
         {posts.length > 0 ? (
            posts.map((item) => {
               return (
                  <Posts
                     key={item.posts_id}
                     post={item}
                     handleBlock={handleBlock}
                     handleBan={handleBan}
                  />
               );
            })
         ) : (
            <h1>There are no posts</h1>
         )}
         {loading && (
            <>
               <PostsSkeleton />
               <PostsSkeleton />
            </>
         )}
      </div>
   );
}

export default AllPosts;
