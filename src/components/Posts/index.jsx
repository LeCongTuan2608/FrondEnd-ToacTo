import {
   CommentOutlined,
   ExclamationCircleOutlined,
   HeartOutlined,
   MoreOutlined,
   StopOutlined,
   UserOutlined,
} from '@ant-design/icons';
import { ThemeContext } from 'Context/ThemeContext';
import { Avatar, Divider, Dropdown, Layout, Space } from 'antd';
import classNames from 'classnames/bind';
import { useContext, useRef, useState } from 'react';
import styles from './Posts.module.scss';
import Images from './components/Images';
import Post from 'API/Post';
import InputMes from 'components/ChatBox/InputMes';
import avatar from '../../images/avatar.png';
import Comment from './components/Comments';
import Comments from './components/Comments';
const cn = classNames.bind(styles);
const { Header, Content, Footer } = Layout;
Posts.propTypes = {};

function Posts(props) {
   const { post } = props;
   const { theme } = useContext(ThemeContext);
   const [open, setOpen] = useState(false);
   const [like, setLike] = useState({
      status: post?.status_liked || 0,
      amount: post?.like_count,
   });

   const [openComment, setOpenComment] = useState(false);
   const [seeMore, setSeeMore] = useState(false);
   const [text, setText] = useState(post?.content.length);
   const jwt = {
      type: localStorage.getItem('type'),
      token: localStorage.getItem('token'),
   };

   const handleLike = async (e) => {
      try {
         setLike((pre) => {
            return {
               status: pre?.status === 0 ? 1 : 0,
               amount: pre?.status === 0 ? pre.amount + 1 : pre.amount - 1,
            };
         });
         const res = await Post.setLiked(jwt, post.posts_id);
      } catch (error) {
         console.log('error:', error);
      }
   };
   const handleOpenChange = (flag) => {
      setOpen(flag);
   };
   const handleComment = (e) => {
      setOpenComment(!openComment);
   };
   const items = [
      {
         key: '1',
         label: (
            <div style={{ display: 'flex', gap: 15, alignItems: 'center', padding: '5px 20px' }}>
               <ExclamationCircleOutlined />
               Report
            </div>
         ),
      },
      {
         key: '2',
         // danger: true,
         label: (
            <div style={{ display: 'flex', gap: 15, alignItems: 'center', padding: '5px 20px' }}>
               <StopOutlined />
               Block
            </div>
         ),
      },
   ];

   return (
      <Layout
         className={cn('posts-wrap')}
         style={
            theme === 'light' ? { background: 'white' } : { background: '#242526', color: 'white' }
         }>
         <div className={cn('header-posts', `${theme === 'light' ? 'theme-light' : 'theme-dark'}`)}>
            <Space style={{ width: '100%' }}>
               <div className={cn('img-avatar')}>
                  <img src={post.user?.avatar?.url} alt="" />
               </div>
               <div className={cn('user')}>
                  <span className={cn('full-name')}>{post?.user.full_name}</span>
                  <span className={cn('user-name')}>{post?.user.user_name}</span>
               </div>
               <Dropdown
                  menu={{ items }}
                  trigger={['click']}
                  onOpenChange={handleOpenChange}
                  open={open}>
                  <Avatar
                     className={cn('avatar')}
                     size="large"
                     style={{
                        backgroundColor: theme === 'light' ? 'white' : '#242526',
                        color: theme === 'light' ? 'black' : 'white',
                     }}
                     icon={<MoreOutlined />}
                  />
               </Dropdown>
            </Space>
         </div>
         <Content className={cn('main-posts')}>
            <div style={{ padding: '0 10px', marginBottom: 10 }}>
               <p style={seeMore ? { display: 'block' } : {}}>
                  <span>{post?.content}</span>
               </p>
               {text > 500 && (
                  <div>
                     <span
                        onClick={() => {
                           setSeeMore(!seeMore);
                        }}>
                        {!seeMore ? 'See more...' : 'Hidden'}
                     </span>
                  </div>
               )}
            </div>
            <div>
               <Images images={post?.images} />
            </div>
         </Content>
         <Divider
            style={{
               background: theme === 'dark' ? '#4a4d4f' : '#ced0d4',
               margin: '3px 15px',
               width: 'unset',
               minWidth: 'unset',
            }}
         />
         <Footer
            className={cn(
               'footer-posts',
               like.status && 'is-active',
               `${theme === 'light' ? 'theme-light' : 'theme-dark'}`,
            )}
            style={theme === 'light' ? { background: 'white' } : { background: '#242526' }}>
            <Space className={cn('button-wrap')} onClick={handleLike}>
               <HeartOutlined />
               <span>Tym {like.amount > 0 ? `(${like.amount})` : null}</span>
            </Space>
            <Space className={cn('button-wrap')} onClick={handleComment}>
               <CommentOutlined />
               <span>Comment {post?.comment_count ? `(${post?.comment_count})` : null}</span>
            </Space>
         </Footer>
         {openComment && <Comments postId={post?.posts_id} />}
      </Layout>
   );
}

export default Posts;
