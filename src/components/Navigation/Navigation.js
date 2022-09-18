import MainLogo from '../../images/main-logo.png';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="navigation">
       <img src={MainLogo} alt="" className="" />
       <div className="navigation__links">
        <Link to="/all" className="navigation__link">Фильмы</Link>
        <Link to="/all" className="navigation__link">Сохраненные фильмы</Link>
       </div>
       <button className='navigation__acc'>Аккаунт</button>
    </nav>
  )
}

export default Navigation;