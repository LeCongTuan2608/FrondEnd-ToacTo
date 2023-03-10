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
import styles from './Signup.module.scss';
const { Option } = Select;
const cn = classNames.bind(styles);
Signup.propTypes = {};
const validateMessages = {
   required: '${label} is required!',
   types: {
      email: '${label} is not a valid email!',
      number: '${label} is not a valid number!',
   },
   number: {
      range: '${label} must be between ${min} and ${max}',
   },
};
function Signup(props) {
   const { token, setToken } = props;
   const [loadings, setLoading] = useState(false);
   const onFinish = (values) => {
      console.log('Success:', values);
      // setLoading(true);
      // setTimeout(() => {
      //    localStorage.setItem('token', 'true');
      //    setToken(true);
      // }, 2000);
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
                     <label>Signup</label>
                  </h1>
               </span>
            </div>
            <div className={cn('form-main')}>
               <Form
                  name="basic"
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
                  autoComplete="off"
                  validateMessages={validateMessages}>
                  <Form.Item
                     className={cn('input-field')}
                     label="Full Name"
                     name="fullName"
                     rules={[
                        {
                           required: true,
                        },
                     ]}>
                     <Input placeholder="Full name" />
                  </Form.Item>
                  <Form.Item
                     className={cn('input-field')}
                     label="Email"
                     name="email"
                     rules={[
                        {
                           required: true,
                           type: 'email',
                        },
                     ]}>
                     <Input
                        prefix={<UserOutlined className="site-form-item-icon" />}
                        placeholder="Email"
                     />
                  </Form.Item>

                  <Form.Item
                     className={cn('input-field')}
                     label="Password"
                     name="password"
                     rules={[
                        {
                           required: true,
                           min: 6,
                           max: 50,
                        },
                     ]}>
                     <Input.Password
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        placeholder="Password"
                     />
                  </Form.Item>
                  <Form.Item
                     name="confirm"
                     label="Confirm Password"
                     dependencies={['password']}
                     hasFeedback
                     rules={[
                        {
                           required: true,
                           message: 'Please confirm your password!',
                        },
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
                     rules={[
                        {
                           required: true,
                        },
                     ]}>
                     <Select placeholder="Select gender" value="female" allowClear noStyle>
                        <Option value="male">male</Option>
                        <Option value="female">female</Option>
                        <Option value="other">other</Option>
                     </Select>
                  </Form.Item>
                  <Form.Item
                     className={cn('input-field')}
                     label="Birth day"
                     name="birthDay"
                     rules={[
                        {
                           required: true,
                        },
                     ]}>
                     <DatePicker style={{ width: '100%' }} />
                  </Form.Item>
                  <Form.Item
                     className={cn('input-field')}
                     label="Phone"
                     name="phone"
                     rules={[
                        {
                           required: true,
                        },
                     ]}>
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
                     className={cn('input-field')}
                     style={{ marginBottom: 5, marginTop: 40 }}>
                     <Button type="primary" htmlType="submit" loading={loadings}>
                        Signup
                     </Button>
                  </Form.Item>

                  <Divider>Or</Divider>
                  <Form.Item
                     className={cn('input-field', 'input-link')}
                     style={{ marginBottom: 10 }}>
                     <a href="">
                        <FacebookOutlined /> Signup with Facebook
                     </a>
                  </Form.Item>
                  <Form.Item
                     className={cn('input-field')}
                     style={{ marginBottom: 5, fontStyle: 'italic', color: 'rgb(166, 166, 166)' }}>
                     <span>
                        You have an account?
                        <a href=""> Login</a>
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
