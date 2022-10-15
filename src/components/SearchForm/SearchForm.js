import React from "react";
import { useInputValidator } from "../../utils/customHooks/inputValidator";

const SearchFrom = ({handleCheckboxClick, handleSubmitSearchingForm, savedCheckboxState, savedSearchText}) => {
  const inputControl = useInputValidator();
  const {searchingText}   = inputControl.errors;


  const handleSearchingSubmit = (e) => {
    e.preventDefault();
    let shortMoviesFilter = savedCheckboxState;
    let {searchingText} = inputControl.values;
    handleSubmitSearchingForm(searchingText, shortMoviesFilter);
  } 

    const errorClassList = (inputControl?.errors?.searchingText)
      ? "searchigForm__error" 
      : "searchigForm__error searchigForm__error_show";
  return (
    <form className = "searchingForm" noValidate onSubmit={handleSearchingSubmit}>
      <input className   = {`searchigForm__input ${inputControl?.errors?.searchingText!== "" && "searchigForm__input_error"}`}
             placeholder = "Фильм"
             type        = "text"
             name        = "searchingText"
             id          = "searchingText"
             required
             minLength   = '0'
             value       = {inputControl?.values?.searchingText ? inputControl.values.searchingText : savedSearchText}
             onChange    = {inputControl.handleChange}
             />
      <span className = {errorClassList}>{searchingText}</span>
      <button type="submit" className="searchigForm__submit"></button>

       <div className="searchigForm__toggler">
          <input type      = "checkbox" 
                 name      = "shortMoviesFilter"
                 id        = "shortMoviesFilter"
                 className = "searchigForm__checkbox"  
                 checked   = {inputControl?.values?.shortMoviesFilter ? inputControl.values.shortMoviesFilter : savedCheckboxState}
                 onClick = {handleCheckboxClick}
                 onChange  = {inputControl.handleChange}/>
          <div className="searchigForm__knobs"></div>
          <div className="searchigForm__layer"></div>
          <label htmlFor="shortmovie" className="searchingForm__toggler-description">Короткометражки</label>
        </div>

    </form>
  )
}

export default SearchFrom;