
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";
import { useLocation } from 'react-router-dom';

const MoviesCardList = ({ movies, savedMovies,  preloader, handleCardButtonClick}) => {
  const THUMBNAIL_PATH = 'https://api.nomoreparties.co';
 const location = useLocation();

 function isMovieSaved(movie) {
  return savedMovies.some((savedMovie) => savedMovie.movieId === movie.id);
}

  return (
    <div className="movieCardList">
      {preloader && <Preloader />}
      <ul className="movieCardList__list">
      
      {location.pathname === '/movies' && movies.map((movie) => {
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
              isSaved                 = {isMovieSaved(movie)}
              />)
           })
      } 

            
      {location.pathname === '/savedmovies' && savedMovies.map((movie) => {
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
                    isSaved                 = {isMovieSaved(movie)}
                    />)
                })
            }  
    
      
                
      </ul>
    </div>
  )
}

export default MoviesCardList;
