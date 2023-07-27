import React, { useContext, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Avatar, Input, Layout, Modal, Select, Space, Tag } from 'antd';
import styles from './Contents.module.scss';
import classNames from 'classnames/bind';
import { ThemeContext } from 'Context/ThemeContext';
import { UserOutlined } from '@ant-design/icons';
import Posts from 'components/Posts';
import PostsSkeleton from 'components/PostsSkeleton';
import img_avatar_default from '../../../images/img-user-default.jpg';
import PostModal from '../../../components/PostModal';
import Post from 'API/Post';
import Admin from 'API/Admin';
import User from 'API/User';
const cn = classNames.bind(styles);

Contents.propTypes = {};
const { Content, Header } = Layout;

function Contents(props) {
   const [posts, setPosts] = useState([]);
   const { theme } = useContext(ThemeContext);
   const [modalOpen, setModalOpen] = useState(false);
   const [params, SetParams] = useState({ offset: 0, limit: 15 });
   const [isBottomReached, setIsBottomReached] = useState(false);
   const ref = useRef(0);

   const jwt = {
      type: localStorage.getItem('type'),
      token: localStorage.getItem('token'),
   };
   const avatar = localStorage.getItem('avatar');
   useEffect(() => {
      const handleScroll = () => {
         const isScrolledToBottom =
            window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 800;
         setIsBottomReached(isScrolledToBottom);
      };
      window.addEventListener('scroll', handleScroll);
      return () => {
         window.removeEventListener('scroll', handleScroll);
      };
   }, []);
   useEffect(() => {
      if (isBottomReached) {
         SetParams((pre) => ({ ...pre, offset: ref.current }));
      }
   }, [isBottomReached]);
   useEffect(() => {
      const getPosts = async () => {
         try {
            const res = await Post.getPost(jwt, params);
            const results = res.data.feedPosts;
            setPosts((pre) => [...pre, ...results]);
            ref.current = ref.current + results.length + 3;
         } catch (error) {
            console.log('error:', error);
         }
      };
      getPosts();
   }, [params]);
   const handleBlock = (_, id) => {
      setPosts((pre) => {
         return pre.filter((item) => item.posts_id !== id);
      });
   };
   const handleBan = async (_, id) => {
      try {
         await Admin.banPosts(jwt, id);
         setPosts((pre) => pre.filter((item) => item.posts_id !== id));
      } catch (error) {
         console.log('error:', error);
      }
   };
   const handleDelete = async (_, id) => {
      try {
         if (localStorage.getItem('role_id') === '1') {
            await Admin.deletePosts(jwt, id);
         } else {
            await User.deletePosts(jwt, id);
         }
         setPosts((pre) => pre.filter((item) => item.posts_id !== id));
      } catch (error) {
         console.log('error:', error);
      }
   };

   return (
      <Layout
         style={{
            background: theme === 'light' ? '#f0f2f5' : '#18191a',
            color: theme === 'light' ? '' : 'white',
         }}>
         <Header
            className={cn('content-header')}
            style={{
               background: theme === 'light' ? 'white' : '#242526',
            }}>
            <div
               style={{
                  display: 'flex',
                  gap: 15,
               }}>
               <Avatar
                  style={{
                     backgroundColor: '#87d068',
                     width: 35,
                  }}
                  icon={<UserOutlined />}
                  src={avatar || img_avatar_default}
               />
               <Input
                  onClick={(e) => {
                     setModalOpen(true);
                     e.target.focus = false;
                  }}
                  placeholder="What are you thinking...?"
                  className={cn(theme === 'dark' ? 'theme-dark' : 'theme-light')}
                  style={theme === 'dark' ? { background: '#3a3b3c', color: '#fff ' } : {}}
               />
               {modalOpen && <PostModal modalOpen={modalOpen} setModalOpen={setModalOpen} />}
            </div>
            <Space size={[25, 0]} wrap>
               <Tag color="magenta">magenta</Tag>
               <Tag color="red">red</Tag>
               <Tag color="volcano">volcano</Tag>
               <Tag color="orange">orange</Tag>
               <Tag color="gold">gold</Tag>
               <Tag color="lime">lime</Tag>
               <Tag color="green">green</Tag>
               <Tag color="cyan">cyan</Tag>
               <Tag color="blue">blue</Tag>
               <Tag color="geekblue">geekblue</Tag>
               <Tag color="purple">purple</Tag>
            </Space>
         </Header>
         <Content
            style={{
               margin: '20px 0',
               overflow: 'initial',
            }}>
            <div
               className={cn(theme === 'dark' ? 'theme-dark' : 'theme-light')}
               style={{
                  textAlign: 'center',
                  background: theme === 'light' ? 'white' : '#242526',
               }}>
               <div className={cn('posts')}>
                  <>
                     {posts.length > 0 &&
                        posts.map((post) => {
                           return (
                              <Posts
                                 key={post.posts_id}
                                 post={post}
                                 handleBlock={handleBlock}
                                 handleBan={handleBan}
                                 handleDelete={handleDelete}
                              />
                           );
                        })}
                  </>
                  <PostsSkeleton />
                  <PostsSkeleton />
               </div>
            </div>
         </Content>
      </Layout>
   );
}

export default Contents;
