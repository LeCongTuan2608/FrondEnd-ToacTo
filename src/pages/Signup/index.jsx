import {
   EnvironmentOutlined,
   FacebookOutlined,
   GlobalOutlined,
   LockOutlined,
   PhoneOutlined,
   UserOutlined,
} from '@ant-design/icons';
import { Button, DatePicker, Divider, Form, Input, Select, notification } from 'antd';
import classNames from 'classnames/bind';
import { useRef, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import styles from './Signup.module.scss';
import * as yup from 'yup';
import User from 'API/User';
const { Option } = Select;
const cn = classNames.bind(styles);
Signup.propTypes = {};

const signupSchema = yup.object().shape({
   user_name: yup
      .string()
      .min(5, 'Too short!')
      .max(50, 'Too long!')
      .required('Please input your user name!'),
   full_name: yup
      .string()
      .min(5, 'Too short!')
      .max(50, 'Too long!')
      .required('Please input your full name!'),
   email: yup.string().email('Invalid email').required('Please input your email!'),
   pwd: yup
      .string()
      .min(5, 'Too short!')
      .max(100, 'Too long!')
      .required('Please input your password!'),
   confirm: yup.string().required('Please input your confirm password!'),
   gender: yup.string().oneOf(['male', 'female', 'other']).required('Please select your gender!'),
   birth_day: yup.date().required('Please select your email!'),
   // phone: yup.string().required('Please input your phone!'),
});
function Signup(props) {
   const [loadings, setLoading] = useState(false);
   const [token, setToken] = useState(localStorage.getItem('token'));
   const navigate = useNavigate();
   const [form] = Form.useForm();
   // notification when signup success
   const [api, contextHolder] = notification.useNotification();
   const openNotificationWithIcon = (type, notif) => {
      api[type]({
         message: 'Notification',
         description: notif,
      });
   };
   const onFinish = async (values) => {
      try {
         console.log('values:', values);
         setLoading(true);
         const newValues = {
            ...values,
            user_name: `@${values.user_name.replace(/\s/g, '')}`,
         };
         const register = await User.register(newValues);
         navigate('/login');
         setLoading(false);
         openNotificationWithIcon('success', register.data.mes);
      } catch (error) {
         console.log('error:', error);
         setLoading(false);
         openNotificationWithIcon('error', error.response.statusText);
      }
   };
   const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
   };
   const handleClickBackLogin = (e) => {
      e.preventDefault();
      navigate('/login');
   };
   //
   // validate form
   const yupSync = {
      async validator({ field }, value) {
         await signupSchema.validateSyncAt(field, { [field]: value });
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
                     <label>Signup</label>
                  </h1>
               </span>
            </div>
            {contextHolder}
            <div className={cn('form-main')}>
               <Form
                  name="formSignup"
                  form={form}
                  wrapperCol={{
                     span: 18,
                  }}
                  style={{
                     maxWidth: 900,
                  }}
                  initialValues={{
                     remember: true,
                  }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off">
                  <Form.Item
                     className={cn('input-field')}
                     label="User Name"
                     name="user_name"
                     rules={[yupSync]}>
                     <Input placeholder="Full name" />
                  </Form.Item>
                  <Form.Item
                     className={cn('input-field')}
                     label="Full Name"
                     name="full_name"
                     rules={[yupSync]}>
                     <Input placeholder="Full name" />
                  </Form.Item>
                  <Form.Item
                     className={cn('input-field')}
                     label="Email"
                     name="email"
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
                     rules={[yupSync]}>
                     <Input.Password
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        placeholder="Password"
                     />
                  </Form.Item>
                  <Form.Item
                     name="confirm"
                     label="Confirm password"
                     dependencies={['pwd']}
                     hasFeedback
                     rules={[
                        yupSync,
                        ({ getFieldValue }) => ({
                           validator(_, value) {
                              if (!value || getFieldValue('pwd') === value) {
                                 return Promise.resolve();
                              }
                              return Promise.reject(
                                 new Error('The two passwords that you entered do not match!'),
                              );
                           },
                        }),
                     ]}>
                     <Input.Password
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        placeholder="Confirm password"
                     />
                  </Form.Item>
                  <Form.Item
                     className={cn('input-field')}
                     name="gender"
                     label="Gender"
                     rules={[yupSync]}>
                     <Select placeholder="Select gender" value="female" allowClear>
                        <Option value="male">male</Option>
                        <Option value="female">female</Option>
                        <Option value="other">other</Option>
                     </Select>
                  </Form.Item>
                  <Form.Item
                     className={cn('input-field')}
                     label="Birth day"
                     name="birth_day"
                     rules={[yupSync]}>
                     <DatePicker style={{ width: '100%' }} />
                  </Form.Item>
                  <Form.Item className={cn('input-field')} label="Phone" name="phone">
                     <Input
                        prefix={<PhoneOutlined className="site-form-item-icon" />}
                        placeholder="Confirm password"
                     />
                  </Form.Item>
                  <Form.Item className={cn('input-field')} label="Relationship" name="relationship">
                     <Select placeholder="Select relationship">
                        <Select.Option value="Single">Single</Select.Option>
                        <Select.Option value="Date">Date</Select.Option>
                        <Select.Option value="Married">Married</Select.Option>
                     </Select>
                  </Form.Item>
                  <Form.Item className={cn('input-field')} label="Location" name="location">
                     <Input
                        prefix={<EnvironmentOutlined className="site-form-item-icon" />}
                        placeholder="Location"
                     />
                  </Form.Item>

                  <Form.Item
                     className={cn('input-field', 'center')}
                     style={{
                        marginBottom: 5,
                        marginTop: 40,
                        '> div': { justifyContent: 'center' },
                     }}>
                     <Button type="primary" htmlType="submit" loading={loadings}>
                        Signup
                     </Button>
                  </Form.Item>

                  <Divider>Or</Divider>
                  <Form.Item className={cn('center', 'input-link')} style={{ marginBottom: 10 }}>
                     <a
                        href="#facebook"
                        onClick={(e) => {
                           e.preventDefault();
                        }}>
                        <FacebookOutlined /> Signup with Facebook
                     </a>
                  </Form.Item>
                  <Form.Item
                     className={cn('center')}
                     style={{ marginBottom: 5, fontStyle: 'italic', color: 'rgb(166, 166, 166)' }}>
                     <span>
                        You have an account?
                        <a href="#login" onClick={handleClickBackLogin}>
                           Login
                        </a>
                     </span>
                  </Form.Item>
               </Form>
            </div>
            <div className={cn('form-footer')}></div>
         </div>
      </div>
   );
}

export default Signup;
