import moviepick from '../../images/pic2.jpg'
import React from 'react';


const MoviesCard = ({onMovieSave, onMovieUnsave, movie, key, savedMoviesStatus}) => {
 

function handleMovieUnsave() {
  onMovieUnsave(movie);
}
function handleMovieSave() {
  onMovieSave(movie);
}
  
  return  (
    <div className="movieCard" key={key} id={movie._id}>
      <div className="movieCard__info">
        <div className="movieCard__text">
          <h3 className="movieCard__title">{movie.nameRu}</h3>
          <p className="movieCard__time-info">{movie.duration}</p>
        </div>
        <button type="button" className={savedMoviesStatus? 'movieCard__save movieCard__save_saved' : 'ovieCard__save movieCard__save_delete'} onClick={savedMoviesStatus? handleMovieUnsave : handleMovieSave}></button>
      </div>
      <img className="movieCard__img" src={movie.image} alt={movie.nameRu}></img>
    </div>
  );
}

export default MoviesCard;