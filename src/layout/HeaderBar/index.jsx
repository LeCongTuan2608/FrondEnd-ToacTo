import {
   AliwangwangOutlined,
   BellOutlined,
   ExperimentOutlined,
   HomeOutlined,
   LogoutOutlined,
   QuestionOutlined,
   SearchOutlined,
   SettingOutlined,
   UserOutlined,
   VideoCameraAddOutlined,
} from '@ant-design/icons';
import { Avatar, Badge, Dropdown, Layout, Menu, Space, Switch } from 'antd';
import classNames from 'classnames/bind';
import { ThemeContext } from 'Context/ThemeContext';
import { useContext, useState } from 'react';
import styles from './HeaderBar.module.scss';
//
const cn = classNames.bind(styles);
const { Header, Sider } = Layout;
HeaderBar.propTypes = {};
const pages = [
   {
      path: '/',
      key: 'home',
      label: 'Home',
      icon: <HomeOutlined />,
   },
   {
      path: '/search',
      key: 'search',
      label: 'Search',
      icon: <SearchOutlined />,
   },
   {
      path: '/video',
      key: 'video',
      label: 'Video',
      icon: <VideoCameraAddOutlined />,
   },
   {
      path: '/profile',
      key: 'profile',
      label: 'Profile',
      icon: <UserOutlined />,
   },
];
function HeaderBar(props) {
   const [open, setOpen] = useState(false);
   const { theme, setTheme } = useContext(ThemeContext);
   const changeTheme = (value) => {
      setTheme(theme === 'light' ? 'dark' : 'light');
   };
   const handleMenuClick = (e) => {
      if (e.key === '4') {
         setOpen(false);
      }
   };
   const handleOpenChange = (flag) => {
      setOpen(flag);
   };
   const items = [
      {
         key: '1',
         label: (
            <div
               onClick={changeTheme}
               style={{
                  display: 'flex',
                  padding: '5px 0',
                  width: 250,
                  justifyContent: 'space-between',
                  alignItems: 'center',
               }}>
               <div
                  style={{
                     display: 'flex',
                     gap: 15,
                     padding: '5px 0',
                     width: 250,
                  }}>
                  <ExperimentOutlined />
                  Theme
               </div>
               <Switch
                  style={{ width: 100 }}
                  checked={theme === 'dark'}
                  checkedChildren="Dark"
                  unCheckedChildren="Light"
               />
            </div>
         ),
      },
      {
         key: '2',
         label: (
            <div style={{ display: 'flex', gap: 15, alignItems: 'center', padding: '5px 0' }}>
               <QuestionOutlined />
               Help & support
            </div>
         ),
      },
      {
         key: '3',
         label: (
            <div style={{ display: 'flex', gap: 15, alignItems: 'center', padding: '5px 0' }}>
               <SettingOutlined />
               Setting
            </div>
         ),
      },
      {
         type: 'divider',
      },
      {
         key: '4',
         danger: true,
         label: (
            <div style={{ display: 'flex', gap: 15, alignItems: 'center', padding: '5px 0' }}>
               <LogoutOutlined />
               Logout
            </div>
         ),
      },
   ];
   const handleClickPage = (e) => {
      console.log(e);
   };
   return (
      <Header
         className={cn('header')}
         style={{ background: theme === 'light' ? 'white' : '#242526' }}>
         {/* logo */}
         <div
            style={{
               width: '100%',
               maxWidth: '250px',
               height: 31,
               margin: '16px 24px 16px 0',
               background: 'rgba(65, 40, 255, 0.2)',
            }}
         />
         {/*  */}
         <div
            style={{
               display: 'flex',
               justifyContent: 'space-between',
               width: '100%',
            }}>
            <Menu
               theme={theme}
               mode="horizontal"
               style={{
                  justifyContent: 'center',
                  flex: 1,
                  gap: 10,
                  background: theme === 'light' ? 'white' : '#242526',
               }}
               defaultSelectedKeys={['home']}
               items={pages}
               onClick={handleClickPage}
            />
            <Space size={15} wrap style={{ width: 250, justifyContent: 'flex-end' }}>
               <Dropdown menu={{ items }} trigger={['click']}>
                  <Badge count={4}>
                     <Avatar
                        size="large"
                        style={{
                           backgroundColor: '#f9f0ff',
                           color: '#531dab',
                        }}
                        icon={<AliwangwangOutlined />}
                     />
                  </Badge>
               </Dropdown>

               <Dropdown menu={{ items }} trigger={['click']}>
                  <Avatar
                     size="large"
                     style={{
                        backgroundColor: '#f0f5ff',
                        color: '#1d39c4',
                     }}
                     icon={<BellOutlined />}
                  />
               </Dropdown>

               <Dropdown
                  menu={{ items, onClick: handleMenuClick }}
                  trigger={['click']}
                  onOpenChange={handleOpenChange}
                  open={open}>
                  <Avatar
                     size="large"
                     style={{
                        backgroundColor: '#fff7e6',
                        color: '#d46b08',
                     }}
                     icon={<SettingOutlined />}
                  />
               </Dropdown>
            </Space>
         </div>
      </Header>
   );
}

export default HeaderBar;
