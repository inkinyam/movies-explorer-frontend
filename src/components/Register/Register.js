import React from 'react';
import MainLogo from '../../images/main-logo.svg';
import { Link } from 'react-router-dom';
import { useInputValidator } from '../../utils/customHooks/inputValidator';

const Register = ({onRegister, textError}) => {
  const [isValid, setIsValid]     = React.useState(false);
  const inputControl              = useInputValidator();
  const { name, email, password } = inputControl.errors;


  React.useEffect(() => {
    setIsValid(inputControl.isValid)
  }, [ inputControl.isValid]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password } = inputControl.values;
    onRegister(password, email, name);
    inputControl.resetForm();
  };

  const authErrorClassName = (textError === undefined)
    ? "auth__errText"
    : "auth__errText auth__errText_show"


  return (    
  <section className="auth">
      <Link to="/" className='auth__link auth__link_v_title' ><img src={MainLogo} alt="mainlogo" className="auth__logo" /></Link>
      <h2 className="auth__title">Добро пожаловать!</h2>

      <form className = 'auth__form' onSubmit={handleSubmit} noValidate>
        <label className = 'auth__label' htmlFor = 'name'>Имя</label>
        <input className   = {`auth__input ${inputControl?.errors?.name && "auth__input_error"}`}
               type        = "text" 
               name        = "name"
               id          = "name" 
               placeholder = 'введите имя'
               minLength   = "2" 
               maxLength   = "40" 
               required 
               pattern     = "[A-Za-zА-Яа-яЁё\s-]+"
               value       = {inputControl?.values?.name || ''}
               onChange    = {inputControl.handleChange}
               />
        <span className={`auth__err ${inputControl?.errors?.name && "auth__err_show"}`}>{name}</span>
   
        <label className = 'auth__label'  htmlFor= 'email' >E-mail</label>
        <input type        = "email" 
               name        = "email" 
               className   = {`auth__input ${inputControl?.errors?.email && "auth__input_error"}`}
               id          = "email" 
               placeholder = "введите e-mail"
               pattern     = "^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$"
               value       = {inputControl?.values?.email || ''}
               onChange    = {inputControl.handleChange}
               required
               />
        <span className = {`auth__err ${inputControl?.errors?.email && "auth__err_show"}`}>{email}</span>


        <label className = 'auth__label' htmlFor = 'password'>Пароль</label>
        <input type        = "password" 
               name        = "password" 
               className   = {`auth__input ${inputControl?.errors?.password && "auth__input_error"}`} 
               id          = "password" 
               placeholder = 'введите пароль'
               value       = {inputControl?.values?.password || ''}
               onChange    = {inputControl.handleChange}
               required
               />
        <span className = {`auth__err ${inputControl?.errors?.password && "auth__err_show"}`}>{password}</span>
        <span className = {authErrorClassName}>{textError}</span> 
        <button type="submit" 
                className={`auth__submit ${(!isValid && 'auth__submit_disabled')}`}
                disabled  = {(!isValid && 'disabled')}>
                  Зарегистрироваться
        </button>
        <p className='auth__advice'>Уже зарегистрированы? <Link className='auth__link' to="/signin">Войти</Link></p>
      </form>

  </section>)
};

export default Register;