import MainLogo from '../../images/main-logo.svg';
import { Link } from 'react-router-dom';

const Login = () => {
  return (    
  <section className="auth">
      <Link to="/" className='auth__link auth__link_v_title' ><img src={MainLogo} alt="mainlogo" className="auth__logo" /></Link>
      <h2 className="auth__title">Рады видеть!</h2>

      <form className='auth__form'>
        <label className='auth__label'  htmlFor='email'>E-mail</label>
        <input type="email" className="auth__input" id="email"></input>
        <span className="auth__err auth__err-email">что-то пошло не так...</span>


        <label className='auth__label' htmlFor='password'>Имя</label>
        <input type="password" className="auth__input" id="password"></input>
        <span className="auth__err auth__err-password auth__err_shown">что-то пошло не так...</span>
     
        <button className="auth__submit">Зарегистрироваться</button>
        <p className='auth__advice'>Еще не зарегистрированы? <Link className='auth__link' to="/sign-up">Регистрация</Link></p>
      </form>

  </section>)
};

export default Login;