
import SearchFrom from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";

import { savedMovies } from "../../const/movies";

const SavedMovies = () => {
  return (
    <section className="savedMovies">
      <SearchFrom />
      <MoviesCardList movies={savedMovies}
                      movieSaveStatus={true}/>
      <Footer/>
    </section>
   )
};

export default SavedMovies;


