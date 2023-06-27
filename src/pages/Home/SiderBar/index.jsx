import { ThemeContext } from 'Context/ThemeContext';
import { Layout } from 'antd';
import classNames from 'classnames/bind';
import { useContext } from 'react';
import styles from './SiderBar.module.scss';
import AvatarCustom from './components/AvatarCustom';
import ButtonCustom from './components/ButtonCustom';
import ModalCustom from './components/ModalCustom';
import { useDispatch, useSelector } from 'react-redux';
import { addChatBox } from 'store/slices/chatBoxSlice';
import Conversation from 'API/Conversation';
import { ConversationContext } from 'Context/ConversationContext';
const { Sider } = Layout;
const cn = classNames.bind(styles);
SiderBar.propTypes = {};
function SiderBar(props) {
   const { styled, items } = props;
   const dispatch = useDispatch();
   const { theme } = useContext(ThemeContext);
   const { setMesNotSeen, conversation, setConversation } = useContext(ConversationContext);
   const userName = localStorage.getItem('user_name');
   const getChatBox = useSelector((state) => state?.chatBox?.chatBoxes);
   const jwt = {
      type: localStorage.getItem('type'),
      token: localStorage.getItem('token'),
   };
   const handleOpenChat = async (value, e) => {
      try {
         e.stopPropagation();
         const response = await Conversation.getConversation(value.user_name, jwt);
         const result = response.data.conversation;

         const newChatBox = !result && {
            Users: [
               { avatar: value.avatar, full_name: value.full_name, user_name: value.user_name },
            ],
            group: false,
            member: [userName, value.user_name],
         };
         dispatch(addChatBox(result || newChatBox));
         if (result && !result?.checked.includes(userName)) {
            setMesNotSeen((pre) => {
               return pre <= 0 ? pre : pre - 1;
            });
            setConversation((pre) =>
               pre.map((obj) => {
                  if (obj.id === conversation.id && obj.checked)
                     return { ...obj, checked: [...obj.checked, userName] };
                  return obj;
               }),
            );
            await Conversation.checkedConversation(result.id, jwt);
         }
      } catch (error) {
         console.log('error:', error);
      }
   };
   return (
      <Sider
         width={300}
         theme={theme}
         style={{ ...styled.css }}
         className={cn('sider-bar', `${theme === 'dark' ? 'theme-dark' : 'theme-light'}`)}>
         {items?.map((item, i) => {
            return (
               <div key={item.title}>
                  <div>
                     <h3>{item.title}</h3>
                  </div>
                  <div className={cn('items')}>
                     {item?.users && item.users.length > 0 ? (
                        item?.users.map((user, index) => {
                           return (
                              <div
                                 key={user.id || user.user_name}
                                 className={cn('item')}
                                 onClick={(e) => handleOpenChat(user, e)}>
                                 <AvatarCustom avatar={user.avatar?.url} />
                                 <span className={cn('full-name')}>{user.full_name}</span>
                                 <ButtonCustom title={item.title} user={user} jwt={jwt} />
                              </div>
                           );
                        })
                     ) : (
                        <div className={cn('is-empty')}>
                           <span>You dont have a {item.title}</span>
                        </div>
                     )}
                  </div>
                  {item.users.length > 4 && <ModalCustom item={item}>More...</ModalCustom>}
               </div>
            );
         })}
      </Sider>
   );
}

export default SiderBar;
