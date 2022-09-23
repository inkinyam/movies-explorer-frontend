import MainLogo from '../../images/main-logo.png';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <div className="header__containter">
        <NavLink to="/" ><img src={MainLogo} alt="" className="" /></NavLink>
         <div className='header__link-box'>
          <NavLink to="/sign-up" className="header__link header__link_v_register">Регистрация</NavLink>
          <NavLink to="/sign-in" className="header__link header__link_v_login">Войти</NavLink>
        </div>
      </div>
    </header>
  )
}

export default Header;