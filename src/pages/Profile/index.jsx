import {
   AntDesignOutlined,
   ArrowUpOutlined,
   CameraOutlined,
   EditOutlined,
   FileImageOutlined,
   MessageOutlined,
   PlusOutlined,
   ProfileOutlined,
   UserAddOutlined,
   UserOutlined,
   VideoCameraOutlined,
} from '@ant-design/icons';
import { ThemeContext } from 'Context/ThemeContext';
import { Avatar, Button, Divider, Layout, Menu, Modal, Tooltip } from 'antd';
import classNames from 'classnames/bind';
import { useContext, useEffect, useRef, useState } from 'react';
import {
   Link,
   Navigate,
   Outlet,
   useLocation,
   useNavigate,
   useSearchParams,
} from 'react-router-dom';
import img_avatar_default from '../../images/img-user-default.jpg';
import styles from './Profile.module.scss';
import User from 'API/User';
import Post from 'API/Post';
import ButtonCustom from 'pages/Home/SiderBar/components/ButtonCustom';
import PostModal from 'components/PostModal';
const cn = classNames.bind(styles);
Profile.propTypes = {};

function Profile(props) {
   const { theme } = useContext(ThemeContext);
   const location = useLocation();
   const [showScrollButton, setShowScrollButton] = useState(false);
   const [modalOpen, setModalOpen] = useState(false);
   const [userInfo, setUserInfo] = useState({});
   const [searchParams, setSearchParams] = useSearchParams();
   const [open, setOpen] = useState(false);
   const [confirmLoading, setConfirmLoading] = useState(false);
   const [imagePreview, setImagePreview] = useState();
   const inputFile = useRef();
   const [avatar, setAvatar] = useState();
   const navigate = useNavigate();
   const userName = searchParams.get('user_name');
   const currentUser = localStorage.getItem('user_name');
   const jwt = {
      type: localStorage.getItem('type'),
      token: localStorage.getItem('token'),
   };

   const pathname = userName === currentUser ? 'profile' : 'user';

   useEffect(() => {
      const handleScroll = () => {
         if (window.scrollY > 400) {
            setShowScrollButton(true);
         } else {
            setShowScrollButton(false);
         }
      };
      const handlePageLoad = () => {
         window.scrollTo(0, 0);
      };
      window.addEventListener('scroll', handleScroll);
      window.addEventListener('load', handlePageLoad);
      return () => {
         window.removeEventListener('scroll', handleScroll);
         window.removeEventListener('load', handlePageLoad);
      };
   }, []);
   useEffect(() => {
      const getUser = async () => {
         try {
            !userName && navigate('*');
            const res = await User.getUser(jwt, userName);
            const data = res.data.result;

            setAvatar(data.avatar?.url);
            setUserInfo(data);
         } catch (error) {
            console.log('error:', error);
         }
      };
      getUser();
   }, [location.pathname, pathname]);
   useEffect(() => {
      return () => {
         imagePreview && URL.revokeObjectURL(imagePreview.preview);
      };
   }, [imagePreview, location.pathname, pathname]);

   const path =
      location.pathname.substring(location.pathname.lastIndexOf('/') + 1) === pathname
         ? 'posts'
         : location.pathname.substring(location.pathname.lastIndexOf('/') + 1);
   const onClick = (e) => {
      console.log('e:', e);
   };
   // modal
   const showModal = () => {
      setOpen(true);
   };
   const handleOk = async () => {
      try {
         setConfirmLoading(true);
         const form = new FormData();
         form.append('avatar', imagePreview);
         const res = await User.uploadAvatar(form, jwt);
         localStorage.setItem('avatar', res.data?.file?.path);
         setOpen(false);
         setConfirmLoading(false);
         setAvatar(imagePreview?.preview);
      } catch (error) {
         setConfirmLoading(false);
         console.log('error:', error);
      }
   };
   const handleCancel = () => {
      setOpen(false);
   };
   const handleChange = (e) => {
      const file = e.target.files[0];
      if (file) {
         file.preview = URL.createObjectURL(file);
         setImagePreview(file);
      } else {
         setImagePreview('');
         localStorage.setItem('avatar', null);
      }
   };
   const handleEdit = () => {
      navigate(`/${pathname}/info?user_name=${userName}&edit=true`);
   };

   //
   const handleMoveUp = () => {
      window.scrollTo({
         top: 0,
         behavior: 'smooth',
      });
   };

   const components = [
      {
         label: <Link to={`/${pathname}?user_name=${userName}`}>Posts</Link>,
         key: 'posts',
         icon: <ProfileOutlined />,
      },
      {
         label: <Link to={`/${pathname}/info?user_name=${userName}`}>Information</Link>,
         key: 'info',
         icon: <UserOutlined />,
      },
      {
         label: <Link to={`/${pathname}/images?user_name=${userName}`}>Images</Link>,
         key: 'images',
         icon: <FileImageOutlined />,
      },
      {
         label: <Link to={`/${pathname}/videos?user_name=${userName}`}>Video</Link>,
         key: 'videos',
         icon: <VideoCameraOutlined />,
      },
   ];
   return (
      <Layout className={cn('wrapper')} style={{ background: theme === 'dark' && '#18191a' }}>
         <Modal
            title={
               <div className={cn('title')}>
                  <span>Choose a new avatar</span>
               </div>
            }
            open={open}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}>
            <div className={cn('modal-wrap')}>
               <div className={cn('img-wrap')}>
                  <div
                     onClick={() => {
                        inputFile.current.click();
                     }}>
                     <img src={imagePreview?.preview} alt="" />
                     {!imagePreview && <PlusOutlined />}
                  </div>
               </div>
               <input
                  className={cn('input-file')}
                  onChange={handleChange}
                  type="file"
                  ref={inputFile}
               />
            </div>
         </Modal>
         <div className={cn('container')}>
            <div className={cn('container-user', theme === 'dark' ? 'theme-dark' : 'theme-light')}>
               <div className={cn('user-wrap')}>
                  <div className={cn('user-image-cover')}></div>
                  <div>
                     <div className={cn('user-info')}>
                        <div className={cn('avatar-wrapper')}>
                           <div className={cn('img-avatar')}>
                              <img src={avatar || img_avatar_default} alt="" />
                           </div>
                           <div className={cn('icon-avatar')}>
                              {userName === currentUser && (
                                 <div onClick={showModal}>
                                    <CameraOutlined />
                                 </div>
                              )}
                           </div>
                        </div>
                        <div className={cn('name')}>
                           <h1>{userInfo?.full_name}</h1>
                           <span>{userInfo?.user_name}</span>
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
                           {currentUser === userName ? (
                              <>
                                 <Button
                                    type="primary"
                                    icon={<PlusOutlined />}
                                    size="large"
                                    onClick={() => {
                                       setModalOpen(true);
                                    }}>
                                    Add to news
                                 </Button>
                                 {modalOpen && (
                                    <PostModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
                                 )}
                                 <Button icon={<EditOutlined />} size="large" onClick={handleEdit}>
                                    Edit profile
                                 </Button>
                              </>
                           ) : (
                              <>
                                 <Button type="primary" icon={<UserAddOutlined />} size="large">
                                    Follow
                                 </Button>
                                 <Button icon={<MessageOutlined />} size="large">
                                    Chat
                                 </Button>
                              </>
                           )}
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

            <div
               className={cn('container-contents')}
               style={{ background: theme === 'dark' && '#18191a' }}>
               <div className={cn('contents-components')}>
                  <div style={{ position: 'relative' }}>
                     <Outlet context={[userInfo]} />
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
