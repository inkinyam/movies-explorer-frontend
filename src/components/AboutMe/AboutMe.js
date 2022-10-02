import Portfolio from '../Portfolio/Portfolio';
import SectionTtile from '../SectionTitle/SectionTitle';

const AboutMe = () => {

  return (
    <section className="aboutMe">
      <SectionTtile  title ='Студент'/>
      <div className="aboutMe__about">
        <div className="aboutMe__text">
          <h2 className="aboutMe__name">Наталья</h2>
          <p className="aboutMe__job">Фронтэнд-разработчик, 31 год</p>
          <p className="aboutMe__description">Я родилась в городе Иркутске, там же закончила высшее обучение, пожила некоторое время в Красноярске, Санкт-Петербурге, на данный момент живу в Москве.
          Уже 15 лет я катаюсь на сноуборде, помимо этого, люблю кататься на велосипеде. Последнее время увлеклась настольными играми, очень нравится серия игр по Лавкрафту.
          Я долго работала менеджером в различных компаниях, в прошлом году я начала учиться на веб-разработчика. На данный момент я закончила обучение и работаю в Институте Генплана Москвы фронтэнд-разработчиком.</p>
          
          <div className="aboutMe__links">
            <a target="_blank" rel="noreferrer" href="https://github.com/inkinyam" className="aboutMe__link">GitHub</a>
            <a target="_blank" rel="noreferrer" href="https://vk.com/i_n_k_i" className="aboutMe__link">VK</a>
            <a target="_blank" rel="noreferrer" href="https://www.instagram.com/i_n_k_i_/" className="aboutMe__link">Instagramm</a>
          </div>
        </div>
        <div className='aboutMe__avatar'></div>
      </div> 
     <Portfolio />
     
    </section>
  )
}

export default AboutMe;