import Navigation from "../Navigation/Navigation";
import SearchFrom from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";

import { startMovies } from "../../consts/movies";

const Movies = () => {
  return (
    <>
      <main className="movies">
        <Navigation />
        <SearchFrom />
        <MoviesCardList movies={startMovies}
                        savedMoviesStatus={true}/>
      </main>
      <Footer/>
    </>
   )
};

export default Movies;