import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import { Input, Layout, Radio, Space } from 'antd';
import Posts from 'components/Posts';
import { useContext, useEffect, useState } from 'react';
import PostsSkeleton from 'components/PostsSkeleton';
import img_search from '../../images/search.jpg';
import UserCard from 'components/UserCard';
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
   const [search, setSreach] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);
   const [select, setSelect] = useState(dataRadio[0].value);
   const onSearch = (value) => console.log(value);
   const onChange = (e) => {
      console.log(`radio checked:${e.target.value}`);
      setSelect(e.target.value);
   };
   return (
      <Layout
         style={{
            background: 'unset',
            height: search.length <= 8 ? 'calc(100vh - 64px)' : 'inherit',
         }}>
         <div className={cn('search-wrap')}>
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
                  {search ? (
                     <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                        {search.map((item, index) => {
                           const newUser = { name: 'Le Cong Tuan', followers: 632 };
                           return <UserCard key={index} user={newUser} />;
                        })}
                     </div>
                  ) : (
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
