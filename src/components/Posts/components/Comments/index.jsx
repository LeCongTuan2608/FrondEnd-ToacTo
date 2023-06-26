import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Comments.module.scss';
import avatar from '../../../../images/avatar.png';
import { useEffect, useState } from 'react';
import Post from 'API/Post';
import InputMes from 'components/ChatBox/InputMes';
import { MoreOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
const cn = classNames.bind(styles);
Comments.propTypes = {};

function Comments(props) {
   const { post } = props;
   const [comments, setComments] = useState([]);
   const [params, SetParams] = useState({ offset: 0, limit: 5 });
   const jwt = {
      type: localStorage.getItem('type'),
      token: localStorage.getItem('token'),
   };
   useEffect(() => {
      const getComments = async () => {
         const res = await Post.getComments(jwt, post.posts_id, params);
         const result = res.data.results;
         setComments((pre) => [...pre, ...result]);
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
         console.log('result:', result);
         setComments((pre) => [result, ...pre]);
      } catch (error) {
         console.log('error:', error);
      }
   };
   const handleLoadMore = (e) => {
      e.preventDefault();
      SetParams((pre) => {
         return { ...pre, offset: comments.length + 1 };
      });
   };
   const handleUpdateCmt = (e) => {};
   const handleDeleteCmt = (id) => {
      setComments((pre) => {
         return pre.filter((cmt) => cmt.id !== id);
      });
   };
   return (
      <>
         <div className={cn('input-comment')}>
            <InputMes onSubmit={onSubmit} />
         </div>
         <div>
            <div className={cn('comments-list')}>
               {comments.map((cmt) => {
                  return (
                     <div key={cmt.id} className={cn('comment')}>
                        <div className={cn('user-avatar')}>
                           <img src={avatar} alt="" />
                        </div>
                        <div className={cn('container')}>
                           <div>
                              <span className={cn('full-name')}>{cmt?.user_info?.full_name}</span>
                              <p className={cn('content')}>{cmt.content}</p>
                           </div>
                        </div>
                        <div className={cn('option')}>
                           <Dropdown
                              placement="bottomLeft"
                              menu={{
                                 items: [
                                    {
                                       label: (
                                          <div onClick={() => handleUpdateCmt(cmt.id)}>
                                             <span>Update comment!</span>
                                          </div>
                                       ),
                                       key: '0',
                                    },
                                    {
                                       label: (
                                          <div onClick={() => handleDeleteCmt(cmt.id)}>
                                             <span>Delete!</span>
                                          </div>
                                       ),
                                       key: '1',
                                       danger: true,
                                    },
                                 ],
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
