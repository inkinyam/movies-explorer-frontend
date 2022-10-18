import React from "react";

const SearchFrom = ({handleCheckboxClick, handleSubmitSearchingForm, storageCheckboxState, storageSearchText}) => {
  
  
  const [searchFormState, setSearchFormState] = React.useState({
        error: '',
        searchingText: storageSearchText,
        shortMoviesFilter: storageCheckboxState,
        isValid: storageSearchText? true : false
  });

  const handleInputChange = (e) => {
    setSearchFormState({
        ...searchFormState,
        error: '',
        [e.target.name]: e.target.value,
        isValid: e.target.closest('form').checkValidity(),
    });
  }

  const handleCheckBoxChange = (e) => {
    handleCheckboxClick(e.target.checked);
    setSearchFormState({
      ...searchFormState,
      shortMoviesFilter: e.target.checked
    })
  }

  const handleSearchingSubmit = (e) => {
    e.preventDefault();
    if (!searchFormState.isValid) {
      return  setSearchFormState({
        ...searchFormState,
        error: 'Введите поисковое слово',
      })
     } else {
        let {searchingText, shortMoviesFilter}   =  searchFormState ;
        handleSubmitSearchingForm(searchingText, shortMoviesFilter);
      }
  }

  return (
    <form className = "searchingForm" noValidate onSubmit={handleSearchingSubmit}>
      <input className   = {`searchigForm__input ${searchFormState.error && "searchigForm__input_error"}`}
             placeholder = "Фильм"
             type        = "text"
             name        = "searchingText"
             id          = "searchingText"
             required
             minLength   = '0'
             value       = {searchFormState.searchingText}
             onChange    = {handleInputChange}
             />
      <span className = {`searchigForm__error ${searchFormState.error && "searchigForm__error_show"}`}>{searchFormState.error}</span>
      <button type="submit" className="searchigForm__submit"></button>

       <div className="searchigForm__toggler">
          <input type      = "checkbox" 
                 name      = "shortMoviesFilter"
                 id        = "shortMoviesFilter"
                 className = "searchigForm__checkbox"  
                 checked   = {searchFormState.shortMoviesFilter}
                 onChange  = {handleCheckBoxChange}/>
          <div className="searchigForm__knobs"></div>
          <div className="searchigForm__layer"></div>
          <label htmlFor="shortmovie" className="searchingForm__toggler-description">Короткометражки</label>
        </div>

    </form>
  )
}

export default SearchFrom;