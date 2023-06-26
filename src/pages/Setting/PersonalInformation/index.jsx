import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Input, notification } from 'antd';
import { MailOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import User from 'API/User';

PersonalInformation.propTypes = {};

function PersonalInformation(props) {
   const [form] = Form.useForm();
   const [loading, setLoading] = useState(false);
   const [api, contextHolder] = notification.useNotification();
   const jwt = {
      type: localStorage.getItem('type'),
      token: localStorage.getItem('token'),
   };
   const openNotification = (type, placement) => {
      api[type]({
         message: placement,
         placement,
      });
   };
   const onFinish = async (values) => {
      try {
         setLoading(true);
         const res = await User.changeEmail(jwt, values);
         setTimeout(() => {
            setLoading(false);
            form.resetFields();
            openNotification('success', res.data.message);
         }, 1000);
      } catch (error) {
         console.log('error:', error);
         setTimeout(() => {
            setLoading(false);
            openNotification('error', error.response.data.mes);
         }, 1000);
      }
   };
   const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
   };
   return (
      <div style={{ borderRadius: '1rem', padding: '1rem 0', background: 'white' }}>
         {contextHolder}
         <div style={{ textAlign: 'start', padding: '0 2rem' }}>
            <h1>Change you email</h1>
         </div>
         <div style={{ padding: '8rem 0' }}>
            <Form
               form={form}
               name="basic"
               labelCol={{
                  span: 5,
               }}
               wrapperCol={{
                  span: 17,
               }}
               style={{
                  padding: '0 3rem',
                  textAlign: 'start',
                  display: 'flex',
                  flexDirection: 'column',
               }}
               initialValues={{
                  remember: true,
               }}
               onFinish={onFinish}
               onFinishFailed={onFinishFailed}
               autoComplete="off">
               <Form.Item
                  name="email"
                  label="E-mail"
                  rules={[
                     {
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                     },
                     {
                        required: true,
                        message: 'Please input new E-mail!',
                     },
                  ]}>
                  <Input
                     prefix={<MailOutlined className="site-form-item-icon" />}
                     allowClear
                     placeholder="Please input new email!"
                  />
               </Form.Item>
               <Form.Item
                  wrapperCol={{
                     offset: 10,
                     span: 0,
                  }}>
                  <Button type="primary" htmlType="submit" loading={loading}>
                     Change email
                  </Button>
               </Form.Item>
            </Form>
         </div>
      </div>
   );
}

export default PersonalInformation;
