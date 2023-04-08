import React from 'react';
import PropTypes from 'prop-types';
import Posts from 'components/Posts';
import classNames from 'classnames/bind';
import styles from './ListPosts.module.scss';
import { ArrowUpOutlined } from '@ant-design/icons';
const cn = classNames.bind(styles);
ListPosts.propTypes = {};

function ListPosts(props) {
   return (
      <div className={cn('list-wrap')}>
         <Posts />
         <Posts />
         <Posts />
      </div>
   );
}

export default ListPosts;
