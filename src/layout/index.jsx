import { Layout } from 'antd';
import { ThemeContext } from 'Context/ThemeContext';
import Login from 'pages/Login';
import { useContext, useEffect, useState } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import HeaderBar from './HeaderBar';

MainLayout.propTypes = {};

function MainLayout(props) {
   const { theme } = useContext(ThemeContext);
   const navigate = useNavigate();
   const [token, setToken] = useState(localStorage.getItem('token'));
   if (!token) {
      return <Navigate to="/login" replace />;
   }
   return (
      <div style={{ height: 'auto' }}>
         <Layout
            style={{ background: theme === 'dark' ? '#18191a' : '#f0f2f5', height: 'inherit' }}>
            <HeaderBar />
            <main style={{ height: 'inherit' }}>
               <Outlet />
            </main>
         </Layout>
      </div>
   );
}

export default MainLayout;
