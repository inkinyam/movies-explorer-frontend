import React from 'react';
import { CurrentUserContext } from '../../context/CurrentUserContext'; 

const Profile = ({onUpdateUser ,onSignOut}) => {
  const currentUser = React.useContext(CurrentUserContext);

  /* стейт и обработка изменений на инпуте name*/
  const [nameValue, setName] = React.useState(currentUser.name);

  function handleChangeName(e) {
    setName(e.target.value);
  }

    /* стейт и обработка изменений на инпуте email*/
  const [emailValue, setEmail] = React.useState(currentUser.email);

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  /*обновляем значения инпутов при открытии*/
  React.useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser]);


  /*обработчик сабмита формы*/
  const handleSubmit = (e) => {
    e.preventDefault();

    onUpdateUser({
      name: nameValue,
      email: emailValue,
    });
  }

  let buttonText ='Редактировать данные';
  const handleChangeUserInfo = () => {
    if (nameValue === currentUser.name&&emailValue===currentUser.email) {
      buttonText ='Редактировать данные';
    } 
    else {
      buttonText ='Сохранить изменения';
    }
  }

  return (
    <section className="profile" onSubmit={handleSubmit}>
      <h2 className="profile__title">Привет, {nameValue}</h2>

      <form className="profile__form">
        <div className="profile__form-block">
          <input className="profile__input" 
                 type="text" 
                 value={nameValue}
                 onChange={handleChangeName} 
                 id="profileName" 
                 placeholder='введите имя'
                 minLength="2" 
                 maxLength="40" 
                 required />
          <label className="profile__label" htmlFor="profileName">Имя</label>
        </div>
        <div className="profile__form-block">
          <input className="profile__input" 
                 type="email" 
                 value={nameValue}
                 onChange={handleChangeEmail} 
                 id="profileEmail" 
                 placeholder='введите e-mail'
                 minLength="2" 
                 maxLength="40" 
                 required/>
          <label className="profile__label"  htmlFor="profileEmail">E-mail</label>
        </div>
        <span className='profile__error'>ой, ошибка</span>
      </form>

      
      <button type="button" className="profile__button profile__button_v_edit">{buttonText}</button>
      <button type="button" className="profile__button profile__button_v_exit" onClick={onSignOut}>Выйти из аккаунта</button>
    </section>
  )
};

export default Profile;