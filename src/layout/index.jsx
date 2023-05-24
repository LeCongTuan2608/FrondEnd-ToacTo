import { Layout } from 'antd';
import { ThemeContext } from 'Context/ThemeContext';
import Login from 'pages/Login';
import { useContext, useEffect, useState } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import HeaderBar from './HeaderBar';
import classNames from 'classnames/bind';
import styles from './MainLayout.module.scss';
import ChatBox from '../components/ChatBox';
import { useSelector } from 'react-redux/es/exports';
const cn = classNames.bind(styles);

MainLayout.propTypes = {};
const boxChat = [1, 2, 3];
function MainLayout(props) {
   const { theme } = useContext(ThemeContext);
   const navigate = useNavigate();
   const getChatBox = useSelector((state) => state?.chatBox?.chatBoxes);
   const [token, setToken] = useState(localStorage.getItem('token'));
   if (!token) {
      return <Navigate to="/login" replace />;
   }
   // console.log(getChatBox);
   return (
      <div style={{ height: 'auto', position: 'relative' }}>
         <Layout
            style={{ background: theme === 'dark' ? '#18191a' : '#f0f2f5', height: 'inherit' }}>
            <HeaderBar />
            <main style={{ height: 'inherit' }}>
               <Outlet />
            </main>
            <div className={cn('container-chat-box')}>
               {getChatBox.length > 0 &&
                  getChatBox.map((box, index) => {
                     return <ChatBox key={box.id} chatBox={box} />;
                  })}
            </div>
         </Layout>
      </div>
   );
}

export default MainLayout;
