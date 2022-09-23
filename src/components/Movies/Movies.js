import SearchFrom from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";

const Movies = () => {
  return (
    <section className="movies">
      <SearchFrom />
      <MoviesCardList />
      <Footer/>
    </section>
   )
};

export default Movies;