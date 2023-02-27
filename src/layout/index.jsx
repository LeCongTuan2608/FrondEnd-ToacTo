import { Layout } from 'antd';
import { ThemeContext } from 'Context/ThemeContext';
import { useContext, useEffect, useState } from 'react';
import HeaderBar from './HeaderBar';
import MainContent from './MainContent';

MainLayout.propTypes = {};

function MainLayout(props) {
   const { theme } = useContext(ThemeContext);
   return (
      <div>
         <Layout style={theme === 'dark' ? { background: '#18191a' } : { background: '#f0f2f5' }}>
            <HeaderBar />
            <MainContent />
         </Layout>
      </div>
   );
}

export default MainLayout;
