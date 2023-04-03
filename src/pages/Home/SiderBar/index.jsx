import { ThemeContext } from 'Context/ThemeContext';
import { Layout } from 'antd';
import classNames from 'classnames/bind';
import { useContext } from 'react';
import styles from './SiderBar.module.scss';
import AvatarCustom from './components/AvatarCustom';
import ButtonCustom from './components/ButtonCustom';
import ModalCustom from './components/ModalCustom';
const { Sider } = Layout;
const cn = classNames.bind(styles);
SiderBar.propTypes = {};
function SiderBar(props) {
   const { styled, items } = props;
   const { theme } = useContext(ThemeContext);
   const arr = [1, 2, 3, 4, 5];
   console.log(items);

   return (
      <Sider
         width={300}
         theme={theme}
         style={{ ...styled.css }}
         className={cn('sider-bar', `${theme === 'dark' ? 'theme-dark' : 'theme-light'}`)}>
         {items.map((item, i) => {
            return (
               <div key={i}>
                  <div>
                     <h3>{item.title}</h3>
                  </div>
                  <div className={cn('items')}>
                     {item.users.map((user, index) => {
                        return (
                           <div key={index} className={cn('item')}>
                              <AvatarCustom />
                              <span className={cn('user-name')}>{user.label}</span>
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
