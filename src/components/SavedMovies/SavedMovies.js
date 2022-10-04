
import SearchFrom from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";

import { savedMovies } from "../../consts/movies";

const SavedMovies = () => {
  return (
    <>
      <main className="movies">
        <SearchFrom />
        <MoviesCardList movies={savedMovies}
                      savedMoviesStatus={false}/>
      </main>
      <Footer/>
    </>
   )
};

export default SavedMovies;


