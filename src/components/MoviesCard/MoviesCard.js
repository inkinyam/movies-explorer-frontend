import React from 'react';

const MoviesCard = ({title, duration, thumbnail, href, handleCardButtonClick, movie, isSaved}) => {

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
   
  const handleMovieButtonClick= () => {
    handleCardButtonClick(movie)
  }
    
 
  return  (
    <li className="movieCard">
      <div className="movieCard__info">
        <div className="movieCard__text">
          <h3 className="movieCard__title">{title}</h3>
          <p className="movieCard__time-info"> {getDurationFilm(duration)}</p>
        </div>
        <button className = {'movieCard__save ' +(isSaved ? 'movieCard__save_saved' : '') } 
                onClick   = {handleMovieButtonClick}></button>
      </div>
      <a rel="noreferrer" className="movieCard__link" href={href} target="_blank" title={title}>
        <img className="movieCard__img" src={thumbnail} alt="title"></img>
      </a>
    </li>
  );
}

export default MoviesCard;