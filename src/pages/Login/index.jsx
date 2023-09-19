import React, { useState, useEffect, useContext } from 'react';
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
import User from 'API/User';
import { UserOtherContext } from 'Context/UserOtherContext';
import { useCookies } from 'react-cookie';

const cn = classNames.bind(styles);

Login.propTypes = {};

const loginSchema = yup.object().shape({
   email: yup.string().email('Invalid email').required('Please input your email!'),
   pwd: yup.string().required('Please input your password!'),
});

function Login(props) {
   const { setLimitSuggest, setNewUser, setLogin } = useContext(UserOtherContext);
   const [loadings, setLoading] = useState(false);
   const [token, setToken] = useState(localStorage.getItem('token'));
   const [errorMes, setErrorMes] = useState('');
   const navigate = useNavigate();
   const [form] = Form.useForm();

   const onFinish = async (values) => {
      try {
         errorMes && setErrorMes('');
         setLoading(true);
         const user = await User.login(values);
         const response = user.data;
         if (response.ban) {
            setErrorMes('Sorry, this account has been banned :(');
            setLoading(false);
         } else {
            localStorage.setItem('full_name', response.full_name);
            localStorage.setItem('email', response.email);
            localStorage.setItem('user_name', response.user_name);
            localStorage.setItem('avatar', response.avatar?.url);
            localStorage.setItem('role_id', response.role_id);
            localStorage.setItem('type', response.type);
            localStorage.setItem('token', response.token);
            localStorage.setItem('refresh_token', response.refreshToken);
            localStorage.setItem('token_expires', response.tokenExpires);
            localStorage.setItem('refresh_token_expires', response.refreshTokenExpires);
            setLogin((pre) => !pre);
            setNewUser((pre) => !pre);
            setTimeout(() => {
               setLoading(false);
               navigate('/');
            }, 2500);
         }
      } catch (error) {
         setLoading(false);
         console.log('error:', error);
         setErrorMes(error?.response?.data?.mes || 'An error occurred while logging in :(');
      }
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
         <div className={cn('background')}>
            <svg
               version="1.1"
               xmlns="http://www.w3.org/2000/svg"
               xmlnsXlink="http://www.w3.org/1999/xlink"
               x="0px"
               y="0px"
               width="100%"
               height="100%"
               viewBox="0 0 1600 900"
               preserveAspectRatio="xMidYMax slice">
               <defs>
                  <linearGradient id="bg">
                     <stop offset="0%" stopColor="rgba(130, 158, 249, 0.06)" />
                     <stop offset="50%" stopColor="rgba(76, 190, 255, 0.6)" />
                     <stop offset="100%" stopColor="rgba(115, 209, 72, 0.2)" />
                  </linearGradient>
                  <path
                     id="wave"
                     fill="url(#bg)"
                     d="M-363.852,502.589c0,0,236.988-41.997,505.475,0 s371.981,38.998,575.971,0s293.985-39.278,505.474,5.859s493.475,48.368,716.963-4.995v560.106H-363.852V502.589z"
                  />
               </defs>
               <g>
                  <use xlinkHref="#wave" opacity=".3">
                     <animateTransform
                        attributeName="transform"
                        attributeType="XML"
                        type="translate"
                        dur="10s"
                        calcMode="spline"
                        values="270 230; -334 180; 270 230"
                        keyTimes="0; .5; 1"
                        keySplines="0.42, 0, 0.58, 1.0;0.42, 0, 0.58, 1.0"
                        repeatCount="indefinite"
                     />
                  </use>
                  <use xlinkHref="#wave" opacity=".6">
                     <animateTransform
                        attributeName="transform"
                        attributeType="XML"
                        type="translate"
                        dur="8s"
                        calcMode="spline"
                        values="-270 230;243 220;-270 230"
                        keyTimes="0; .6; 1"
                        keySplines="0.42, 0, 0.58, 1.0;0.42, 0, 0.58, 1.0"
                        repeatCount="indefinite"
                     />
                  </use>
                  <use xlinkHref="#wave" opacity=".9">
                     <animateTransform
                        attributeName="transform"
                        attributeType="XML"
                        type="translate"
                        dur="6s"
                        calcMode="spline"
                        values="0 230;-140 200;0 230"
                        keyTimes="0; .4; 1"
                        keySplines="0.42, 0, 0.58, 1.0;0.42, 0, 0.58, 1.0"
                        repeatCount="indefinite"
                     />
                  </use>
               </g>
            </svg>
         </div>
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
                     name="pwd"
                     labelCol={{
                        span: 5,
                     }}
                     rules={[yupSync]}>
                     <Input.Password
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        placeholder="Password"
                     />
                  </Form.Item>
                  {errorMes !== '' && (
                     <div style={{ color: 'red' }}>
                        <span>{errorMes}</span>
                     </div>
                  )}
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
