
import SearchFrom from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";

const SavedMovies = () => {
  return (
    <section className="savedMovies">
      <SearchFrom />
      <MoviesCardList />
      <Footer/>
    </section>
   )
};

export default SavedMovies;


