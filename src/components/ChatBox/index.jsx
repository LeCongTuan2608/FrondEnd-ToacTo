import React, { useEffect, useState, useRef, useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './ChatBox.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { addChatBox, removeChatBox } from 'store/slices/chatBoxSlice';
import {
   CloseOutlined,
   DeleteOutlined,
   DownOutlined,
   LockOutlined,
   MoreOutlined,
   SendOutlined,
   SettingOutlined,
   StopOutlined,
   UnlockOutlined,
} from '@ant-design/icons';
import { Button, Dropdown, Input, Space, Tooltip, message } from 'antd';
import img_avatar_default from '../../images/img-user-default.jpg';
import InputMes from './InputMes';
import socket from '../../socket';
import Messages from 'API/Messages';
import { ConversationContext } from 'Context/ConversationContext';
import { useNavigate } from 'react-router-dom';
import Conversation from 'API/Conversation';
import User from 'API/User';
const cn = classNames.bind(styles);
ChatBox.propTypes = {};

const currentDate = new Date(); // Lấy ngày hiện tại
function ChatBox(props) {
   const { chatBox } = props;
   const dispatch = useDispatch();
   const { mesNotSeen, setMesNotSeen, setRefresh } = useContext(ConversationContext);
   const [newId, setNewId] = useState(chatBox?.id);
   const data = useSelector((state) => state.chatBoxes);
   const navigate = useNavigate();
   const [blocked, setBlocked] = useState(
      chatBox.group ? [] : chatBox?.blocked?.map((item) => item.user_name) || [],
   );

   const userName = localStorage.getItem('user_name');
   const [userInfo, setUserInfo] = useState(
      chatBox?.group
         ? {
              group_name:
                 chatBox?.group_name ||
                 chatBox?.Users.filter((item) => item.user_name !== userName)
                    .map((item) => item.full_name)
                    .join(', '),
              avatar: chatBox?.group_name,
              group: chatBox?.group,
           }
         : chatBox?.users?.filter((item) => item.user_name !== userName)[0],
   );

   const [messages, setMessages] = useState([]);
   // alert notifine
   const [messageApi, contextHolder] = message.useMessage();
   const errorNotifine = () => {
      messageApi.open({
         type: 'error',
         content: 'An error occurred while deleting the message!!',
      });
   };
   //============================
   const jwt = {
      type: localStorage.getItem('type'),
      token: localStorage.getItem('token'),
   };
   const containerDiv = useRef(null);
   useEffect(() => {
      const getMessage = async () => {
         try {
            const response = await Messages.getAllMessages(newId, jwt);
            const data = response.data.messages;
            setMessages(data);
         } catch (error) {
            console.log('error:', error);
         }
      };
      getMessage();
   }, [newId]);
   useEffect(() => {
      if (!chatBox?.blocked) {
         const getBlocked = async () => {
            try {
               const userOther = chatBox.member.filter((item) => item !== userName)[0];
               const response = await User.getBlockedByUserName(jwt, userOther);
               const data = response.data.blocked.map((item) => item.user_name);
               setBlocked(data);
            } catch (error) {
               console.log('error:', error);
            }
         };
         getBlocked();
      }
   }, []);

   useEffect(() => {
      containerDiv.current && (containerDiv.current.scrollTop = containerDiv.current.scrollHeight);
   }, [messages]);
   useEffect(() => {
      socket.on('getMessage', (data) => {
         if (data.conversation_id === newId && data.sender !== userName) {
            setMessages((prev) => [...prev, data]);
            !newId && setNewId(data.conversation_id);
         }
      });
      socket.on('getIdRemoveMes', (data) => {
         if (data.conversation_id === newId) {
            if (data.member_remove_message.includes('all')) {
               setMessages((pre) =>
                  pre.map((mes) => {
                     if (mes.id === data.id) {
                        return data;
                     }
                     return mes;
                  }),
               );
            }
            setMesNotSeen((pre) => (pre <= 0 ? 0 : pre - 1));
         }
      });
   }, [newId]);
   const onClose = () => {
      dispatch(removeChatBox(chatBox?.id || chatBox.member));
   };

   const onSubmit = async (value) => {
      try {
         const newMessage = {
            content: value,
            date: currentDate.toDateString(),
            sender: userName,
            receiver: chatBox.member.filter((memb) => memb !== userName),
            id: newId || null,
         };
         const res = await Messages.createMessages(newMessage, jwt);
         setMessages((pre) => [...pre, res.data.message]);
         setRefresh((pre) => !pre);
         !newId && setNewId(res.data.message.conversation_id);
         socket.emit('sendMessage', {
            ...res.data.message,
            receiver: newMessage.receiver,
            full_name: localStorage.getItem('full_name'),
         });
         socket.emit('sendConversation', { ...res.data.conversation });
      } catch (error) {
         console.log('error:', error);
      }
   };
   const handleRemoveMes = async (value) => {
      try {
         const response = await Messages.removeMessages(value.id, jwt);
         const result = response.data.message;
         if (result.member_remove_message.includes(userName)) {
            setMessages((pre) => pre.filter((mes) => mes.id !== result.id));
         } else if (result.member_remove_message.includes('all')) {
            setMessages((pre) =>
               pre.map((mes) => {
                  if (mes.id === result.id) {
                     return result;
                  }
                  return mes;
               }),
            );
         }
         if (value.sender === userName) socket.emit('sendIdRemoveMes', result);
      } catch (error) {
         console.log('error:', error);
         errorNotifine();
      }
   };
   const handleNavigate = (e) => {
      !chatBox.group && navigate(`/user?user_name=${userInfo.user_name}`);
   };
   // ==============================================================================
   const handleBlockUser = async (e) => {
      try {
         const user_blocked = chatBox.member.filter((item) => !item.includes(userName))[0];
         await User.handleBlocked(jwt, { user_blocked });
         if (blocked.includes(userName))
            setBlocked((pre) => pre.filter((item) => item !== userName));
         else setBlocked((pre) => [...pre, userName]);
      } catch (error) {
         console.log('error:', error);
      }
   };
   const handleDeleteConv = async (e) => {
      try {
         if (newId) {
            await Conversation.removeConversation(newId, jwt);
            setMessages([]);
         }
      } catch (error) {
         console.log('error:', error);
      }
   };
   const checkBlocked = blocked.length > 1 || blocked?.includes(userName);
   const items = [
      {
         key: '1',
         label: (
            <div
               style={{ display: 'flex', gap: 15, alignItems: 'center', padding: '5px 20px' }}
               onClick={handleBlockUser}>
               {!checkBlocked ? (
                  <>
                     <LockOutlined /> Block
                  </>
               ) : (
                  <>
                     <UnlockOutlined />
                     UnBlock
                  </>
               )}
            </div>
         ),
      },
      {
         key: '2',
         label: (
            <div
               onClick={handleDeleteConv}
               style={{ display: 'flex', gap: 15, alignItems: 'center', padding: '5px 20px' }}>
               <DeleteOutlined />
               Delete
            </div>
         ),
      },
   ];
   return (
      <div className={cn('wrapper')}>
         <div className={cn('chat-box')}>
            <div className={cn('chat-header')}>
               <div className={cn('user')} onClick={handleNavigate}>
                  <div className={cn('avatar')}>
                     <img src={userInfo?.avatar?.url || img_avatar_default} alt="" />
                  </div>
                  <div className={cn('user-name')}>
                     <span>
                        <h3>{userInfo?.full_name || userInfo?.group_name || 'undefined'}</h3>
                     </span>
                  </div>
               </div>
               <div>
                  <div className={cn('btn-close')}>
                     <Dropdown
                        menu={{
                           items,
                        }}
                        placement="bottomRight"
                        trigger={['click']}>
                        <SettingOutlined style={{ fontSize: 20 }} />
                     </Dropdown>
                  </div>
                  <div onClick={onClose} className={cn('btn-close')}>
                     <CloseOutlined style={{ fontSize: 20 }} />
                  </div>
               </div>
            </div>
            <div className={cn('chat-messages')}>
               {contextHolder}
               <ul ref={containerDiv}>
                  {messages.map((mes, index) => {
                     if (mes?.sender === userName) {
                        return (
                           <li key={mes.id} className={cn('message', 'mine')}>
                              <div className={cn('option')}>
                                 <Dropdown
                                    placement="bottomRight"
                                    menu={{
                                       items: [
                                          {
                                             label: (
                                                <div onClick={() => handleRemoveMes(mes)}>
                                                   <span>Remove message!</span>
                                                </div>
                                             ),
                                             key: '0',
                                             danger: true,
                                          },
                                       ],
                                    }}
                                    trigger={['click']}>
                                    <Space>
                                       <MoreOutlined />
                                    </Space>
                                 </Dropdown>
                              </div>
                              {mes?.member_remove_message?.includes('all') ? (
                                 <p className={cn('is-removed')}>This message has been deleted!</p>
                              ) : (
                                 <p>{mes.content}</p>
                              )}
                           </li>
                        );
                     } else {
                        return (
                           <li key={mes.id} className={cn('message', 'friend')}>
                              <div className={cn('avatar')} style={{ width: 35, height: 35 }}>
                                 <img src={userInfo?.avatar?.url || img_avatar_default} alt="" />
                              </div>
                              {mes?.member_remove_message?.includes('all') ? (
                                 <p className={cn('is-removed')}>This message has been deleted!</p>
                              ) : (
                                 <p>{mes.content}</p>
                              )}

                              <div className={cn('option')}>
                                 <Dropdown
                                    placement="bottomLeft"
                                    menu={{
                                       items: [
                                          {
                                             label: (
                                                <div onClick={() => handleRemoveMes(mes)}>
                                                   <span>Remove message!</span>
                                                </div>
                                             ),
                                             key: '0',
                                             danger: true,
                                          },
                                       ],
                                    }}
                                    trigger={['click']}>
                                    <Space>
                                       <MoreOutlined />
                                    </Space>
                                 </Dropdown>
                              </div>
                           </li>
                        );
                     }
                  })}
               </ul>
            </div>
            <div className={cn('chat-input')}>
               <InputMes onSubmit={onSubmit} blocked={blocked} />
            </div>
         </div>
      </div>
   );
}

export default ChatBox;
