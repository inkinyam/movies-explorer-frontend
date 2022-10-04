import SearchFrom from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";

const Movies = () => {
  return (
    <>
      <main className="movies">
        <SearchFrom />
        <MoviesCardList movies={startMovies}
                        savedMoviesStatus={true}/>
      </main>
      <Footer/>
    </>
   )
};

export default Movies;