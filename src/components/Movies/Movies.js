import Navigation from "../Navigation/Navigation";
import SearchFrom from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";

const Movies = ({ movies, 
                  savedMovies, 
                  handleCardButtonClick, 
                  handleCheckboxClick, 
                  handleSubmitSearchingForm, 
                  storageCheckboxState, 
                  storageSearchText,
                  isLoading,
                  textError }) => {
  return (
    <>
      <main className="movies">
        <Navigation />
        <SearchFrom handleCheckboxClick       = {handleCheckboxClick}
                    handleSubmitSearchingForm = {handleSubmitSearchingForm}
                    storageCheckboxState      = {storageCheckboxState}
                    storageSearchText         = {storageSearchText}/>

        <MoviesCardList movies                = {movies}
                        savedMovies           = {savedMovies}
                        handleCardButtonClick = {handleCardButtonClick}
                        isLoading             = {isLoading}
                        textError             = {textError}
                      />

      </main>
      <Footer/>
    </>
   )
};

export default Movies;