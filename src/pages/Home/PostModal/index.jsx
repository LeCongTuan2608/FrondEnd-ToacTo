import { UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Modal, Select } from 'antd';
import img_avt from '../../../images/avatar.png';
import { useContext, useEffect, useState } from 'react';
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
function PostModal(props) {
   const { modalOpen, setModalOpen } = props;
   const [dis, setDis] = useState(true);
   const [loadings, setLoadings] = useState(false);
   const handleChange = (value) => {
      console.log(`selected ${value}`);
   };
   const handleOnchange = (e) => {
      if (e.target.innerText === '') {
         setDis(!dis);
      }
   };
   const handleCreatePost = (index) => {
      setLoadings(true);
      setTimeout(() => {
         setLoadings(false);
         setModalOpen(false);
      }, 3000);
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
                  onChange={handleChange}
                  options={options}
               />
            </div>
         </div>
         <div
            onKeyDown={handleOnchange}
            contentEditable
            style={{
               minHeight: 200,
               outline: 'none',
               fontSize: 18,
               margin: '20px 0',
               maxHeight: 450,
               overflowY: 'scroll',
            }}></div>
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
