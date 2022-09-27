import MoviesCard from "../MoviesCard/MoviesCard";

const MoviesCardList = ({ movies, savedMoviesBlock }) => {
  function handleMovieUnsave() {}
  function handleMovieSave() {}

  return (
    <div className="movieCardList">
      <div className="movieCardList__list">
        {movies.map((movie) => (
          <MoviesCard onMovieSave = {handleMovieSave}
                      onMovieUnsave = {handleMovieUnsave}
                      movie = {movie}
                      key = {movies._id}
                      savedMoviesStatus = {savedMoviesBlock}/>
        ))}
      </div>
      <button className="movieCardList__showmore">Еще</button>
    </div>
  )
}

export default MoviesCardList;