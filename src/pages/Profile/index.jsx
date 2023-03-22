import React from 'react';
import PropTypes from 'prop-types';
import styles from './Profile.module.scss';
import classNames from 'classnames/bind';
import { Layout } from 'antd';
import Posts from 'components/Posts';
const cn = classNames.bind(styles);
Profile.propTypes = {};

function Profile(props) {
   return (
      <Layout className={cn('wrapper')}>
         <div className={cn('container')}>
            <div className={cn('container-user')}>
               <div className={cn('user-wrap')}>
                  <div className={cn('user-image-cover')}></div>
                  <div className={cn('user-info')}></div>
               </div>
            </div>
            <div className={cn('container-nav')}></div>
            <div className={cn('container-contents')}>
               <div className={cn('contents-posts')}>
                  <div>
                     <Posts />
                     <Posts />
                     <Posts />
                  </div>
               </div>
            </div>
         </div>
      </Layout>
   );
}

export default Profile;
