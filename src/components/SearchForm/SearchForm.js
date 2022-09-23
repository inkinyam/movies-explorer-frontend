const SearchFrom = () => {
  return (
    <form className="searchingForm">
      <input className="searchigForm__input" placeholder="Фильм"></input>
      <button className="searchigForm__submit"></button>

       <div  className="searchigForm__toggler">
          <input type="checkbox" className="searchigForm__checkbox"  id="shortmovie" />
          <div className="searchigForm__knobs"></div>
          <div className="searchigForm__layer"></div>
          <label htmlFor="shortmovie" className="searchingForm__toggler-description">Короткометражки</label>
        </div>

    </form>
  )
}

export default SearchFrom;