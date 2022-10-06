const Profile = ({onSignOut}) => {
  return (
    <section className="profile">
      <h2 className="profile__title">Привет, Наталья!</h2>

      <form className="profile__form">
        <div className="profile__form-block">
          <input className="profile__input" type="text" id="profileName" placeholder='введите имя'/>
          <label className="profile__label" htmlFor="profileName">Имя</label>
        </div>
        <div className="profile__form-block">
          <input className="profile__input" type="text" id="profileEmail" placeholder='введите имя'/>
          <label className="profile__label"  htmlFor="profileEmail">E-mail</label>
        </div>
      </form>

      <button type="button" className="profile__button profile__button_v_edit">Редактировать</button>
      <button type="button" className="profile__button profile__button_v_exit" onClick={onSignOut}>Выйти из аккаунта</button>
    </section>
  )
};

export default Profile;