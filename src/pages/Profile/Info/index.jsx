import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Descriptions, Layout, Button, Form, Input, Select, DatePicker, Divider } from 'antd';
import { ThemeContext } from 'Context/ThemeContext';
import classNames from 'classnames/bind';
import styles from './Info.module.scss';
import { useLocation, useOutletContext, useSearchParams } from 'react-router-dom';
import { Option } from 'antd/es/mentions';
import {
   EnvironmentOutlined,
   FacebookOutlined,
   LockOutlined,
   PhoneOutlined,
   UserOutlined,
} from '@ant-design/icons';
import * as yup from 'yup';
import moment from 'moment';
import dayjs from 'dayjs';
import User from 'API/User';
const cn = classNames.bind(styles);
Info.propTypes = {};

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
   gender: yup.string().oneOf(['male', 'female', 'other']).required('Please select your gender!'),
});
function Info(props) {
   const [userInfo] = useOutletContext();
   const { theme } = useContext(ThemeContext);
   const [info, setInfo] = useState({
      ...userInfo,
      birth_day: userInfo.birth_day && dayjs(userInfo.birth_day),
   });
   // url browser
   const [searchParams, setSearchParams] = useSearchParams();
   const userName = localStorage.getItem('user_name');
   const userNameQuery = searchParams.get('user_name');
   const editQuery = searchParams.get('edit');
   const location = useLocation();
   // state
   const [edit, setEdit] = useState(editQuery ? true : false);
   const [form] = Form.useForm();

   const jwt = {
      type: localStorage.getItem('type'),
      token: localStorage.getItem('token'),
   };
   useEffect(() => {
      if (userNameQuery !== userName && editQuery) {
         searchParams.delete('edit');
         setSearchParams(searchParams);
      }
      editQuery && setEdit(editQuery && userName === userNameQuery ? true : false);
   }, [location.pathname, location.search]);
   useEffect(() => {
      if (!info.user_name) {
         const getUser = async () => {
            try {
               const res = await User.getUser(jwt, userNameQuery);
               const data = res.data.result;
               data && setInfo({ ...data, birth_day: data.birth_day && dayjs(data.birth_day) });
            } catch (error) {
               console.log('error:', error);
            }
         };
         getUser();
      }
   }, []);

   const onFinish = async (values) => {
      try {
         delete values.user_name;
         await User.update(values, jwt, userName);
         localStorage.setItem('full_name', values.full_name);
         setEdit(!info);
         setInfo({ ...userInfo, ...values });
      } catch (error) {
         console.log('error:', error);
      }
   };

   const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
   };
   const handleClickEdit = () => {
      if (editQuery) {
         searchParams.delete('edit');
         setSearchParams(searchParams);
      } else {
         searchParams.set('edit', 'true');
         setSearchParams(searchParams);
      }
      setEdit(!edit);
   };
   // validate form
   const yupSync = {
      async validator({ field }, value) {
         await signupSchema.validateSyncAt(field, { [field]: value });
      },
   };
   const checkUser = userName === userNameQuery || info.public_info;
   return (
      <Layout
         className={cn('wrapper')}
         style={
            theme === 'light' ? { background: 'white' } : { background: '#242526', color: 'white' }
         }>
         <div>
            {edit ? (
               <div className={cn('form-main')}>
                  <Form
                     name="formSignup"
                     form={form}
                     wrapperCol={{
                        span: 18,
                     }}
                     initialValues={info}
                     onFinish={onFinish}
                     onFinishFailed={onFinishFailed}
                     autoComplete="off">
                     <Form.Item className={cn('input-field')} label="User Name" name="user_name">
                        <Input placeholder="Full name" disabled />
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
                        name="gender"
                        label="Gender"
                        rules={[yupSync]}>
                        <Select placeholder="Select gender" value="female" allowClear>
                           <Option value="male">male</Option>
                           <Option value="female">female</Option>
                           <Option value="other">other</Option>
                        </Select>
                     </Form.Item>
                     <Form.Item className={cn('input-field')} label="Birth day" name="birth_day">
                        <DatePicker style={{ width: '100%' }} format="DD-MM-YYYY" />
                     </Form.Item>
                     <Form.Item className={cn('input-field')} label="Phone" name="phone">
                        <Input
                           prefix={<PhoneOutlined className="site-form-item-icon" />}
                           placeholder="Your phone"
                        />
                     </Form.Item>
                     <Form.Item
                        className={cn('input-field')}
                        label="Relationship"
                        name="relationship">
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
                        <Button type="dashed" onClick={handleClickEdit}>
                           Cancel
                        </Button>
                        <Button type="primary" htmlType="submit">
                           Update
                        </Button>
                     </Form.Item>
                  </Form>
               </div>
            ) : (
               <Descriptions
                  title={
                     <span style={theme === 'light' ? {} : { color: 'white', fontSize: '1.3rem' }}>
                        Information
                     </span>
                  }
                  column={1}
                  className={cn('desc')}
                  labelStyle={theme === 'light' ? {} : { color: 'white' }}
                  contentStyle={theme === 'light' ? {} : { color: 'white' }}>
                  <Descriptions.Item label="UserName">{info.user_name}</Descriptions.Item>
                  <Descriptions.Item label="Full name">{info.full_name}</Descriptions.Item>
                  <Descriptions.Item label="Gender">{info.gender}</Descriptions.Item>
                  <Descriptions.Item label="Birth day">
                     {checkUser
                        ? info.birth_day?.format('DD-MM-YYYY')
                        : info.birth_day?.format('DD-MM-YYYY').replace(/./g, '*')}
                  </Descriptions.Item>
                  <Descriptions.Item label="Relationship">{info.relationship}</Descriptions.Item>
                  <Descriptions.Item label="Telephone">
                     {checkUser ? info.phone : info.phone?.replace(/./g, '*')}
                  </Descriptions.Item>
                  <Descriptions.Item label="Address">
                     {checkUser ? info.location : info.location?.replace(/./g, '*')}
                  </Descriptions.Item>
               </Descriptions>
            )}

            <div className={cn('footer')}>
               {info.user_name !== userName
                  ? null
                  : !edit && (
                       <Button type="primary" onClick={handleClickEdit}>
                          Edit
                       </Button>
                    )}
            </div>
         </div>
      </Layout>
   );
}

export default Info;
