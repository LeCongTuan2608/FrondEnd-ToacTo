import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Input, Tooltip } from 'antd';
import { SendOutlined } from '@ant-design/icons';

InputMes.propTypes = {};

function InputMes(props) {
   const { onSubmit } = props;
   const [inputMes, setInputMes] = useState('');
   const inputRef = useRef(null);
   const onInput = (e) => {
      setInputMes(e.target.value);
   };
   const handleSubmit = (e) => {
      if (inputMes.trim()) {
         onSubmit(inputMes);
         setInputMes('');
      }
   };

   return (
      <>
         <Input
            type="text"
            placeholder="input with clear icon"
            allowClear
            value={inputMes}
            onInput={onInput}
            onPressEnter={handleSubmit}
         />
         <Tooltip title="send" onClick={handleSubmit}>
            <Button shape="circle" icon={<SendOutlined />} />
         </Tooltip>
      </>
   );
}

export default InputMes;
