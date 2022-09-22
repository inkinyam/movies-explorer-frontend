import MainLogo from '../../images/main-logo.png';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <div className="header__containter">
         <img src={MainLogo} alt="" className="header__logo" />
         <div className='header__link-box'>
          <Link to="/sign-up" className="header__link header__link_v_register">Регистрация</Link>
          <Link to="/sign-in" className="header__link header__link_v_login">Войти</Link>
        </div>
      </div>
    </header>
  )
}

export default Header;