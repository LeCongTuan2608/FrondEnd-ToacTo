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
import { useContext, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import styles from './Home.module.scss';
import SiderBar from './SiderBar';
import Contents from './Contents';
const cn = classNames.bind(styles);

const { Content, Header } = Layout;
Home.propTypes = {};
function getItem(label, key, icon, children) {
   return {
      key,
      icon,
      children,
      label,
   };
}
const users = [
   { key: '1', icon: <PieChartOutlined />, children: undefined, label: 'Lê Công Tuấn' },
   // getItem('Lê Công Tuấn', '1', <PieChartOutlined />),
   getItem('Lê Công Duy', '2', <DesktopOutlined />),
   getItem('Lê Công Lai', '3', <UserOutlined />),
   getItem('Ngô Thị Thúy', '4', <TeamOutlined />),
   getItem('Lê Công Lộc', '5', <FileOutlined />),
];
function Home(props) {
   const { theme } = useContext(ThemeContext);
   const isSmallScreen = useMediaQuery({ query: '(min-width: 1261px)' });
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
                     { title: 'Suggest', users },
                     { title: 'Followers', users },
                     { title: 'Following', users },
                  ]}
               />
            )}
            <Contents />
            {isTabletOrMobile && (
               <SiderBar styled={{ css: { right: 0 } }} items={[{ title: 'Friends', users }]} />
            )}
         </Layout>
      </Layout>
   );
}

export default Home;
