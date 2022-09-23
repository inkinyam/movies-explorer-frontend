import { NavLink } from 'react-router-dom';
//проверяем активна ли ссылка, если да, добавляем ей "активный" класс
const classNames = ({isActive}) => isActive ? 'navtab__link navtab__link_active' : 'navtab__link';

const NavTab = ({isOpen, onClose}) => {
  return (
    <div className={'navtab  '+ (isOpen && ' navtab_opened')}>
      <div className='navtab__container'>
      <button className='navtab__exit ' onClick={onClose}></button>
        <h2 className="navtab__title">Главная</h2>
        <div className="navtab__links">
          <NavLink to="/movies" className={classNames}>Фильмы</NavLink>
          <NavLink to="/savedmovies" className={classNames}>Сохраненные фильмы</NavLink>
          <NavLink to="/profile" className='navtab__acc'>Аккаунт</NavLink>
        </div>
      </div>
    </div>
  )
}


export default NavTab;