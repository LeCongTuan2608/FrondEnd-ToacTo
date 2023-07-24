import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './SearchPage.module.scss';
import { Input, Layout, Radio, Space } from 'antd';
import Posts from 'components/Posts';
import { useContext, useEffect, useState } from 'react';
import PostsSkeleton from 'components/PostsSkeleton';
import img_search from '../../images/search.jpg';
import UserCard from 'components/UserCard';
import User from 'API/User';
import SkeletonUser from 'components/SkeletonUser';
import Admin from 'API/Admin';
import { FrownOutlined } from '@ant-design/icons';
import { ThemeContext, ThemeProvider } from 'Context/ThemeContext';
const { Search } = Input;

const cn = classNames.bind(styles);

SearchPage.propTypes = {};
const dataRadio = [
   { value: 'all', text: 'All' },
   { value: 'post', text: 'Post' },
   { value: 'people', text: 'People' },
   { value: 'image', text: 'Image' },
   { value: 'video', text: 'Video' },
];
function SearchPage(props) {
   const [search, setSreach] = useState([]);
   const [select, setSelect] = useState(dataRadio[0].value);
   const [loading, setLoading] = useState(false);
   const { theme } = useContext(ThemeContext);
   const [q, setQ] = useState('');
   const jwt = {
      type: localStorage.getItem('type'),
      token: localStorage.getItem('token'),
   };
   useEffect(() => {
      if (q !== '') {
         const getSearch = async () => {
            try {
               setLoading(true);
               const res = await User.Search(jwt, { q: q, select: select });
               const results = res.data;
               setSreach(results);
               setLoading(false);
            } catch (error) {
               console.log('error:', error);
            }
         };
         getSearch();
      }
   }, [select]);
   const onSearch = async (value) => {
      try {
         setLoading(true);
         setQ(value);
         const res = await User.Search(jwt, { q: value, select: select });
         const results = res.data;
         setSreach(results);
         setLoading(false);
      } catch (error) {
         console.log('error:', error);
      }
   };
   const onChange = (e) => {
      console.log(`radio checked:${e.target.value}`);
      setSelect(e.target.value);
   };
   const handleBlock = (_, id) => {
      setSreach((pre) => {
         return { ...pre, posts: pre.posts?.filter((item) => item.posts_id !== id) };
      });
   };
   const handleBan = async (_, id) => {
      try {
         await Admin.banPosts(jwt, id);
         setSreach((pre) => {
            return { ...pre, posts: pre.posts?.filter((item) => item.posts_id !== id) };
         });
      } catch (error) {
         console.log('error:', error);
      }
   };
   return (
      <Layout
         style={{
            background: 'unset',
            height: search.length <= 8 ? 'calc(100vh - 64px)' : 'inherit',
         }}>
         <div className={cn('search-wrap', theme === 'light' ? 'theme-light' : 'theme-dark')}>
            <div className={cn('container')}>
               <div>
                  <Search
                     placeholder="input search text"
                     allowClear
                     onSearch={onSearch}
                     size={'large'}
                     style={{
                        width: '100%',
                     }}
                  />
                  <Radio.Group
                     onChange={onChange}
                     defaultValue={dataRadio[0].value}
                     style={{
                        marginTop: 16,
                        display: 'flex',
                        gap: 10,
                        justifyContent: 'center',
                     }}>
                     {dataRadio.map((radio, index) => {
                        return (
                           <Radio.Button key={index} value={radio.value}>
                              {radio.text}
                           </Radio.Button>
                        );
                     })}
                  </Radio.Group>
               </div>
               <div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                     {loading ? (
                        <>
                           <SkeletonUser />
                           <SkeletonUser />
                           <SkeletonUser />
                           <SkeletonUser />
                        </>
                     ) : search?.users?.length > 0 || search?.posts?.length > 0 ? (
                        <>
                           {search?.users?.length > 0 &&
                              (select === 'all' || select === 'people') && (
                                 <div
                                    style={{
                                       display: 'flex',
                                       flexDirection: 'column',
                                       gap: 20,
                                       padding: '10px 0',
                                    }}>
                                    <h1
                                       style={{
                                          margin: 0,
                                          textAlign: 'start',
                                          fontSize: '1.3rem',
                                       }}>
                                       People
                                    </h1>
                                    {search?.users?.map((item, index) => {
                                       return <UserCard key={index} user={item} />;
                                    })}
                                 </div>
                              )}
                           {search?.posts?.length > 0 &&
                              (select === 'all' || select === 'post') && (
                                 <div
                                    style={{
                                       display: 'flex',
                                       flexDirection: 'column',
                                       gap: 20,
                                       padding: '10px 0',
                                    }}>
                                    <h1
                                       style={{
                                          margin: 0,
                                          textAlign: 'start',
                                          fontSize: '1.3rem',
                                       }}>
                                       Posts
                                    </h1>
                                    {search?.posts?.map((item, index) => {
                                       const newUser = { name: 'Le Cong Tuan', followers: 632 };
                                       return (
                                          <Posts
                                             key={item.posts_id}
                                             post={item}
                                             handleBlock={handleBlock}
                                             handleBan={handleBan}
                                          />
                                       );
                                    })}
                                 </div>
                              )}
                        </>
                     ) : (
                        q !== '' && (
                           <h1 style={{ fontSize: '1.3rem' }}>
                              Not found <FrownOutlined />
                           </h1>
                        )
                     )}
                  </div>
                  {q === '' && (
                     <div className={cn('img-wrap')}>
                        <img src={img_search} alt="" />
                     </div>
                  )}
               </div>
            </div>
         </div>
      </Layout>
   );
}

export default SearchPage;
