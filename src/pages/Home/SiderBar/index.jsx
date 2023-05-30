import { ThemeContext } from 'Context/ThemeContext';
import { Layout } from 'antd';
import classNames from 'classnames/bind';
import { useContext } from 'react';
import styles from './SiderBar.module.scss';
import AvatarCustom from './components/AvatarCustom';
import ButtonCustom from './components/ButtonCustom';
import ModalCustom from './components/ModalCustom';
import { useDispatch } from 'react-redux';
import { addChatBox } from 'store/slices/chatBoxSlice';
import Conversation from 'API/Conversation';
const { Sider } = Layout;
const cn = classNames.bind(styles);
SiderBar.propTypes = {};
function SiderBar(props) {
   const { styled, items } = props;
   const dispatch = useDispatch();
   const { theme } = useContext(ThemeContext);
   const jwt = {
      type: localStorage.getItem('type'),
      token: localStorage.getItem('token'),
   };
   const handleOpenChat = async (value) => {
      try {
         const response = await Conversation.getConversation(value.user_name, jwt);
         const conversation = response.data.conversation;
         const box = {
            ...conversation,
            user_info: { ...value },
         };
         dispatch(addChatBox(box));
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
               <div key={i}>
                  <div>
                     <h3>{item.title}</h3>
                  </div>
                  <div className={cn('items')}>
                     {item?.users.map((user, index) => {
                        return (
                           <div
                              key={index}
                              className={cn('item')}
                              onClick={() => handleOpenChat(user)}>
                              <AvatarCustom />
                              <span className={cn('full-name')}>{user.full_name}</span>
                              <ButtonCustom title={item.title} user={user} />
                           </div>
                        );
                     })}
                  </div>
                  {item.users.length > 4 && <ModalCustom item={item}>More...</ModalCustom>}
               </div>
            );
         })}
      </Sider>
   );
}

export default SiderBar;
