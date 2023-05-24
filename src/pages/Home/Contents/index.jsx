import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Avatar, Input, Layout, Modal, Select, Space, Tag } from 'antd';
import styles from './Contents.module.scss';
import classNames from 'classnames/bind';
import { ThemeContext } from 'Context/ThemeContext';
import { UserOutlined } from '@ant-design/icons';
import Posts from 'components/Posts';
import PostsSkeleton from 'components/PostsSkeleton';
import img_avt from '../../../images/avatar.png';
import PostModal from '../../../components/PostModal';
const cn = classNames.bind(styles);

Contents.propTypes = {};
const { Content, Header } = Layout;

function Contents(props) {
   const [posts, setPosts] = useState(true);
   const { theme } = useContext(ThemeContext);
   const [modalOpen, setModalOpen] = useState(false);

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
               <PostModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
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
               className={cn(theme === 'dark' ? 'theme-dark' : 'theme-light', 'posts')}
               style={{
                  textAlign: 'center',
                  background: theme === 'light' ? 'white' : '#242526',
               }}>
               <div className={cn('posts')}>
                  {posts ? (
                     <>
                        <Posts />
                        <Posts />
                        <Posts />
                        <Posts />
                        <PostsSkeleton />
                        <PostsSkeleton />
                     </>
                  ) : (
                     <>
                        <PostsSkeleton />
                        <PostsSkeleton />
                     </>
                  )}
               </div>
            </div>
         </Content>
      </Layout>
   );
}

export default Contents;
