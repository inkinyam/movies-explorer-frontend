import React from 'react';
import MainLogo from '../../images/main-logo.svg';
import { Link, NavLink } from 'react-router-dom';

const Header = () => {

  return (
    <header className='header'>
      <div className="header__containter">
        <Link to="/" ><img src={MainLogo} alt="mainlogo" className="" /></Link>
         <div className='header__link-box'>
          <NavLink to="/signup" className="header__link header__link_v_register">Регистрация</NavLink>
          <NavLink to="/signin" className="header__link header__link_v_login">Войти</NavLink>
        </div>
      </div>
    </header>
  )
}

export default Header;