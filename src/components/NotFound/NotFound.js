import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="notfound">
      <h1 className="notfound__title">404</h1>
      <p className="notfound__desscription">Страница не найдена</p>

      <Link to="/" className="notfound__back" onClick={() => navigate(-2)}> Назад</Link>
    </div>
  )
}

export default NotFound;