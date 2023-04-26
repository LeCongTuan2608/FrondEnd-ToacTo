import {
   HomeOutlined,
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
import Search from 'pages/Search';
import Video from 'pages/Video';
import Setting from 'pages/Setting';

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
      element: <Search />,
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
];
