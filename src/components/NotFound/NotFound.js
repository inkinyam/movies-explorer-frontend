import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="notfound">
      <h1 className="notfound__title">404</h1>
      <p className="notfound__desscription">Страница не найдена</p>

      <Link to="/" className="notfound__back"> Назад</Link>
    </div>
  )
}

export default NotFound;