
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";
import { useLocation } from 'react-router-dom';

const MoviesCardList = ({ movies, preloader, errorText, showedMovies, handleMovieSave, handleMovieUnSave, isSaved, savedMovies, handleDeleteMovie }) => {
  const THUMBNAIL_PATH = 'https://api.nomoreparties.co';
  const location = useLocation();



  return (
    <div className="movieCardList">
      {preloader && <Preloader />}
      <ul className="movieCardList__list">

      {location.pathname === '/movies' && movies && movies.slice(0, showedMovies).map((movie) => {
                    const isSaved = isSaved(movie);
                    return (
                      <MoviesCard
                        title           = {movie.nameRU}
                        duration        = {movie.duration}
                        thumbnail       = {THUMBNAIL_PATH + movie.image.formats.thumbnail.url}
                        movieId         = {movie.id}
                        key             = {movie.id}
                        handleMovieSave = {handleMovieSave}
                        movie           = {movie}
                        isSaved         = {isSaved}
                        href            = {movie.trailerLink}
                      />)
                })}
                {location.pathname === '/saved-movies' && savedMovies && showedMovies.map((movie) => {
                    return (
                      <MoviesCard
                        title           = {movie.nameRU}
                        duration        = {movie.duration}
                        thumbnail       = {movie.image}
                        key             = {movie._id}
                        href            = {movie.trailerLink}
                        isOwn           = {true}
                        movie           = {movie}
                        handleMovieSave = {handleMovieUnSave}
                     />)
                })}
      </ul>
    </div>
  )
}

export default MoviesCardList;
