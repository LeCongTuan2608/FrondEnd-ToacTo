import {
   AntDesignOutlined,
   ArrowUpOutlined,
   EditOutlined,
   FileImageOutlined,
   PlusOutlined,
   ProfileOutlined,
   UserOutlined,
   VideoCameraOutlined,
} from '@ant-design/icons';
import { ThemeContext } from 'Context/ThemeContext';
import { Avatar, Button, Divider, Layout, Menu, Tooltip } from 'antd';
import classNames from 'classnames/bind';
import { useContext, useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import img_avatar from '../../images/avatar.png';
import styles from './Profile.module.scss';
const cn = classNames.bind(styles);
Profile.propTypes = {};
const components = [
   {
      label: <Link to={'/profile'}>Posts</Link>,
      key: 'posts',
      icon: <ProfileOutlined />,
   },
   {
      label: <Link to={'/profile/info'}>Information</Link>,
      key: 'info',
      icon: <UserOutlined />,
   },
   {
      label: <Link to={'/profile/images'}>Images</Link>,
      key: 'images',
      icon: <FileImageOutlined />,
   },
   {
      label: <Link to={'/profile/videos'}>Video</Link>,
      key: 'videos',
      icon: <VideoCameraOutlined />,
   },
];
function Profile(props) {
   const { theme } = useContext(ThemeContext);
   const location = useLocation();
   const [showScrollButton, setShowScrollButton] = useState(false);

   useEffect(() => {
      const handleScroll = () => {
         if (window.pageYOffset > 400) {
            setShowScrollButton(true);
         } else {
            setShowScrollButton(false);
         }
      };
      window.addEventListener('scroll', handleScroll);
      return () => {
         window.removeEventListener('scroll', handleScroll);
      };
   }, []);

   const path =
      location.pathname.substring(location.pathname.lastIndexOf('/') + 1) === 'profile'
         ? 'posts'
         : location.pathname.substring(location.pathname.lastIndexOf('/') + 1);
   const onClick = (e) => {
      console.log('click ', e);
   };
   const handleMoveUp = () => {
      window.scrollTo({
         top: 0,
         behavior: 'smooth',
      });
   };
   return (
      <Layout className={cn('wrapper')} style={{ background: theme === 'dark' && '#18191a' }}>
         <div className={cn('container')}>
            <div className={cn('container-user', theme === 'dark' ? 'theme-dark' : 'theme-light')}>
               <div className={cn('user-wrap')}>
                  <div className={cn('user-image-cover')}></div>
                  <div>
                     <div className={cn('user-info')}>
                        <div className={cn('avatar')}>
                           <div>
                              <img src={img_avatar} alt="" />
                           </div>
                        </div>
                        <div className={cn('name')}>
                           <h1>Tuấn Lê</h1>
                           <span>@tuanle</span>
                           <div>
                              <Avatar.Group>
                                 <Avatar src="https://joesch.moe/api/v1/random?key=1" />
                                 <a href="https://ant.design">
                                    <Avatar
                                       style={{
                                          backgroundColor: '#f56a00',
                                       }}>
                                       K
                                    </Avatar>
                                 </a>
                                 <Tooltip title="Ant User" placement="top">
                                    <Avatar
                                       style={{
                                          backgroundColor: '#87d068',
                                       }}
                                       icon={<UserOutlined />}
                                    />
                                 </Tooltip>
                                 <Avatar
                                    style={{
                                       backgroundColor: '#1890ff',
                                    }}
                                    icon={<AntDesignOutlined />}
                                 />
                              </Avatar.Group>
                           </div>
                        </div>
                        <div className={cn('setting')}>
                           <Button type="primary" icon={<PlusOutlined />} size="large">
                              Add to news
                           </Button>
                           <Button icon={<EditOutlined />} size="large">
                              Edit profile
                           </Button>
                        </div>
                     </div>
                     <Divider style={{ margin: '10px 0' }} />
                  </div>
               </div>
               <div className={cn('container-nav')}>
                  <div>
                     <Menu
                        onClick={onClick}
                        selectedKeys={path}
                        mode="horizontal"
                        items={components}
                        className={cn(theme === 'light' ? 'theme-light' : 'theme-dark')}
                        style={{ fontWeight: 500 }}
                     />
                  </div>
               </div>
            </div>

            <div className={cn('container-contents')}>
               <div className={cn('contents-components')}>
                  <div style={{ position: 'relative' }}>
                     <Outlet />
                     {showScrollButton && (
                        <div className={cn('move-up')} onClick={handleMoveUp}>
                           <ArrowUpOutlined />
                        </div>
                     )}
                  </div>
               </div>
            </div>
         </div>
      </Layout>
   );
}

export default Profile;
