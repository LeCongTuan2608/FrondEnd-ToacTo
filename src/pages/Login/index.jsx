import React from 'react';
import PropTypes from 'prop-types';
import { Button, Checkbox, Divider, Form, Input, Layout } from 'antd';
import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import { FacebookOutlined, QuestionCircleOutlined } from '@ant-design/icons';
const cn = classNames.bind(styles);

Login.propTypes = {};

function Login(props) {
   const onFinish = (values) => {
      console.log('Success:', values);
   };
   const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
   };

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
                     rules={[
                        {
                           required: true,
                           type: 'email',
                           message: 'Please input your email!',
                        },
                     ]}>
                     <Input />
                  </Form.Item>

                  <Form.Item
                     className={cn('input-field')}
                     label="Password"
                     name="password"
                     rules={[
                        {
                           required: true,
                           message: 'Please input your password!',
                        },
                     ]}>
                     <Input.Password />
                  </Form.Item>

                  <Form.Item className={cn('input-field')} style={{ marginBottom: 15 }}>
                     <Button type="primary" htmlType="submit">
                        Login
                     </Button>
                  </Form.Item>

                  <Divider>Or</Divider>

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
