import React from "react";

const SearchFrom = () => {
const [isChecked, onClickCheckbox] = React.useState(false);

const handleClickCheckbox = () => {
  onClickCheckbox(!isChecked);
} 

const checkboxCLassList = isChecked 
  ? 'searchigForm__checkbox searchigForm__checkbox_checked' 
  : 'searchigForm__checkbox ' ;

  
const [isSearching, setIsSearching] = React.useState({
  error: '',
  searchingText: '',
  isFormValid: true,
});


const errorClassList = (isSearching.error !== '')
  ? "searchigForm__error" 
  : "searchigForm__error searchigForm__error_show";

const handleInputChange = (evt) => {
  setIsSearching({
      ...isSearching,
      error: '',
      [evt.target.name]: evt.target.value,
      isFormValid: evt.target.closest('.searchingForm').checkValidity(),
  });
}

const handleSearchingSubmit = (evt) => {
  evt.preventDefault();
  setIsSearching({
      ...isSearching,
      isFormValid: evt.target.closest('.searchingForm').checkValidity(),
  });
  if (!setIsSearching.isFormValid) {
      return setIsSearching({
          ...isSearching,
          error: 'Нужно ввести ключевое слово',
      });
  }
//  onSubmit(setIsSearching.searchingText);

}

  return (
    <form className = "searchingForm" noValidate onSubmit={handleSearchingSubmit}>
      <input className   = {`searchigForm__input ${!isSearching.isFormValid && "searchigForm__input_error"}`}
             placeholder = "Фильм"
             name        = "searchingText"
             required
             minLength   = '1'
             value       = {setIsSearching.searchingText}
             onChange    = {handleInputChange}
             />
      <span className = {errorClassList}>{isSearching.error}</span>
      <button type="submit" className="searchigForm__submit"></button>

       <div className="searchigForm__toggler">
          <input type      = "checkbox" 
                 className = {checkboxCLassList} 
                 onClick   = {handleClickCheckbox} id="shortmovie" />
          <div className="searchigForm__knobs"></div>
          <div className="searchigForm__layer"></div>
          <label htmlFor="shortmovie" className="searchingForm__toggler-description">Короткометражки</label>
        </div>

    </form>
  )
}

export default SearchFrom;