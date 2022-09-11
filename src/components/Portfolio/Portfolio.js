import { Link } from 'react-router-dom';

const Portfolio = () => {

  return (
    <div className="Portfolio">
      <h3 className="Portfolio__title">Портфолио</h3>
      <ul className="Portfolio__list">
        <li className="Portfolio__item">
          <Link to=" https://inkinyam.github.io/how-to-learn/" className="Portfolio__link">Статичный сайт</Link>
          <span className='Portfolio__arrow'>↗</span>
        </li>

        <li className="Portfolio__item">
          <Link to="https://inkinyam.github.io/russian-travel/" className="Portfolio__link">Адаптивный сайт</Link>
          <span className='Portfolio__arrow'>↗</span>
        </li>

        <li className="Portfolio__item">
          <Link to="https://github.com/inkinyam/react-mesto-api-full" className="Portfolio__link">Одностраничное приложение</Link>
          <span className='Portfolio__arrow'>↗</span>
        </li>
      </ul>
    </div>
  )
}

export default Portfolio;