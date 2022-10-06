import React from 'react';
import MainLogo from '../../images/main-logo.svg';
import { Link } from 'react-router-dom';

const Login = ({onLogin}) => {
  const [userEmail, setUserEmail] = React.useState('');
  const [userPass, setUserPass]   = React.useState('');

  const handleChangeEmail = (evt) => {
    setUserEmail(evt.target.value);
  }

  const handleChangePass = (evt) => {
    setUserPass(evt.target.value);
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onLogin(userPass, userEmail)
  }
    

  return (    
  <section className="auth">
      <Link to="/" className='auth__link auth__link_v_title' ><img src={MainLogo} alt="mainlogo" className="auth__logo" /></Link>
      <h2 className="auth__title">Рады видеть!</h2>

      <form className='auth__form' onSubmit={handleSubmit}>
        <label className='auth__label'  htmlFor='email'>E-mail</label>
        <input type="email" 
               className="auth__input" 
               id="email" 
               placeholder='введите e-mail'
               onChange = {handleChangeEmail} 
               value = {userEmail} 
               required/>
        <span className="auth__err auth__err-email">что-то пошло не так...</span>


        <label className='auth__label' htmlFor='password'>Имя</label>
        <input type="password" 
               className="auth__input" 
               id="password" 
               placeholder='введите пароль'
               onChange = {handleChangePass} 
               value = {userPass}
               required/>
        <span className="auth__err auth__err-password auth__err_shown">что-то пошло не так...</span>
     
        <button type="submit" className="auth__submit">Войти</button>
        <p className='auth__advice'>Еще не зарегистрированы? <Link className='auth__link' to="/signup">Регистрация</Link></p>
      </form>

  </section>)
};

export default Login;