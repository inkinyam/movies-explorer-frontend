import React from 'react';
import MainLogo from '../../images/main-logo.svg';
import { Link } from 'react-router-dom';
import { useInputValidator } from '../../utils/customHooks/inputValidator';


const Login = ({onLogin, textError}) => {
  const inputControl        = useInputValidator();
  const { email, password } = inputControl.errors;

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const { email, password } = inputControl.values;
    onLogin(password, email)
    inputControl.resetForm();
  }
    
  const authErrorClassName = (textError === undefined)
    ? "auth__errText"
    : "auth__errText auth__errText_show"

  return (    
  <section className="auth">
      <Link to="/" className='auth__link auth__link_v_title' ><img src={MainLogo} alt="mainlogo" className="auth__logo" /></Link>
      <h2 className="auth__title">Рады видеть!</h2>

      <form className = 'auth__form' onSubmit={handleSubmit}  noValidate>
        <label className = 'auth__label'  htmlFor = 'email'>E-mail</label>
        <input className = {`auth__input ${inputControl?.errors?.email && "auth__input_error"}`}
               type        = "text" 
               name        = "email"
               id          = "email" 
               placeholder = "введите email"
               minLength   = "2" 
               maxLength   = "40" 
               required 
               pattern     = "^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$"
               value       = {inputControl?.values?.email || ''}
               onChange    = {inputControl.handleChange}
               />
        <span className={`auth__err ${inputControl?.errors?.email && "auth__err_show"}`}>{email}</span>

        <label className = "auth__label" htmlFor = "password">Имя</label>
        <input type        = "password" 
               name        = "password" 
               className   = {`auth__input ${inputControl?.errors?.password && "auth__input_error"}`} 
               id          = "password" 
               placeholder = "введите пароль"
               value       = {inputControl?.values?.password || ''}
               onChange    = {inputControl.handleChange}
               required/>

        <span className = {`auth__err ${inputControl?.errors?.password && "auth__err_show"}`}>{password}</span>
        <span className = {authErrorClassName}>{textError}</span> 
        
        <button type="submit" className="auth__submit">Войти</button>
        <p className='auth__advice'>Еще не зарегистрированы? <Link className='auth__link' to="/signup">Регистрация</Link></p>
      </form>

  </section>)
};

export default Login;