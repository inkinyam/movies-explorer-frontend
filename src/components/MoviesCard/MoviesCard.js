import React from 'react';
import { Link, useLocation } from 'react-router-dom';


const MoviesCard = ({title, duration, thumbnail, href, handleSaveMovie, movie, isSaved, isOwn}) => {
  const location = useLocation();

  const getDurationFilm = (duration) => {
    if (duration > 60) {
        const min = duration % 60;
        const hour = (duration - min) / 60;
        const result = (`${hour}ч ${min}м`);
        return result;
    } else {
        const result = `${duration}м`;
        return result;
    }
  }
  
  const handleSaveButtonClick = () => {
    handleSaveMovie(location.pathname === '/savedmovies' ? movie._id : movie);
  }
    
 
  return  (
    <div className="movieCard">
      <div className="movieCard__info">
        <div className="movieCard__text">
          <h3 className="movieCard__title">{title}</h3>
          <p className="movieCard__time-info"> {getDurationFilm(duration)}</p>
        </div>
        <button className = {'movieCard__save' + (isSaved? 'movieCard__save_saved': '') + (isOwn? 'movieCard__save_delete': '')} 
                onClick   = {handleSaveButtonClick}></button>
      </div>
      <Link className="movieCard__link" to={href} target="_blank" title={title}>
        <img className="movieCard__img" src={thumbnail} alt="title"></img>
      </Link>
    </div>
  );
}

export default MoviesCard;