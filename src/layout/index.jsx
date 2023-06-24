import { Layout } from 'antd';
import { ThemeContext } from 'Context/ThemeContext';
import Login from 'pages/Login';
import { useContext, useEffect, useState } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import HeaderBar from './HeaderBar';
import classNames from 'classnames/bind';
import styles from './MainLayout.module.scss';
import ChatBox from '../components/ChatBox';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import socket from '../socket';
import chatBoxSlice, { addChatBox } from 'store/slices/chatBoxSlice';
import { useRef } from 'react';
const cn = classNames.bind(styles);

MainLayout.propTypes = {};
const boxChat = [1, 2, 3];
function MainLayout(props) {
   const { theme } = useContext(ThemeContext);
   const navigate = useNavigate();
   const getChatBox = useSelector((state) => state?.chatBox?.chatBoxes);
   const [token, setToken] = useState(localStorage.getItem('token'));
   const userName = localStorage.getItem('user_name');
   const ref = useRef(null);
   const dispatch = useDispatch();
   useEffect(() => {
      if (token) {
         socket.connect();
         socket.emit('setup', localStorage.getItem('user_name'));
      }
      return () => {
         socket.disconnect();
      };
   }, [token]);
   useEffect(() => {
      socket.on('getConversation', (data) => {
         const checked =
            getChatBox.filter((item) => JSON.stringify(item.member) === JSON.stringify(data.member))
               .length === 0;
         if (checked && data.member.includes(userName) && data.last_message.sender !== userName) {
            dispatch(addChatBox(data));
         }
      });
   }, []);
   useEffect(() => {
      socket.on('getMessage', (data) => {
         if (data.sender === userName) {
            if (ref.current) {
               clearInterval(ref.current);
               document.title = 'Toac To';
            }
         }
         if (data.receiver.includes(userName)) {
            let isBlinking = false;
            if (ref.current) {
               clearInterval(ref.current);
            }
            ref.current = setInterval(() => {
               document.title = isBlinking ? 'Toac To' : `${data.full_name} sent you a message!`;
               isBlinking = !isBlinking;
            }, 1300);
         }
      });
   }, []);
   useEffect(() => {
      if (getChatBox.length === 0) {
         if (ref.current) {
            clearInterval(ref.current);
            document.title = 'Toac To';
         }
      }
   }, [getChatBox]);
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
                     return <ChatBox key={box?.id || box?.member.join()} chatBox={box} />;
                  })}
            </div>
         </Layout>
      </div>
   );
}

export default MainLayout;
