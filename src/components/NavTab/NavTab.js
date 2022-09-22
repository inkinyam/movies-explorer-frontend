import { Link } from 'react-router-dom';


const NavTab = ({isOpen, onClose}) => {
  return (
    <div className={'navtab  '+ (isOpen && ' navtab_opened')}>
      <div className='navtab__container'>
      <button className='navtab__exit ' onClick={onClose}></button>
        <h2 className="navtab__title">Главная</h2>
        <div className="navtab__links">
          <Link to="/all" className="navtab__link navtab__link_active">Фильмы</Link>
          <Link to="/all" className="navtab__link">Сохраненные фильмы</Link>
          <Link to="/profile" className='navtab__acc'>Аккаунт</Link>
        </div>
      </div>
    </div>
  )
}


export default NavTab;