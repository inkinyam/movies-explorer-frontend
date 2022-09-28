import React from 'react';

const MoviesCard = ({onMovieSave, onMovieUnsave, movie,  savedMoviesStatus}) => {

function handleMovieUnsave() {
  onMovieUnsave(movie);
}
function handleMovieSave() {
  onMovieSave(movie);
}
  
const buttonClassList = savedMoviesStatus? 'movieCard__save' : 'movieCard__save movieCard__save_delete';

  return  (
    <li className="movieCard" id={movie._id}>
      <div className="movieCard__info">
        <div className="movieCard__text">
          <h3 className="movieCard__title">{movie.nameRu}</h3>
          <p className="movieCard__time-info">{movie.duration}</p>
        </div>
        <button type="button" className={buttonClassList} onClick={savedMoviesStatus? handleMovieUnsave : handleMovieSave}></button>
      </div>
      <img className="movieCard__img" src={movie.image} alt={movie.nameRu}></img>
    </li>
  );
}

export default MoviesCard;