import { NavLink } from 'react-router-dom';
//проверяем активна ли ссылка, если да, добавляем ей "активный" класс
const linkClassNames = ({isActive}) => isActive ? 'navtab__link navtab__link_active' : 'navtab__link';
const accountClassNames = ({isActive}) => isActive ? 'navtab__acc navtab__acc_active' : 'navtab__acc';

const NavTab = ({isOpen, onClose}) => {
  return (
    <div className={'navtab  '+ (isOpen && ' navtab_opened')}>
      <div className='navtab__container'>
      <button className='navtab__exit ' onClick={onClose}></button>
        <div className="navtab__links">
          <NavLink to="/" className={linkClassNames}>Главная</NavLink>
          <NavLink to="/movies" className={linkClassNames}>Фильмы</NavLink>
          <NavLink to="/savedmovies" className={linkClassNames}>Сохраненные фильмы</NavLink>
          <NavLink to="/profile" className={accountClassNames}>Аккаунт</NavLink>
        </div>
      </div>
    </div>
  )
}


export default NavTab;