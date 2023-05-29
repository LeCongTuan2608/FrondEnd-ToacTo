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
import Search from 'pages/SearchPage';
import Setting from 'pages/Setting';
import Signup from 'pages/Signup';
import Video from 'pages/Video';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { MainRoutes } from 'routes';
import { useContext, useEffect } from 'react';
import { ThemeContext } from 'Context/ThemeContext';

function App() {
   const { theme } = useContext(ThemeContext);

   return (
      <div className="App" style={{ background: theme === 'light' ? null : 'rgb(24, 25, 26)' }}>
         <BrowserRouter>
            <Routes>
               <Route element={<MainLayout />}>
                  {MainRoutes.map((item) => {
                     if (item.children)
                        return (
                           <Route path={item.path} element={item.element} key={item.key}>
                              {item.children.map((childItem) => {
                                 return (
                                    <Route
                                       path={childItem.path}
                                       element={childItem.element}
                                       key={childItem.key}
                                    />
                                 );
                              })}
                           </Route>
                        );
                     return <Route path={item.path} element={item.element} key={item.key} />;
                  })}
                  {/* <Route path="/" element={<Home />} />
                  <Route path="/search" element={<Search />} />
                  <Route path="/video" element={<Video />} />
                  <Route path="/profile" element={<Profile />}>
                     <Route path="" element={<ListPosts />} />
                     <Route path="info" element={<Info />} />
                     <Route path="images" element={<Images />} />
                     <Route path="videos" element={<Videos />} />
                  </Route>
                  <Route path="/help-support" element={<HelpSupport />} />
                  <Route path="/setting" element={<Setting />} /> */}
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
