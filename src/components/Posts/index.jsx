import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from 'Context/ThemeContext';
import { Avatar, Col, Divider, Dropdown, Image, Layout, Row, Space } from 'antd';
import {
   CommentOutlined,
   HeartOutlined,
   LogoutOutlined,
   MoreOutlined,
   QuestionOutlined,
   SettingOutlined,
   UserOutlined,
} from '@ant-design/icons';
import classNames from 'classnames/bind';
import styles from './Posts.module.scss';
import Images from './components/Images';
const cn = classNames.bind(styles);
const { Header, Content, Footer } = Layout;
Posts.propTypes = {};

function Posts(props) {
   const { theme } = useContext(ThemeContext);
   const [open, setOpen] = useState(false);
   const [like, setLike] = useState(false);
   const [seeMore, setSeeMore] = useState(false);
   const [text, setText] = useState(501);
   const handleLike = (e) => {
      setLike(!like);
   };
   const handleOpenChange = (flag) => {
      setOpen(flag);
   };
   const items = [
      {
         key: '1',
         label: (
            <div style={{ display: 'flex', gap: 15, alignItems: 'center', padding: '5px 20px' }}>
               <QuestionOutlined />
               Report
            </div>
         ),
      },
      {
         key: '2',
         // danger: true,
         label: (
            <div style={{ display: 'flex', gap: 15, alignItems: 'center', padding: '5px 20px' }}>
               <LogoutOutlined />
               Block
            </div>
         ),
      },
   ];
   return (
      <Layout
         className={cn('posts-wrap')}
         style={
            theme === 'light' ? { background: 'white' } : { background: '#242526', color: 'white' }
         }>
         <div className={cn('header-posts', `${theme === 'light' ? 'theme-light' : 'theme-dark'}`)}>
            <Space style={{ width: '100%' }}>
               <Avatar
                  size="large"
                  style={{
                     backgroundColor: '#87d068',
                  }}
                  icon={<UserOutlined />}
               />
               <span>Lê Công Tuấn</span>
               <Dropdown
                  menu={{ items }}
                  trigger={['click']}
                  onOpenChange={handleOpenChange}
                  open={open}>
                  <Avatar
                     className={cn('avatar')}
                     size="large"
                     style={{
                        backgroundColor: theme === 'light' ? 'white' : '#242526',
                        color: theme === 'light' ? 'black' : 'white',
                     }}
                     icon={<MoreOutlined />}
                  />
               </Dropdown>
            </Space>
         </div>
         <Content className={cn('main-posts')}>
            <div style={{ padding: '0 10px', marginBottom: 10 }}>
               <p style={seeMore ? { display: 'block' } : {}}>
                  <span>
                     Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veniam recusandae
                     nobis odio sequi aperiam atque quo dolores voluptate odit illum commodi hic,
                     similique a perferendis aut quis non dolorum. Tempora? Lorem ipsum, dolor sit
                     amet consectetur adipisicing elit. Veniam
                     rccccccccccccccccccccccccccccccccccecusandae nobis odio sequi aperiam atque
                     quodolores voluptate odit illum commodi hic, similique a perferendis aut quis
                     non dolorum. Tempora? Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                     Veniam recusandae nobis odio sequi aperiam atque quo dolores voluptate odit
                     illum commodi hic, similique a perferendis aut quis non dolorum. Tempora? Lorem
                     ipsum, dolor sit amet consectetur adipisicing elit. Veniam recusandae nobis
                     odio sequi aperiam atque quo dolores voluptate odit illum commodi hic,
                     similique a perferendis aut quis non dolorum. Tempora? Lorem ipsum, dolor sit
                     amet consectetur adipisicing elit. Veniam recusandae nobis odio sequi aperiam
                     atque quo dolores voluptate odit illum commodi hic, similique a perferendis aut
                     quis non dolorum. Tempora? Lorem ipsum, dolor sit amet consectetur adipisicing
                     elit. Veniam recusandae nobis odio sequi aperiam atque quo dolores voluptate
                     odit illum commodi hic, similique a perferendis aut quis non dolorum. Tempora?
                     Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veniam recusandae
                     nobis odio sequi aperiam atque quo dolores voluptate odit illum commodi hic,
                     similique a perferendis aut quis non dolorum. Tempora? Lorem ipsum, dolor sit
                     amet consectetur adipisicing elit. Veniam recusandae nobis odio sequi aperiam
                     atque quo dolores voluptate odit illum commodi hic, similique a perferendis aut
                     quis non dolorum. Tempora? Lorem ipsum, dolor sit amet consectetur adipisicing
                     elit. Veniam recusandae nobis odio sequi aperiam atque quo dolores voluptate
                     odit illum commodi hic, similique a perferendis aut quis non dolorum. Tempora?
                     Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veniam recusandae
                     nobis odio sequi aperiam atque quo dolores voluptate odit illum commodi hic,
                     similique a perferendis aut quis non dolorum. Tempora? Lorem ipsum, dolor sit
                     amet consectetur adipisicing elit. Veniam recusandae nobis odio sequi aperiam
                     atque quo dolores voluptate odit illum commodi hic, similique a perferendis aut
                     quis cccccccccccccccccccccccccccc
                  </span>
               </p>
               {text > 500 && (
                  <div>
                     <span
                        onClick={() => {
                           setSeeMore(!seeMore);
                        }}>
                        {!seeMore ? 'See more...' : 'Hidden'}
                     </span>
                  </div>
               )}
            </div>
            <div>
               <Images />
            </div>
         </Content>
         <Divider
            style={{
               background: theme === 'dark' ? '#4a4d4f' : '#ced0d4',
               margin: '10px 15px',
               width: 'unset',
               minWidth: 'unset',
            }}
         />
         <Footer
            className={cn(
               'footer-posts',
               like && 'is-active',
               `${theme === 'light' ? 'theme-light' : 'theme-dark'}`,
            )}
            style={theme === 'light' ? { background: 'white' } : { background: '#242526' }}>
            <Space className={cn('button-wrap')} onClick={handleLike}>
               <HeartOutlined />
               <span>Tym</span>
            </Space>
            <Space className={cn('button-wrap')}>
               <CommentOutlined />
               <span>Comment</span>
            </Space>
         </Footer>
      </Layout>
   );
}

export default Posts;
