import {
   DesktopOutlined,
   FileOutlined,
   PieChartOutlined,
   TeamOutlined,
   UserOutlined,
} from '@ant-design/icons';
import { ThemeContext } from 'Context/ThemeContext';
import { Avatar, Input, Layout, Modal, Space, Tag } from 'antd';
import classNames from 'classnames/bind';
import Posts from 'components/Posts';
import PostsSkeleton from 'components/PostsSkeleton';
import { useContext, useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import styles from './Home.module.scss';
import SiderBar from './SiderBar';
import Contents from './Contents';
import User from 'API/User';
import { UserOtherContext } from 'Context/UserOtherContext';
const cn = classNames.bind(styles);

const { Content, Header } = Layout;
Home.propTypes = {};
function Home(props) {
   const { theme } = useContext(ThemeContext);
   const { suggest, follower, following, friends } = useContext(UserOtherContext);
   const isSmallScreen = useMediaQuery({ query: '(min-width: 1262px)' });
   const isTabletOrMobile = useMediaQuery({ query: '(min-width: 932px)' });
   return (
      <Layout
         style={{
            background: theme === 'light' ? '#f0f2f5' : '#18191a',
            alignItems: 'center',
         }}>
         <Layout
            hasSider
            className={cn('layout-wrap')}
            style={{
               background: theme === 'light' ? '#f0f2f5' : '#18191a',
            }}>
            {isSmallScreen && (
               <SiderBar
                  styled={{ css: { left: 0 } }}
                  items={[
                     { title: 'Suggest', users: suggest },
                     { title: 'Followers', users: follower },
                     { title: 'Following', users: following },
                  ]}
               />
            )}
            <Contents />
            {isTabletOrMobile && (
               <SiderBar
                  styled={{ css: { right: 0 } }}
                  items={[{ title: 'Friends', users: [...friends] }]}
               />
            )}
         </Layout>
      </Layout>
   );
}

export default Home;
