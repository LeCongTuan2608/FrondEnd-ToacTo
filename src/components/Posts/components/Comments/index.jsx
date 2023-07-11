import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Comments.module.scss';
import img_avatar_default from '../../../../images/img-user-default.jpg';
import { useEffect, useRef, useState } from 'react';
import Post from 'API/Post';
import InputMes from 'components/ChatBox/InputMes';
import { MoreOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import socket from '../../../../socket';
import InputCmt from '../InputCmt';
import { formatTime } from 'utils';
import { useNavigate } from 'react-router-dom';

const cn = classNames.bind(styles);
Comments.propTypes = {};

function Comments(props) {
   const { post } = props;
   const [comments, setComments] = useState([]);
   const navigate = useNavigate();
   const [params, SetParams] = useState({ offset: 0, limit: 5 });
   const refCmt = useRef(0);
   const jwt = {
      type: localStorage.getItem('type'),
      token: localStorage.getItem('token'),
   };
   const userName = localStorage.getItem('user_name');
   useEffect(() => {
      const getComments = async () => {
         const res = await Post.getComments(jwt, post.posts_id, params);
         const results = res.data.results;
         refCmt.current = refCmt.current + results.length;
         setComments((pre) => [...pre, ...results]);
      };
      getComments();
   }, [params]);
   const onSubmit = async (e) => {
      try {
         const data = {
            content: e,
            img: null,
            posts_id: post.posts_id,
            commentator: localStorage.getItem('user_name'),
            name_commentator: localStorage.getItem('full_name'),
            owner_posts: post.user.user_name,
         };
         const res = await Post.newComment(jwt, data);
         const result = res.data.result;
         setComments((pre) => [result, ...pre]);
         socket.emit('sendNotification', {
            sender: userName,
            receiver: post.user.user_name,
         });
      } catch (error) {
         console.log('error:', error);
      }
   };
   const handleLoadMore = (e) => {
      e.preventDefault();
      SetParams((pre) => {
         return { ...pre, offset: refCmt.current };
      });
   };
   const handleUpdateCmt = (e) => {};
   const handleDeleteCmt = async (id) => {
      try {
         await Post.deleteComments(jwt, id);
         setComments((pre) => {
            return pre.filter((cmt) => cmt.id !== id);
         });
      } catch (error) {
         console.log('error:', error);
      }
   };
   const handleNavigate = (cmt) => {
      if (cmt?.user_comment === userName) navigate(`/profile?user_name=${cmt?.user_comment}`);
      else navigate(`/user?user_name=${cmt?.user_comment}`);
   };
   const commentator = (id) => {
      return [
         {
            label: (
               <div onClick={() => handleUpdateCmt(id)}>
                  <span>Update comment!</span>
               </div>
            ),
            key: '0',
         },
         {
            label: (
               <div onClick={() => handleDeleteCmt(id)}>
                  <span>Delete!</span>
               </div>
            ),
            key: '1',
            danger: true,
         },
      ];
   };
   const otherCommentator = (id) => {
      return [
         {
            label: (
               <div>
                  <span>Report comment!</span>
               </div>
            ),
            key: '0',
         },
         {
            label: (
               <div>
                  <span>Hide comment!</span>
               </div>
            ),
            key: '1',
            danger: true,
         },
      ];
   };
   return (
      <>
         <div className={cn('input-comment')}>
            <InputCmt onSubmit={onSubmit} />
         </div>
         <div>
            <div className={cn('comments-list')}>
               {comments.map((cmt) => {
                  return (
                     <div key={cmt.id} className={cn('comment')}>
                        <div className={cn('user-avatar')}>
                           <img src={cmt.user_info?.avatar?.url || img_avatar_default} alt="" />
                        </div>
                        <div className={cn('container')}>
                           <div>
                              <span className={cn('full-name')}>
                                 <span
                                    onClick={(e) => {
                                       handleNavigate(cmt);
                                    }}
                                    style={{ cursor: 'pointer' }}>
                                    {cmt?.user_info?.full_name}
                                 </span>
                                 <span
                                    style={{
                                       fontSize: '0.8rem',
                                       fontStyle: 'italic',
                                       color: '#999999',
                                       fontWeight: 'initial',
                                    }}>
                                    {formatTime(cmt.createdAt)} ago
                                 </span>
                              </span>
                              <p className={cn('content')}>{cmt.content}</p>
                           </div>
                        </div>
                        <div className={cn('option')}>
                           <Dropdown
                              placement="bottomLeft"
                              menu={{
                                 items:
                                    cmt?.user_info?.user_name === userName
                                       ? commentator(cmt.id)
                                       : otherCommentator(cmt.id),
                              }}
                              trigger={['click']}>
                              <Space>
                                 <MoreOutlined />
                              </Space>
                           </Dropdown>
                        </div>
                     </div>
                  );
               })}
               <div>
                  <a onClick={handleLoadMore}>Load more</a>
               </div>
            </div>
         </div>
      </>
   );
}

export default Comments;
