import React from 'react';
import Navigation from '../Navigation/Navigation';
import { CurrentUserContext } from '../../context/CurrentUserContext'; 
import { useInputValidator } from '../../utils/customHooks/inputValidator';

const Profile = ({onUpdateUser ,onSignOut}) => {
  const currentUser = React.useContext(CurrentUserContext);
  const [isEditInput, setIsEditInput] = React.useState(true);
/*   const controlInput = useInputValidator();
  const { nameErr, emailErr } = controlInput.errors; 

  const errorClassName = !controlInput.isValid
    ? 'profile__error profile__error_show'
    : 'profile__error';*/

  const resultClassName = !isEditInput 
    ? 'profile__succes profile__succes_show'
    : 'profile__succes';

  const toggleStateInput = (e) => {
     e.preventDefault();
    setIsEditInput(!isEditInput);
  };

const [nameValue, setNameValue] = React.useState();
const [emailValue, setEmailValue] = React.useState();

const handleEmailChange = (e) => {
  setEmailValue(e.target.value);
}

const handleNameChange = (e) => {
  setNameValue(e.target.value);
}

  /*обработчик сабмита формы*/
  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email } = {nameValue, emailValue};
    if (!name) {
      onUpdateUser(currentUser.name, email);
    } else if (!email) {
      onUpdateUser(name, currentUser.email);
    } else {
      onUpdateUser(name, email);
    }
    setTimeout(() => setIsEditInput((state) => !state), 1000);
  };


  return (
    <>
    <Navigation />
    <section className="profile" onSubmit={handleSubmit}>
      <h2 className="profile__title">Привет, {currentUser.name}</h2>

      <form className="profile__form" noValidate>
        <div className="profile__form-block">
          <input className="profile__input" 
                 type="text" 
                 placeholder={currentUser.name}
                 id="profileName" 
                 minLength="2" 
                 maxLength="40" 
                 required 
                 pattern='[A-Za-zА-Яа-яЁё\s-]+'
                 onChange={handleNameChange}
                 value={nameValue ?? currentUser.name}
                 {...(!isEditInput ? {} : { disabled: true })}/>
          <label className="profile__label" htmlFor="profileName">Имя</label>
        </div>
        <div className="profile__form-block">
          <input className="profile__input" 
                 type="email" 
                 id="profileEmail" 
                 minLength="2" 
                 maxLength="40" 
                 required
                 placeholder={currentUser.email}
                 pattern='^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$'
                 onChange={handleEmailChange}
                 value={emailValue ?? currentUser.email}
                 {...(!isEditInput ? {} : { disabled: true })}
                 />
          <label className="profile__label"  htmlFor="profileEmail">E-mail</label>
        </div>
{/*         <span className={errorClassName}>{emailErr}</span>
        <span className={errorClassName}>{nameErr}</span> */}
        <span className={resultClassName}>Изменения прошли успешно!</span>
      </form>

      
   <button type="button" 
              className="profile__button profile__button_v_edit"   
              onClick={toggleStateInput}>
              Редактировать
      </button>
      <button type="button" className="profile__button profile__button_v_exit" onClick={onSignOut}>Выйти из аккаунта</button> 

    </section>
    </>
  )
};

export default Profile;