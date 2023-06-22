import {
   HomeOutlined,
   InsuranceOutlined,
   SearchOutlined,
   UserOutlined,
   VideoCameraAddOutlined,
} from '@ant-design/icons';
import HelpSupport from 'pages/HelpSupport';
import Home from 'pages/Home';
import Profile from 'pages/Profile';
import Images from 'pages/Profile/Images';
import Info from 'pages/Profile/Info';
import ListPosts from 'pages/Profile/ListPosts';
import Videos from 'pages/Profile/Videos';
import Video from 'pages/Video';
import Setting from 'pages/Setting';
import SearchPage from 'pages/SearchPage';
import Admin from 'pages/Admin';
import AllPosts from 'pages/Admin/AllPosts';
import PostsBan from 'pages/Admin/PostsBan';
import AllUsers from 'pages/Admin/AllUsers';
import UsersBan from 'pages/Admin/UsersBan';

export const MainRoutes = [
   {
      path: '/',
      key: 'home',
      label: 'Home',
      icon: <HomeOutlined />,
      element: <Home />,
   },
   {
      path: '/search',
      key: 'search',
      label: 'Search',
      icon: <SearchOutlined />,
      element: <SearchPage />,
   },
   {
      path: '/video',
      key: 'video',
      label: 'Video',
      icon: <VideoCameraAddOutlined />,
      element: <Video />,
   },
   {
      path: '/profile',
      key: 'profile',
      label: 'Profile',
      icon: <UserOutlined />,
      element: <Profile />,
      children: [
         {
            path: '',
            key: 'posts',
            label: 'Posts',
            element: <ListPosts />,
         },
         {
            path: 'info',
            key: 'info',
            label: 'Information',
            element: <Info />,
         },
         {
            path: 'images',
            key: 'images',
            label: 'Images',
            element: <Images />,
         },
         {
            path: 'videos',
            key: 'videos',
            label: 'Video',
            element: <Videos />,
         },
      ],
   },
   {
      path: '/user',
      key: 'user',
      label: 'User',
      icon: <UserOutlined />,
      element: <Profile />,
      children: [
         {
            path: '',
            key: 'posts',
            label: 'Posts',
            element: <ListPosts />,
         },
         {
            path: 'info',
            key: 'info',
            label: 'Information',
            element: <Info />,
         },
         {
            path: 'images',
            key: 'images',
            label: 'Images',
            element: <Images />,
         },
         {
            path: 'videos',
            key: 'videos',
            label: 'Video',
            element: <Videos />,
         },
      ],
   },
   {
      path: '/help-support',
      key: 'help-support',
      label: 'help-support',
      element: <HelpSupport />,
   },
   {
      path: '/setting',
      key: 'setting',
      label: 'Setting',
      element: <Setting />,
   },
   {
      path: '/admin',
      key: 'admin',
      label: 'Admin',
      element: <Admin />,
      children: [
         {
            path: 'posts',
            key: 'posts_manager',
            label: 'Posts Manager',
            element: <AllPosts />,
         },
         {
            path: 'posts/ban',
            key: 'posts_ban',
            label: 'Posts are forbidden',
            element: <PostsBan />,
         },
         {
            path: 'users',
            key: 'users_manager',
            label: 'Images',
            element: <AllUsers />,
         },
         {
            path: 'users/ban',
            key: 'users_ban',
            label: 'Video',
            element: <UsersBan />,
         },
      ],
   },
];
