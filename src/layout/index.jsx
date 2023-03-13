import { Layout } from 'antd';
import { ThemeContext } from 'Context/ThemeContext';
import Login from 'pages/Login';
import { useContext, useEffect, useState } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import HeaderBar from './HeaderBar';
import MainContent from './MainContent';

MainLayout.propTypes = {};

function MainLayout(props) {
   const { theme } = useContext(ThemeContext);
   const navigate = useNavigate();
   const [token, setToken] = useState(localStorage.getItem('token'));
   if (!token) {
      return <Navigate to="/login" replace />;
   }
   return (
      <div>
         <Layout style={theme === 'dark' ? { background: '#18191a' } : { background: '#f0f2f5' }}>
            <HeaderBar />
            <Outlet />
         </Layout>
      </div>
   );
}

export default MainLayout;
