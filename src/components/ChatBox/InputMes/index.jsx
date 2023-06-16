import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Dropdown, Input, Menu, Space, Tooltip } from 'antd';
import { DownOutlined, SendOutlined, SmileOutlined } from '@ant-design/icons';
import classNames from 'classnames/bind';
import styles from './InputMes.module.scss';
import { Icons } from 'Icons';
const cn = classNames.bind(styles);
InputMes.propTypes = {};

function InputMes(props) {
   const { onSubmit } = props;
   const [inputMes, setInputMes] = useState('');
   const [open, setOpen] = useState(false);
   const inputRef = useRef(null);
   const btnIconRef = useRef(null);

   useEffect(() => {
      inputRef.current && inputRef.current.focus();
      const handleClickOutsideTab = (e) => {
         const target = e.target;
         if (target.closest('.container') === null && !btnIconRef.current.contains(target)) {
            setOpen(false);
         }
      };
      document.addEventListener('click', handleClickOutsideTab);
      return () => {
         document.removeEventListener('click', handleClickOutsideTab);
      };
   }, []);
   const onInput = (e) => {
      setInputMes(e.target.value);
   };
   const handleSubmit = (e) => {
      if (inputMes.trim()) {
         onSubmit(inputMes);
         setInputMes('');
         inputRef.current.focus();
      }
   };
   const handleOpenModalIcon = (e) => {
      setOpen(!open);
   };
   const handleSelectIcon = (e) => {
      e.stopPropagation();
      if (e.target.nodeName === 'LI') {
         setInputMes((pre) => pre + e.target.innerHTML);
         inputRef.current.focus();
      }
   };
   return (
      <>
         <Input
            type="text"
            placeholder="input with clear icon"
            value={inputMes}
            onInput={onInput}
            onPressEnter={handleSubmit}
            ref={inputRef}
         />
         <div className={cn('icon-wrap')}>
            <Tooltip title="icon" onClick={handleOpenModalIcon}>
               <Button
                  shape="circle"
                  icon={<SmileOutlined />}
                  ref={btnIconRef}
                  className={cn('btn-icon')}
               />
            </Tooltip>
            {open && (
               <div>
                  <div className={cn('container')} onClick={handleSelectIcon}>
                     <ul>
                        {Icons.map((icon) => {
                           return <li key={icon.id}>{icon.label}</li>;
                        })}
                     </ul>
                  </div>
               </div>
            )}
         </div>

         <Tooltip title="submit" onClick={handleSubmit}>
            <Button shape="circle" icon={<SendOutlined />} />
         </Tooltip>
      </>
   );
}

export default InputMes;
