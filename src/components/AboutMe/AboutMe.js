import { Link } from 'react-router-dom';
import Portfolio from '../Portfolio/Portfolio';

const AboutMe = () => {

  return (
    <section className="AboutMe">
      <p className="AboutMe__student">Cтудент</p>
      <div className="AboutMe__about">
        <div className="AboutMe__text">
          <h2 className="AboutMe__name">Наталья</h2>
          <p className="AboutMe__job">Фронтэнд-разработчик, 31 год</p>
          <p className="AboutMe__description">Я родилась в городе Иркутске, там же закончила высшее обучение, пожила некоторое время в Красноярске, Санкт-Петербурге, на данный момент живу в Москве.
          Уже 15 лет я катаюсь на сноуборде, помимо этого, люблю кататься на велосипеде. Последнее время увлеклась настольными играми, очень нравится серия игр по Лавкрафту.
          Я долго работала менеджером в различных компаниях, в прошлом году я начала учиться на веб-разработчика. На данный момент я закончила обучение и работаю в Институте Генплана Москвы фронтэнд-разработчиком.</p>
          
          <div className="AboutMe__links">
            <Link to="https://github.com/inkinyam" className="AboutMe__link">GitHub</Link>
            <Link to="https://vk.com/i_n_k_i" className="AboutMe__link">VK</Link>
            <Link to="https://www.instagram.com/i_n_k_i_/" className="AboutMe__link">Instagramm</Link>
          </div>
        </div>
        <div className='AboutMe__avatar'></div>
      </div> 
     <Portfolio />
     
    </section>
  )
}

export default AboutMe;