import {
   AliwangwangOutlined,
   BellOutlined,
   ExperimentOutlined,
   HomeOutlined,
   InsuranceOutlined,
   LogoutOutlined,
   MenuOutlined,
   QuestionOutlined,
   SearchOutlined,
   SettingOutlined,
   UserOutlined,
   VideoCameraAddOutlined,
   YuqueOutlined,
} from '@ant-design/icons';
import { Avatar, Badge, Button, Dropdown, Layout, Menu, Space, Switch, Tooltip } from 'antd';
import classNames from 'classnames/bind';
import { ThemeContext } from 'Context/ThemeContext';
import { useContext, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import styles from './HeaderBar.module.scss';
import Switches from './Switches';
import Message from 'components/Message';
import BoxMessage from './BoxMessage';
import BoxNotification from './BoxNotification';
import { useCookies } from 'react-cookie';
import { addChatBox, removeChatBoxAll } from 'store/slices/chatBoxSlice';
import { useDispatch } from 'react-redux';
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
   const navigate = useNavigate();
   const isMobile = useMediaQuery({ query: '(min-width: 501px)' });
   const location = useLocation();
   const dispatch = useDispatch();
   const role = localStorage.getItem('role_id');
   const handleMenuClick = (e) => {
      if (e.key !== '1') {
         setOpen(false);
      }
   };
   const handleOpenChange = (flag) => {
      setOpen(flag);
   };
   const handleClickPage = (e) => {
      switch (e.key) {
         case 'home':
            navigate('/');
            break;
         case 'search':
            navigate('/search');
            break;
         case 'video':
            navigate('/video');
            break;
         case 'profile':
            const userName = localStorage.getItem('user_name');
            navigate(`/profile?user_name=${userName}`);
            break;
         default:
            break;
      }
   };
   // dropdown setting
   const items = [
      {
         key: '1',
         label: (
            <div
               style={{
                  display: 'flex',
                  padding: '5px 0',
                  width: 250,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  position: 'relative',
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
               <Switches />
               {/* <Switch
                  style={{ width: 100 }}
                  checked={theme === 'dark'}
                  checkedChildren="Dark"
                  unCheckedChildren="Light"
               /> */}
            </div>
         ),
      },
      {
         key: '2',
         label: (
            <div
               onClick={() => {
                  navigate('/help-support');
               }}
               style={{ display: 'flex', gap: 15, alignItems: 'center', padding: '5px 0' }}>
               <QuestionOutlined />
               Help & support
            </div>
         ),
      },
      {
         key: '3',
         label: (
            <div
               onClick={() => {
                  navigate('/setting');
               }}
               style={{ display: 'flex', gap: 15, alignItems: 'center', padding: '5px 0' }}>
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
            <div
               onClick={() => {
                  localStorage.clear();
                  dispatch(removeChatBoxAll());
                  navigate('/login');
               }}
               style={{ display: 'flex', gap: 15, alignItems: 'center', padding: '5px 0' }}>
               <LogoutOutlined />
               Logout
            </div>
         ),
      },
   ];

   if (role === '1') {
      const admin = {
         key: '5',
         label: (
            <div
               onClick={() => {
                  navigate('/admin/posts');
               }}
               style={{ display: 'flex', gap: 15, alignItems: 'center', padding: '5px 0' }}>
               <InsuranceOutlined />
               Admin
            </div>
         ),
      };
      items.splice(items.length - 3, 0, admin);
   }
   return (
      <Header
         className={cn('header')}
         style={{ background: theme === 'light' ? 'white' : '#242526' }}>
         {/* logo */}
         {isMobile && (
            <div
               className={cn('header-logo')}
               onClick={() => {
                  navigate('/');
               }}>
               <span>
                  <YuqueOutlined />
                  <h2>ToacTo</h2>
               </span>
            </div>
         )}
         {/*  */}
         <div className={cn('header-nav')}>
            <Menu
               theme={theme}
               mode="horizontal"
               style={{
                  justifyContent: 'center',
                  flex: 1,
                  gap: 10,
                  background: theme === 'light' ? 'white' : '#242526',
               }}
               selectedKeys={[location.pathname.split('/')[1] || 'home']}
               items={pages}
               onClick={handleClickPage}
            />
            <Space size={15} style={{ justifyContent: 'flex-end' }}>
               {isMobile ? (
                  <>
                     <BoxMessage />
                     <BoxNotification />
                     <Dropdown
                        menu={{ items, onClick: handleMenuClick }}
                        trigger={['click']}
                        onOpenChange={handleOpenChange}
                        open={open}>
                        <Tooltip>
                           <Button shape="circle" icon={<SettingOutlined />} size="large" />
                        </Tooltip>
                     </Dropdown>
                  </>
               ) : (
                  <Dropdown menu={{ items }} trigger={['click']} className={cn('setting-drop')}>
                     <Tooltip
                        style={{
                           marginTop: 7,
                        }}>
                        <Button
                           shape="circle"
                           icon={<MenuOutlined />}
                           size="large"
                           style={{
                              border: 'none',
                              height: 33,
                           }}
                        />
                     </Tooltip>
                  </Dropdown>
               )}
            </Space>
         </div>
      </Header>
   );
}

export default HeaderBar;
