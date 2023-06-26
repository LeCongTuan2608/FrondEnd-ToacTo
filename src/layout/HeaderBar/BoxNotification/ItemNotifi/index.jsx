import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './ItemNotifi.module.scss';
import img_avatar_default from '../../../../images/img-user-default.jpg';
import { Button, Dropdown, Tooltip } from 'antd';
import { CheckOutlined, DeleteOutlined, MoreOutlined } from '@ant-design/icons';
const cn = classNames.bind(styles);
ItemNotifi.propTypes = {};

function ItemNotifi(props) {
   const [checked, setChecked] = useState(false);

   const items = [
      {
         key: '1',
         label: (
            <div style={{ display: 'flex', gap: 15, alignItems: 'center', padding: '5px 20px' }}>
               <CheckOutlined />
               {checked ? 'Mark as read' : 'Mark as unread'}
            </div>
         ),
      },
      {
         key: '2',
         danger: true,
         label: (
            <div style={{ display: 'flex', gap: 15, alignItems: 'center', padding: '5px 20px' }}>
               <DeleteOutlined />
               Delete
            </div>
         ),
      },
   ];
   return (
      <div className={cn('wrapper')}>
         <div>
            <div className={cn('notifi-wrap')}>
               <div className={cn('item-first')}>
                  <img src={img_avatar_default} alt="" />
               </div>
               <div className={cn('item-middle')}>
                  <div className={cn('middle-child')}>
                     <div>
                        <p>
                           ai do da like bai viet cua ban ai do da like bai viet cua banai do da
                           like bai viet cua banai do da like bai viet cua ban
                        </p>
                        <span
                           style={{
                              fontWeight: checked ? 450 : 500,
                              color: checked ? null : 'rgb(0 96 230)',
                           }}>
                           10phut truoc
                        </span>
                     </div>
                  </div>
                  <div className={cn('item-end')}>{!checked && <div></div>}</div>
               </div>
            </div>
         </div>

         <div className={cn('btn-more')}>
            <div>
               <Tooltip>
                  <Dropdown menu={{ items }} trigger={['click']}>
                     <Button shape="circle" icon={<MoreOutlined />} />
                  </Dropdown>
               </Tooltip>
            </div>
         </div>
      </div>
   );
}

export default ItemNotifi;
