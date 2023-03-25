import './App.css';
import MainLayout from 'layout';
import { useEffect } from 'react';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import Login from 'pages/Login';
import Signup from 'pages/Signup';
import MainContent from 'layout/MainContent';
import Setting from 'pages/Setting';
import Search from 'pages/Search';
import Video from 'pages/Video';
import Profile from 'pages/Profile';
import HelpSupport from 'pages/HelpSupport';
import PageNotFound from 'pages/PageNotFound';
import ErrorBoundary from 'antd/es/alert/ErrorBoundary';
import ListPosts from 'pages/Profile/ListPosts';
import Info from 'pages/Profile/Info';
import Images from 'pages/Profile/Images';
import Videos from 'pages/Profile/Videos';

function App() {
   return (
      <div className="App">
         <BrowserRouter>
            <Routes>
               <Route element={<MainLayout />}>
                  <Route path="/" element={<MainContent />} />
                  <Route path="/search" element={<Search />} />
                  <Route path="/video" element={<Video />} />
                  <Route path="/profile" element={<Profile />}>
                     <Route path="" element={<ListPosts />} />
                     <Route path="info" element={<Info />} />
                     <Route path="images" element={<Images />} />
                     <Route path="videos" element={<Videos />} />
                  </Route>
                  <Route path="/help-support" element={<HelpSupport />} />
                  <Route path="/setting" element={<Setting />} />
               </Route>
               <Route path="/login" element={<Login />} />
               <Route path="/signup" element={<Signup />} />
               <Route path="*" element={<PageNotFound />} />
            </Routes>
         </BrowserRouter>
      </div>
   );
}

export default App;
