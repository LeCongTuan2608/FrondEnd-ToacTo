import MainLayout from 'layout';
import HelpSupport from 'pages/HelpSupport';
import Home from 'pages/Home';
import Login from 'pages/Login';
import PageNotFound from 'pages/PageNotFound';
import Profile from 'pages/Profile';
import Images from 'pages/Profile/Images';
import Info from 'pages/Profile/Info';
import ListPosts from 'pages/Profile/ListPosts';
import Videos from 'pages/Profile/Videos';
import Search from 'pages/Search';
import Setting from 'pages/Setting';
import Signup from 'pages/Signup';
import Video from 'pages/Video';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

function App() {
   return (
      <div className="App">
         <BrowserRouter>
            <Routes>
               <Route element={<MainLayout />}>
                  <Route path="/" element={<Home />} />
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
