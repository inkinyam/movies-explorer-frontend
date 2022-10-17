import { useLocation } from 'react-router-dom';
import React from "react";

import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";
import ShowMore from "../ShowMore/ShowMore";

const MoviesCardList = ({ movies, savedMovies,  handleCardButtonClick, isLoading, textError}) => {
  
  const THUMBNAIL_PATH = 'https://api.nomoreparties.co';
  const location = useLocation();

  function isMovieSaved(movie) {
    return savedMovies.some((savedMovie) => savedMovie.movieId === movie.id);
  }

  const [countOfShowedMovies, setCountOfShowedMovies] = React.useState(0);
  const [countOfMoreMovies, setCountOfMoreMovies] = React.useState(0);
  const [width, setWidth] = React.useState(window.innerWidth);

 
  let showMoreClassList = !(movies.length > 3) ||  countOfShowedMovies >= movies.length  ? 'showmore showmore_hide' : 'showmore';

  React.useEffect(() => {
    const handleWindowResize = () => {
      setWidth(window.innerWidth);
    };

      if (width <= 580) {
        setCountOfShowedMovies(6);
        setCountOfMoreMovies(2);
      } else if (
        width <= 960 &&
        width > 580
      ) {
        setCountOfShowedMovies(8);
        setCountOfMoreMovies(2);
      } else if (
        width > 960
      ) {
        setCountOfShowedMovies(9);
        setCountOfMoreMovies(3);
      }

    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [width]);

  const handleShowMoreMovies = () => {
    setCountOfShowedMovies((movies) => movies + countOfMoreMovies);
  };

  const errorsClassList = (movies.length === 0) ? "movieCardList__error profile__error_show" : "movieCardList__error";

  return (
    <div className="movieCardList">
      {isLoading && <Preloader />}
      <p className={errorsClassList}>{textError}</p>
      <ul className="movieCardList__list">
      
      {location.pathname === '/movies' && movies.slice(0, countOfShowedMovies).map((movie) => {
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
              />
             )
           })
      } 

      {location.pathname === '/savedmovies' && movies.map((movie) => {
                return (
                  <MoviesCard
                    key                     = {movie._id}
                    movieId                 = {movie.id}
                    title                   = {movie.nameRU}
                    duration                = {movie.duration}
                    thumbnail               = {movie.thumbnail}
                    href                    = {movie.trailerLink}
                    movie                   = {movie}
                    handleCardButtonClick   = {handleCardButtonClick}
                    isSaved                 = {isMovieSaved(movie)}
                    />)
                })
            }  
                
      </ul>
      <ShowMore handleShowMoreButtonClick = {handleShowMoreMovies}
                classList                 = {showMoreClassList}/>
    </div>
  )
}

export default MoviesCardList;
