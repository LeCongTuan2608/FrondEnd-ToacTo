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
const cn = classNames.bind(styles);
const { Header, Content, Footer } = Layout;
Posts.propTypes = {};

function Posts(props) {
   const { theme } = useContext(ThemeContext);
   const [open, setOpen] = useState(false);
   const [like, setLike] = useState(false);
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
         <div className={cn('header-posts')}>
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
                     size="large"
                     style={{
                        backgroundColor: 'white',
                        color: 'black',
                     }}
                     icon={<MoreOutlined />}
                  />
               </Dropdown>
            </Space>
         </div>
         <Content className={cn('main-posts')}>
            <div style={{ padding: '0 10px', marginBottom: 10 }}>
               <p>
                  <span>
                     Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veniam recusandae
                     nobis odio sequi aperiam atque quo dolores voluptate odit illum commodi hic,
                     similique a perferendis aut quis non dolorum. Tempora? Lorem ipsum, dolor sit
                     amet consectetur adipisicing elit. Veniam
                     rccccccccccccccccccccccccccccccccccecusandae nobis odio sequi aperiam atque quo
                     dolores voluptate odit illum commodi hic, similique a perferendis aut quis non
                     dolorum. Tempora? Lorem ipsum, dolor sit amet consectetur adipisicing elit.
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
                     <span>See more...</span>
                  </div>
               )}
            </div>
            <div className={cn('posts-image')}>
               <Image.PreviewGroup>
                  <Image src="https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp" />
                  <Image src="https://gw.alipayobjects.com/zos/antfincdn/x43I27A55%26/photo-1438109491414-7198515b166b.webp" />
                  <Image src="https://gw.alipayobjects.com/zos/antfincdn/cV16ZqzMjW/photo-1473091540282-9b846e7965e3.webp" />
                  <Image src="https://gw.alipayobjects.com/zos/antfincdn/x43I27A55%26/photo-1438109491414-7198515b166b.webp" />
               </Image.PreviewGroup>
            </div>
         </Content>
         <Divider style={{ margin: 10 }} />
         <Footer
            className={cn('footer-posts', like && 'is-active')}
            style={{ background: 'white' }}>
            <Space className={cn('button-wrap')} onClick={handleLike}>
               <HeartOutlined />
               <span>Tym</span>
            </Space>
            <Space>
               <CommentOutlined />
               <span>Comment</span>
            </Space>
         </Footer>
      </Layout>
   );
}

export default Posts;
