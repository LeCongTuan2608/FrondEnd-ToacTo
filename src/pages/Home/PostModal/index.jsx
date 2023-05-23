import { PlusOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Divider, Modal, Select, Space, Upload } from 'antd';
import img_avt from '../../../images/avatar.png';
import { useContext, useEffect, useState, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './PostModal.module.scss';
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
   //============= Upload ========================
   const [previewOpen, setPreviewOpen] = useState(false);
   const [previewImage, setPreviewImage] = useState('');
   const [previewTitle, setPreviewTitle] = useState('');
   const [fileList, setFileList] = useState([]);

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
         console.log({
            content: content.current.innerText,
            file: fileList,
            userName: localStorage.getItem('userName'),
            audience: audience,
         });
         setLoadings(true);
         setTimeout(() => {
            setLoadings(false);
            setModalOpen(false);
            //clear modal
            content.current.innerText = '';
            setFileList([]);
            setPreviewOpen(false);
            setDis(!dis);
            //
         }, 3000);
      } catch (error) {
         console.log('error:', error);
      }
   };
   return (
      <Modal
         title={<p style={{ textAlign: 'center', margin: 0, fontSize: 23 }}>Create new post</p>}
         centered
         footer
         open={modalOpen}
         onOk={() => setModalOpen(false)}
         onCancel={() => setModalOpen(false)}>
         <div
            style={{
               display: 'flex',
               justifyContent: 'space-between',
               alignItems: 'center',
               gap: 10,
            }}>
            <Avatar
               size={64}
               icon={<UserOutlined />}
               src={img_avt}
               style={{ border: '1px solid #bdbdbdc2' }}
            />
            <div style={{ display: 'flex', flex: 1 }}>
               <span style={{ flex: 1 }}>
                  <h3 style={{ margin: 0 }}>{localStorage.getItem('userName')}</h3>
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
         <div className={cn('content-wrap')}>
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
         <div className={cn('box-upload')}>
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
