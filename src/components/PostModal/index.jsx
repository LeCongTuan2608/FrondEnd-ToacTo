import { PlusOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Divider, Modal, Select, Space, Upload } from 'antd';
import img_avt from '../../images/avatar.png';
import { useContext, useEffect, useState, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './PostModal.module.scss';
import { useMediaQuery } from 'react-responsive';
import Post from 'API/Post';
const cn = classNames.bind(styles);
PostModal.propTypes = {};
const options = [
   {
      value: 'public',
      label: 'Public',
   },
   {
      value: 'friends',
      label: 'Friends',
   },
   {
      value: 'private',
      label: 'Private',
   },
];
const getBase64 = (file) =>
   new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
   });
function PostModal(props) {
   const { modalOpen, setModalOpen } = props;
   const [dis, setDis] = useState(true);
   const [loadings, setLoadings] = useState(false);
   const [audience, setAudience] = useState('public');
   const content = useRef();
   const isMobileScreen = useMediaQuery({ query: '(max-width: 500px)' });
   //============= Upload ========================
   const [previewOpen, setPreviewOpen] = useState(false);
   const [previewImage, setPreviewImage] = useState('');
   const [previewTitle, setPreviewTitle] = useState('');
   const [fileList, setFileList] = useState([]);
   const [image, setImage] = useState();
   const jwt = {
      type: localStorage.getItem('type'),
      token: localStorage.getItem('token'),
   };

   const handleCancel = () => setPreviewOpen(false);
   const handlePreview = async (file) => {
      if (!file.url && !file.preview) {
         file.preview = await getBase64(file.originFileObj);
      }
      setPreviewImage(file.url || file.preview);
      setPreviewOpen(true);
      setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
   };
   const handleChange = ({ fileList: newFileList }) => {
      setFileList(newFileList);
      setDis(false);
   };
   const dummyRequest = async ({ file, onSuccess }) => {
      setTimeout(() => {
         onSuccess('ok');
      }, 0);
   };
   //==================================================
   const handleChangeAudience = (value) => {
      setAudience(value);
   };
   const handleInputContent = (e) => {
      content.current.innerText === '' ? setDis(true) : setDis(false);
   };
   const handleCreatePost = async () => {
      try {
         setLoadings(true);
         const form = new FormData();
         form.append('userPost', localStorage.getItem('user_name'));
         form.append('content', content.current.innerText);
         form.append('audience', audience);
         fileList?.map((item) => {
            if (item.type.split('/').includes('image')) {
               return form.append('images', item.originFileObj);
            } else if (item.type.split('/').includes('video')) {
               return form.append('videos', item.originFileObj);
            }
         });
         const res = await Post.newPost(form, jwt);
         setLoadings(false);
         setModalOpen(false);
         //clear modal
         content.current.innerText = '';
         setFileList([]);
         setPreviewOpen(false);
         setDis(!dis);
         //
      } catch (error) {
         console.log('error:', error);
      }
   };
   return (
      <Modal
         className={cn('cus-modal')}
         title={<p style={{ textAlign: 'center', margin: 0, fontSize: 23 }}>Create new post</p>}
         width={isMobileScreen ? '100%' : 520}
         style={
            isMobileScreen && {
               maxWidth: 'unset',
               height: '100%',
            }
         }
         bodyStyle={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            marginTop: 20,
         }}
         centered
         footer
         open={modalOpen}
         onOk={() => setModalOpen(false)}
         onCancel={() => setModalOpen(false)}>
         <div className={cn('modal-header')}>
            <Avatar
               size={64}
               icon={<UserOutlined />}
               src={img_avt}
               style={{ border: '1px solid #bdbdbdc2' }}
            />
            <div style={{ display: 'flex', flex: 1 }}>
               <span style={{ flex: 1 }}>
                  <h3 style={{ margin: 0 }}>{localStorage.getItem('user_name')}</h3>
               </span>
               <Select
                  defaultValue={options[0].value}
                  style={{
                     width: 120,
                  }}
                  onChange={handleChangeAudience}
                  options={options}
               />
            </div>
         </div>
         <div className={cn('content-wrap')} style={isMobileScreen ? { flex: 1 } : null}>
            {(!content.current || content.current.innerText === '') && (
               <span>What are you thinking about?</span>
            )}
            <div
               onInput={handleInputContent}
               ref={content}
               contentEditable
               className={cn('content-edit')}></div>
         </div>
         <Divider />
         <div className={cn('box-upload')} style={isMobileScreen ? { maxHeight: 250 } : null}>
            <Upload
               accept="file"
               listType="picture-card"
               fileList={fileList}
               multiple={true}
               onPreview={handlePreview}
               customRequest={dummyRequest}
               onChange={handleChange}>
               <div>
                  <PlusOutlined />
                  <div
                     style={{
                        marginTop: 8,
                     }}>
                     Upload
                  </div>
               </div>
            </Upload>
            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
               <img
                  alt="example"
                  style={{
                     width: '100%',
                  }}
                  src={previewImage}
               />
            </Modal>
         </div>
         <div>
            <Button
               type="primary"
               block
               disabled={dis}
               loading={loadings}
               onClick={handleCreatePost}>
               Post
            </Button>
         </div>
      </Modal>
   );
}

export default PostModal;
