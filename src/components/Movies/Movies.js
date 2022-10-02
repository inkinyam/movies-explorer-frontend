import SearchFrom from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";

import { startMovies } from "../../const/movies";

const Movies = () => {
  return (
    <section className="movies">
      <SearchFrom />
      <MoviesCardList movies={startMovies}
                      savedMoviesStatus={true}/>
      <Footer/>
    </section>
   )
};

export default Movies;