import {
   DesktopOutlined,
   FileOutlined,
   PieChartOutlined,
   TeamOutlined,
   UserOutlined,
} from '@ant-design/icons';
import { ThemeContext } from 'Context/ThemeContext';
import { Avatar, Input, Layout, Space, Tag } from 'antd';
import classNames from 'classnames/bind';
import Posts from 'components/Posts';
import PostsSkeleton from 'components/PostsSkeleton';
import { useContext, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import styles from './Home.module.scss';
import SiderBar from './SiderBar';
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
   const [posts, setPosts] = useState(true);
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
                        placeholder="What are you thinking...?"
                        className={cn(theme === 'dark' ? 'theme-dark' : 'theme-light')}
                        style={theme === 'dark' ? { background: '#3a3b3c', color: '#fff ' } : {}}
                     />
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
            {isTabletOrMobile && (
               <SiderBar styled={{ css: { right: 0 } }} items={[{ title: 'Friends', users }]} />
            )}
         </Layout>
      </Layout>
   );
}

export default Home;
