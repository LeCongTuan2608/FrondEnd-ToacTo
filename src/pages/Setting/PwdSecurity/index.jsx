import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './PwdSecurity.module.scss';
import { Button, Checkbox, Form, Input, notification } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import User from 'API/User';
const cn = classNames.bind(styles);
PwdSecurity.propTypes = {};

function PwdSecurity(props) {
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
         const data = {
            old_pwd: values.oldPassword,
            new_pwd: values.newPassword,
         };
         const res = await User.changePassword(jwt, data);
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
            <h1>Change your password</h1>
         </div>
         <div style={{ borderRadius: '1rem', padding: '5rem 0', background: 'white' }}>
            <Form
               form={form}
               name="basic"
               labelCol={{
                  span: 7,
               }}
               wrapperCol={{
                  span: 16,
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
                  label="Old Password"
                  name="oldPassword"
                  rules={[
                     {
                        required: true,
                        message: 'Please input your old password!',
                     },
                  ]}>
                  <Input.Password allowClear placeholder="Input your old password" />
               </Form.Item>

               <Form.Item
                  label="New Password"
                  name="newPassword"
                  rules={[
                     {
                        required: true,
                        message: 'Please input new password!',
                     },
                  ]}>
                  <Input.Password allowClear placeholder="Input new password" />
               </Form.Item>

               <Form.Item
                  label="Confirm Password"
                  name="confirmPassword"
                  rules={[
                     {
                        required: true,
                        message: 'Please confirm password!',
                     },
                     ({ getFieldValue }) => ({
                        validator(_, value) {
                           if (!value || getFieldValue('newPassword') === value) {
                              return Promise.resolve();
                           }
                           return Promise.reject(
                              new Error('The new password that you entered do not match!'),
                           );
                        },
                     }),
                  ]}>
                  <Input.Password allowClear placeholder="Confirm password" />
               </Form.Item>
               <Form.Item
                  className={cn('input-field')}
                  style={{ marginBottom: 10 }}
                  wrapperCol={{
                     offset: 7,
                     span: 16,
                  }}>
                  <a className="login-form-forgot" href="#">
                     Forgot password <QuestionCircleOutlined />
                  </a>
               </Form.Item>
               <Form.Item
                  wrapperCol={{
                     offset: 7,
                     span: 16,
                  }}>
                  <Button type="primary" htmlType="submit" loading={loading}>
                     Change password
                  </Button>
               </Form.Item>
            </Form>
         </div>
      </div>
   );
}

export default PwdSecurity;
