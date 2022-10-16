const portfolio = () => {

  return (
    <div className="portfolio">
      <h3 className="portfolio__title">Портфолио</h3>
      <ul className="portfolio__list">
        <li className="portfolio__item">
          <a href=" https://inkinyam.github.io/how-to-learn/" className="portfolio__link">Статичный сайт
            <span className='portfolio__arrow'>↗</span>
          </a>
        </li>

        <li className="portfolio__item">
          <a href="https://inkinyam.github.io/russian-travel/" className="portfolio__link">Адаптивный сайт
            <span className='portfolio__arrow'>↗</span>
          </a>
        </li>

        <li className="portfolio__item">
          <a href="https://github.com/inkinyam/react-mesto-api-full" className="portfolio__link">Одностраничное приложение
            <span className='portfolio__arrow'>↗</span>
          </a>
        </li>

        <li className="portfolio__item">
          <a href="https://inkinyam.github.io/big-genplan/" className="portfolio__link">Многостраничный сайт
            <span className='portfolio__arrow'>↗</span>
          </a>
        </li>
      </ul>
    </div>
  )
}

export default portfolio;