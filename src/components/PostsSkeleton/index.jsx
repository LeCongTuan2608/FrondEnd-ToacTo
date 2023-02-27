import { Divider, Skeleton, Space } from 'antd';
import { ThemeContext } from 'Context/ThemeContext';
import { useContext } from 'react';

PostsSkeleton.propTypes = {};

function PostsSkeleton(props) {
   const { theme } = useContext(ThemeContext);
   return (
      <div
         style={{
            background: theme === 'dark' ? '#242526' : 'white',
            display: 'flex',
            flexDirection: 'column',
            padding: 20,
            borderRadius: 8,
         }}>
         <Space>
            <Skeleton.Avatar active shape="circle" />
            <Skeleton.Input active />
         </Space>
         <br />
         <Skeleton active />
         <Divider />
         <Space style={{ justifyContent: 'space-around', opacity: 1 }}>
            <Skeleton.Input active /> <Skeleton.Input active />
         </Space>
      </div>
   );
}

export default PostsSkeleton;
