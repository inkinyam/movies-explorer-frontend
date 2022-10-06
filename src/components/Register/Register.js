import React from 'react';
import MainLogo from '../../images/main-logo.svg';
import { Link } from 'react-router-dom';

const Register = ({onRegister}) => {
  const [userName, setUserName]   = React.useState('');
  const [userEmail, setUserEmail] = React.useState('');
  const [userPass, setUserPass]   = React.useState('');

  const handleChangeName = (evt) => {
    setUserName(evt.target.value);
  }

  const handleChangeEmail = (evt) => {
    setUserEmail(evt.target.value);
  }

  const handleChangePass = (evt) => {
    setUserPass(evt.target.value);
  }

  const handleSubmit = (evt) =>{
    evt.preventDefault();
    onRegister ( userPass, userEmail, userName);
  } 

  return (    
  <section className="auth">
      <Link to="/" className='auth__link auth__link_v_title' ><img src={MainLogo} alt="mainlogo" className="auth__logo" /></Link>
      <h2 className="auth__title">Добро пожаловать!</h2>

      <form className='auth__form' onSubmit={handleSubmit}>
        <label className='auth__label' htmlFor='name'>Имя</label>
        <input type="text" 
               className="auth__input" 
               id="name" 
               placeholder='введите имя'
               onChange={handleChangeName}
               value={userName}
               required/>
        <span className="auth__err auth__err-name ">что-то пошло не так...</span>
   
        <label className='auth__label'  htmlFor='email'>E-mail</label>
        <input type="email" 
               className="auth__input" 
               id="email" 
               placeholder='введите e-mail'
               onChange={handleChangeEmail}
               value={userEmail}
               required/>
        <span className="auth__err auth__err-email">что-то пошло не так...</span>


        <label className='auth__label' htmlFor='password'>Пароль</label>
        <input type="password" 
               className="auth__input" 
               id="password" 
               placeholder='введите пароль'
               onChange={handleChangePass}
               value={userPass}
               required/>
        <span className="auth__err auth__err-password">что-то пошло не так...</span>
     
        <button type="submit" className="auth__submit">Зарегистрироваться</button>
        <p className='auth__advice'>Уже зарегистрированы? <Link className='auth__link' to="/signin">Войти</Link></p>
      </form>

  </section>)
};

export default Register;