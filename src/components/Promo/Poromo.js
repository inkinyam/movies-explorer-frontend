import Logo from "../../images/promo-logo.svg"

const Promo = () => {
  return (
    <section className="promo">
      <div className="promo__container">
        <div className="promo__info">
          <div className="promo__text">
            <h1 className="promo__title">Учебный проект студента факультета Веб&nbsp;-&nbsp;pазработки.</h1>
            <p className="promo__subtitle">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
          </div>
          <div className="promo__logo">
           <img src={Logo} alt="logo" className="promo__logo-img"></img>
          </div>
        </div>
        <button type="button" className="promo__btn">Узнать больше</button>
      </div>
    </section>
  )
}

export default Promo;