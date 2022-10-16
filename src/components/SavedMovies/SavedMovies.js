import Navigation from "../Navigation/Navigation";
import SearchFrom from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";

const SavedMovies = ({movies, savedMovies, handleCardButtonClick, handleCheckboxClick, handleSubmitSearchingForm, storageCheckboxState, storageSearchText}) => {

  return (
    <>
      <main className="movies">
        <Navigation />
        <SearchFrom handleCheckboxClick       = {handleCheckboxClick}
                    handleSubmitSearchingForm = {handleSubmitSearchingForm}
                    storageCheckboxState       = {storageCheckboxState}
                    storageSearchText         = {storageSearchText}
                    />

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


