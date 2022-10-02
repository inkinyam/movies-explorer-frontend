import MoviesCard from "../MoviesCard/MoviesCard";

const MoviesCardList = ({ movies, savedMoviesStatus }) => {
  function handleMovieUnsave(){
    /* -удаляем из списка сохраненных для этого юзера
       - удаляем флажок
    */
  }

  const handleMovieSave = () => {
    /* - добавить в список сохраненных для этого юзера
       -  добавить флажок для фильма, если он рендерится в мувис*/
  }

const handleMoreClick = () => {

}

  return (
    <div className="movieCardList">
      <ul className="movieCardList__list">
        {movies.map((movie) => (
          <MoviesCard key = {movie._id}
                      movie = {movie}
                      onMovieSave = {handleMovieSave}
                      onMovieUnsave = {handleMovieUnsave}
                      savedMoviesStatus = {savedMoviesStatus}/>
        ))}
      </ul>
      <button className="movieCardList__showmore" onClick={handleMoreClick}>Еще</button>
    </div>
  )
}

export default MoviesCardList;