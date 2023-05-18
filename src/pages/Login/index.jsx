import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Checkbox, Divider, Form, Input, Layout } from 'antd';
import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import {
   FacebookOutlined,
   LockOutlined,
   QuestionCircleOutlined,
   UserOutlined,
} from '@ant-design/icons';
import { Navigate, useNavigate } from 'react-router-dom';
import * as yup from 'yup';

const cn = classNames.bind(styles);

Login.propTypes = {};

const loginSchema = yup.object().shape({
   email: yup.string().email('Invalid email').required('Please input your email!'),
   password: yup.string().required('Please input your password!'),
});

function Login(props) {
   const [loadings, setLoading] = useState(false);
   const [token, setToken] = useState(localStorage.getItem('token'));
   const navigate = useNavigate();
   const [form] = Form.useForm();
   const onFinish = (values) => {
      console.log('Success:', values);
      setLoading(true);
      setTimeout(() => {
         localStorage.setItem('token', 'true');
         localStorage.setItem('userName', 'Le Cong Tuan');
         navigate('/');
      }, 2000);
   };
   const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
   };
   const handleClickSignup = (e) => {
      e.preventDefault();
      navigate('/signup');
   };
   //
   // validate form
   const yupSync = {
      async validator({ field }, value) {
         await loginSchema.validateSyncAt(field, { [field]: value });
      },
   };
   if (token) {
      return <Navigate to="/" replace />;
   }
   return (
      <div className={cn('login-wrap')}>
         <div className={cn('login-form')}>
            <div className={cn('form-header')}>
               <span>
                  <h1>
                     <label>Login</label>
                  </h1>
               </span>
            </div>
            <div className={cn('form-main')}>
               <Form
                  name="basic"
                  form={form}
                  wrapperCol={{
                     span: 16,
                  }}
                  style={{
                     maxWidth: 600,
                  }}
                  initialValues={{
                     remember: true,
                  }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off">
                  <Form.Item
                     className={cn('input-field')}
                     label="Email"
                     name="email"
                     labelCol={{
                        span: 5,
                     }}
                     rules={[yupSync]}>
                     <Input
                        prefix={<UserOutlined className="site-form-item-icon" />}
                        placeholder="Email"
                     />
                  </Form.Item>

                  <Form.Item
                     className={cn('input-field')}
                     label="Password"
                     name="password"
                     labelCol={{
                        span: 5,
                     }}
                     rules={[yupSync]}>
                     <Input.Password
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        placeholder="Password"
                     />
                  </Form.Item>

                  <Form.Item
                     className={cn('input-field')}
                     style={{ marginBottom: 5, marginTop: 40 }}>
                     <Button type="primary" htmlType="submit" loading={loadings}>
                        Login
                     </Button>
                  </Form.Item>
                  <Form.Item
                     className={cn('input-field')}
                     style={{ marginBottom: 5, fontStyle: 'italic', color: 'rgb(166, 166, 166)' }}>
                     <span>
                        You don't have an account?
                        <a href="" onClick={handleClickSignup}>
                           {' '}
                           Register
                        </a>
                     </span>
                  </Form.Item>
                  <Divider style={{ margin: 0 }}>Or</Divider>

                  <Form.Item
                     className={cn('input-field', 'input-link')}
                     style={{ marginBottom: 10 }}>
                     <a href="">
                        <FacebookOutlined /> Login with Facebook
                     </a>
                  </Form.Item>
                  <Form.Item className={cn('input-field')} style={{ marginBottom: 10 }}>
                     <a className="login-form-forgot" href="">
                        Forgot password <QuestionCircleOutlined />
                     </a>
                  </Form.Item>
               </Form>
            </div>
            <div className={cn('form-footer')}></div>
         </div>
      </div>
   );
}

export default Login;
