import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <p className="footer__name">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className="footer__links">
        <p className="footer__copyright">inki@2022</p>
        <Link to="practicum.yandex.ru" className="footer__link">Яндекс.Практикум</Link>
        <Link to="https://github.com/inkinyam" className="footer__link">GitHub</Link>
      </div>
    </footer>
  )
}

export default Footer;