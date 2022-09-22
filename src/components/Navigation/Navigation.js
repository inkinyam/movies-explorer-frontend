import MainLogo from '../../images/main-logo.png';
import NavTab from '../NavTab/NavTab';
import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  const [isNavTabOpened, openNavTab] = React.useState(false);

  const handleOpenNavTab = () => {
    openNavTab(true);
  }

  const handleCloseNavTab = () =>{
    openNavTab(false);
  }


  return (
    <nav className="navigation">
       <img src={MainLogo} alt="" className="" />
       <div className="navigation__links">
        <Link to="/all" className="navigation__link">Фильмы</Link>
        <Link to="/all" className="navigation__link">Сохраненные фильмы</Link>
        <button className='navigation__acc'>Аккаунт</button>
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