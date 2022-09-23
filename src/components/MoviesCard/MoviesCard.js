import moviepick from '../../images/pic2.jpg'
import React from 'react';


const MoviesCard = () => {
const [isSaved, onSaveMovie] = React.useState(false);
  
const handleSaveButtonClick = () => {
  onSaveMovie (!isSaved);
}

const stateButtonSaveClass = (`movieCard__save  ${isSaved ? 'movieCard__save_active' : ''}`); 
  
  return  (
    <div className="movieCard">
      <div className="movieCard__info">
        <div className="movieCard__text">
          <h3 className="movieCard__title">33 минуты счастья</h3>
          <p className="movieCard__time-info"> 1ч 33 мин</p>
        </div>
        <button className={stateButtonSaveClass} onClick={handleSaveButtonClick}></button>
      </div>
      <img className="movieCard__img" src={moviepick} alt="moviename"></img>
    </div>
  );
}

export default MoviesCard;