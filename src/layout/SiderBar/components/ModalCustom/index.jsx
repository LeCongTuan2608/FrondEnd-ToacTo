import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Avatar, Button, Modal } from 'antd';
import ButtonCustom from '../ButtonCustom';
import AvatarCustom from '../AvatarCustom';
import styles from './ModalCustom.module.scss';
import classNames from 'classnames/bind';
const cn = classNames.bind(styles);

ModalCustom.propTypes = {};

function ModalCustom(props) {
   const { item, children } = props;
   const [open, setOpen] = useState(false);
   const arr = [1, 2, 3, 4, 5];
   return (
      <>
         {item.title !== 'Friends' && (
            <span
               className={cn('see-more')}
               onClick={() => {
                  setOpen(true);
               }}>
               {children}
            </span>
         )}
         <Modal
            title={item.title}
            centered
            open={open}
            onCancel={() => setOpen(false)}
            footer={[]}
            width={520}>
            <div
               style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 15,
                  padding: '15px 0',
               }}>
               {item.users.map((user, index) => {
                  return (
                     <div
                        key={index}
                        style={{
                           display: 'flex',
                           justifyContent: 'space-between',
                           alignItems: 'center',
                           gap: 20,
                        }}>
                        <AvatarCustom />
                        <span style={{ flex: 1 }}>{user.label}</span>
                        <ButtonCustom title={item.title} user={user} />
                     </div>
                  );
               })}
            </div>
         </Modal>
      </>
   );
}

export default ModalCustom;
