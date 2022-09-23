import MainLogo from '../../images/main-logo.png';
import NavTab from '../NavTab/NavTab';
import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  //проверяем активна ли ссылка, если да, добавляем ей "активный" класс
  const classNames = ({isActive}) => isActive ? 'navigation__link navigation__link_active' : 'navigation__link';

  const [isNavTabOpened, openNavTab] = React.useState(false);

  const handleOpenNavTab = () => {
    openNavTab(true);
  }

  const handleCloseNavTab = () =>{
    openNavTab(false);
  }


  return (
    <nav className="navigation">
      <NavLink to="/" ><img src={MainLogo} alt="" className="" /></NavLink>
       
       <div className="navigation__links">
        <NavLink to="/movies" className={classNames}>Фильмы</NavLink>
        <NavLink to="/savedmovies" className={classNames}>Сохраненные фильмы</NavLink>
        <NavLink to="/profile" className='navigation__acc'>Аккаунт</NavLink>
      </div>
      <button className='navigation__burger' onClick={handleOpenNavTab}>
        <span className="navigation__burger-top"></span>
        <span className="navigation__burger-middle"></span>
        <span className="navigation__burger-bottom"></span>
      </button>

      <NavTab isOpen={isNavTabOpened}
              onClose={handleCloseNavTab}/>
    </nav>
  )
}

export default Navigation;