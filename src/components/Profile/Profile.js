import React from 'react';
import Navigation from '../Navigation/Navigation';
import Preloader from '../Preloader/Preloader';
import { CurrentUserContext } from '../../context/CurrentUserContext'; 
import { useInputValidator } from '../../utils/customHooks/inputValidator';

const Profile = ({onUpdateUser ,onSignOut, isLoading}) => {
  const currentUser             = React.useContext(CurrentUserContext);

  const [isUnlock, setIsUnlock] = React.useState(true);

  const inputControl                    = useInputValidator();
  const {name, email}                   = inputControl.errors;
  const [isSameValues, setIsSameValues] = React.useState(true);
  const [isValid, setIsValid]           = React.useState(false);
  const [isSucces, setIsSucces]         = React.useState(false);

  const toggleStateInput = (e) => {
    e.preventDefault();
    setIsUnlock(!isUnlock);
    setIsSucces(false);
  }; 

  const button = !isUnlock 
    ? <button type      = "button"  
              className = "profile__button profile__button_v_edit" 
              onClick   = {toggleStateInput}> Редактировать </button>

    : <button type      = "submit" 
              className = {`profile__button profile__button_v_edit ${(!isValid && 'profile__button_disable')}`}
              disabled  = {(!isValid && 'disabled')}> Сохранить </button>
  
  const errorClassName = !isValid
    ? 'profile__error profile__error_show'
    : 'profile__error';


  const succesClassName = isSucces 
    ? 'profile__succes profile__succes_show'
    : 'profile__succes';


    React.useEffect(() => {
      if (inputControl.values.name === currentUser.name &&
        inputControl.values.email === currentUser.email) {
          setIsSameValues(false);
    } else {
      setIsSameValues(true);
    }
  }, [currentUser, inputControl.values.name, inputControl.values.email]);

  React.useEffect(() => {
    setIsValid(inputControl.isValid && isSameValues)
  }, [isSameValues, inputControl.isValid]);
  
  
    /*обработчик сабмита формы*/
    function handleSubmit(e)  {
      e.preventDefault();
      let { name, email } = inputControl.values;
        if (!name) {
          name = currentUser.name;
        } else if (!email) {
          email = currentUser.email
        } 
        onUpdateUser({name, email});
    }
    

  React.useEffect(()=> {
    setIsUnlock(false)
    setIsSucces(true);
    setTimeout(() => setIsSucces(false), 1000);
    inputControl.resetForm();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser])

  return (
    <>
    <Navigation />
    <section className="profile" >
      <h2 className="profile__title">Привет, {currentUser.name}</h2>

      <form className="profile__form" noValidate onSubmit={handleSubmit}>
        <div className="profile__form-block">
          <input className={`profile__input ${inputControl?.errors?.name && "profile__input_error"}`} 
                 type        = "text" 
                 name        = "name"
                 placeholder = {currentUser.name}
                 id          = "profileName" 
                 minLength   = "2" 
                 maxLength   = "40" 
                 required 
                 pattern     = "[A-Za-zА-Яа-яЁё\s-]+"
                 value       = {typeof inputControl.values.name !=='undefined'? inputControl.values.name : currentUser.name}
                 onChange    = {inputControl.handleChange}
                 disabled    = {!isUnlock && "disabled"}
                />
          <label className = "profile__label" htmlFor = "profileName">Имя</label>
          <span className={errorClassName}>{name}</span> 
        </div>
        <div className="profile__form-block">
          <input className   = {`profile__input ${inputControl?.errors?.email && "profile__input_error"}`}
                 type        = "email" 
                 name        = "email" 
                 id          = "profileEmail" 
                 required
                 placeholder = {currentUser.email}
                 pattern     = "^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$"
                 value       = {typeof inputControl.values?.email !=='undefined' ? inputControl.values.email: currentUser.email}
                 onChange    = {inputControl.handleChange}
                 disabled    = {!isUnlock && "disabled"}
                 />
          <label className="profile__label"  htmlFor="profileEmail">E-mail</label>
          <span className={errorClassName}>{email}</span> 
        </div>
        <span className={succesClassName}>Изменения произведены успешно!</span> 
        {isLoading && <Preloader/>}
             
      

        {button}
        <button type="button" className="profile__button profile__button_v_exit" onClick={onSignOut}>Выйти из аккаунта</button> 
      </form>
    </section>
    </>
  )
};

export default Profile;