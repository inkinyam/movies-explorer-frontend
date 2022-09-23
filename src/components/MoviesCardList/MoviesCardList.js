import MoviesCard from "../MoviesCard/MoviesCard";

const MoviesCardList = () => {


  return (
    <div className="movieCardList">
      <div className="movieCardList__list">
        <MoviesCard/>
        <MoviesCard/>
        <MoviesCard/>
        <MoviesCard/>
        <MoviesCard/>
        <MoviesCard/>
        <MoviesCard/>
        <MoviesCard/>
        <MoviesCard/>
      </div>
      <button className="movieCardList__showmore">Еще</button>
    </div>
  )
}

export default MoviesCardList;