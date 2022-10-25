import { MOVIE_SERVER_URL } from "./consts";

class movieApi {
  constructor (baseUrl) {
    this.baseUrl = baseUrl;
  }


//метод, проверяющий какой результат пришел, возвращает объект если ок, и ошибку, если нет
  _checkRes(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  //метод, который реализует получение карточки с сервера
  getMovies () {
    return fetch (`${this.baseUrl}/beatfilm-movies`)
      .then (res => {return this._checkRes(res)})
  }
}



/*создаем и экспортируем экземпляр класса api для использования в App*/ 
const moviesApi = new movieApi (MOVIE_SERVER_URL, {
  headers: {
    'Content-Type': 'application/json'
  }
})

export default moviesApi;