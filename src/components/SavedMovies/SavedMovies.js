import Navigation from "../Navigation/Navigation";
import SearchFrom from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";

import { savedMovies } from "../../consts/movies";

const SavedMovies = ({movies, savedMovies, handleCardButtonClick}) => {
  return (
    <>
      <main className="movies">
        <Navigation />
        <SearchFrom />
        <MoviesCardList  movies                = {movies}
                         savedMovies           = {savedMovies}
                         handleCardButtonClick = {handleCardButtonClick}
                      
                      />
      </main>
      <Footer/>
    </>
   )
};

export default SavedMovies;


