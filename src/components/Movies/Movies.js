import Navigation from "../Navigation/Navigation";
import SearchFrom from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";

import ShowMore from "../ShowMore/ShowMore";



const Movies = ({movies, savedMovies, handleCardButtonClick, handleCheckboxClick, handleSubmitSearchingForm, savedCheckboxState, savedSearchText}) => {
  return (
    <>
      <main className="movies">
        <Navigation />
        <SearchFrom handleCheckboxClick       = {handleCheckboxClick}
                    handleSubmitSearchingForm = {handleSubmitSearchingForm}
                    savedCheckboxState        = {savedCheckboxState}
                    savedSearchText           = {savedSearchText}/>

        <MoviesCardList movies                = {movies}
                        savedMovies           = {savedMovies}
                        handleCardButtonClick = {handleCardButtonClick}
                      />
        <ShowMore/>
      </main>
      <Footer/>
    </>
   )
};

export default Movies;