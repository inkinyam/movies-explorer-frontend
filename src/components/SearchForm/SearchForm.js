import React from "react";

const SearchFrom = () => {
const [isChecked, onClickCheckbox] = React.useState(true);

const handleClickCheckbox = () => {
  onClickCheckbox(!isChecked);
} 

  return (
    <form className="searchingForm">
      <input className="searchigForm__input" placeholder="Фильм" required minLength="2"></input>
      <button type="submit" className="searchigForm__submit"></button>

       <div  className="searchigForm__toggler">
          <input type="checkbox" className="searchigForm__checkbox" onClick={handleClickCheckbox}  id="shortmovie" />
          <div className="searchigForm__knobs"></div>
          <div className="searchigForm__layer"></div>
          <label htmlFor="shortmovie" className="searchingForm__toggler-description">Короткометражки</label>
        </div>

    </form>
  )
}

export default SearchFrom;