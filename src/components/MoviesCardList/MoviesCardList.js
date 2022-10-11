
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";
//import { useLocation } from 'react-router-dom';

const MoviesCardList = ({ movies,  preloader, handleCardButtonClick}) => {
  const THUMBNAIL_PATH = 'https://api.nomoreparties.co';
 //const location = useLocation();


  return (
    <div className="movieCardList">
      {preloader && <Preloader />}
      <ul className="movieCardList__list">

      {movies.map((movie) => {
                    return (
                      <MoviesCard
                        key                     = {movie.id}
                        movieId                 = {movie.id}
                        title                   = {movie.nameRU}
                        duration                = {movie.duration}
                        thumbnail               = {THUMBNAIL_PATH + movie.image.formats.thumbnail.url}
                        href                    = {movie.trailerLink}
                        movie                   = {movie}
                        handleCardButtonClick   = {handleCardButtonClick}
                        />)
                })}
                
      </ul>
    </div>
  )
}

export default MoviesCardList;
