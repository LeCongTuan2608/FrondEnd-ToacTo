import {
   EnvironmentOutlined,
   FacebookOutlined,
   GlobalOutlined,
   LockOutlined,
   PhoneOutlined,
   UserOutlined,
} from '@ant-design/icons';
import { Button, DatePicker, Divider, Form, Input, Select } from 'antd';
import classNames from 'classnames/bind';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Signup.module.scss';
import * as yup from 'yup';
const { Option } = Select;
const cn = classNames.bind(styles);
Signup.propTypes = {};

const signupSchema = yup.object().shape({
   fullName: yup
      .string()
      .min(5, 'Too short!')
      .max(50, 'Too long!')
      .required('Please input your full name!'),
   email: yup.string().email('Invalid email').required('Please input your email!'),
   password: yup
      .string()
      .min(5, 'Too short!')
      .max(100, 'Too long!')
      .required('Please input your password!'),
   confirm: yup.string().required('Please input your confirm password!'),
   gender: yup.string().oneOf(['male', 'female', 'other']).required('Please select your gender!'),
   birthDay: yup.date().required('Please select your email!'),
   phone: yup.string().required('Please input your phone!'),
});
function Signup(props) {
   const [loadings, setLoading] = useState(false);
   const navigate = useNavigate();
   const [form] = Form.useForm();

   const onFinish = (values) => {
      console.log('Success:', values);
      setLoading(true);
      setTimeout(() => {
         navigate('/login');
      }, 2000);
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
                     label="Full Name"
                     name="fullName"
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
                     name="password"
                     rules={[yupSync]}>
                     <Input.Password
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        placeholder="Password"
                     />
                  </Form.Item>
                  <Form.Item
                     name="confirm"
                     label="Confirm password"
                     dependencies={['password']}
                     hasFeedback
                     rules={[
                        yupSync,
                        ({ getFieldValue }) => ({
                           validator(_, value) {
                              if (!value || getFieldValue('password') === value) {
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
                     name="birthDay"
                     rules={[yupSync]}>
                     <DatePicker style={{ width: '100%' }} />
                  </Form.Item>
                  <Form.Item
                     className={cn('input-field')}
                     label="Phone"
                     name="phone"
                     rules={[yupSync]}>
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
                  <Form.Item className={cn('input-field')} label="Address" name="address">
                     <Input
                        prefix={<EnvironmentOutlined className="site-form-item-icon" />}
                        placeholder="Address"
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
                           {' '}
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
