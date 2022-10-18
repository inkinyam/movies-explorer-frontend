
 import { SERVER_URL } from "./consts";
 import { MOVIE_SERVER_URL } from "./consts";

 class mainApi {
  constructor (baseUrl, {headers}) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

// получаем токен из localStorage и записываем его в хедерс
  _getHeaders() {
    const jwt = localStorage.getItem('jwt');
    return jwt ? { Authorization: `Bearer ${jwt}` } : {};
  }


//метод, проверяющий какой результат пришел, возвращает объект если ок, и ошибку, если нет
  _checkRes(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }


 // метод, который реализует получение данные пользователя с сервера
  getUserData () {
    return fetch (`${this.baseUrl}/users/me`, {
      headers: {...this.headers, ...this._getHeaders()},
    })
    .then (res => {return this._checkRes(res)})
  }

 // метод, который реализует редактирование данных пользователя на сервере
  postUserData (userName, email){
    return fetch (`${this.baseUrl}/users/me`, {
      headers: {...this.headers, ...this._getHeaders()},
      method: 'PATCH',
      body: JSON.stringify({name: userName, email: email}),
    })
    .then (res => {return this._checkRes(res)})
  }

  //метод, который реализует получение карточки с сервера
  getSavedMovies () {
    return fetch (`${this.baseUrl}/movies`, {
      headers: {...this.headers, ...this._getHeaders()},
    })
    .then (res => {return this._checkRes(res)})
  }

// метод, который реализует отправление карточки на сервер
  saveMovie (movie){
    return fetch (`${this.baseUrl}/movies`, {
      headers: {...this.headers, ...this._getHeaders()},
      method: 'POST',
      body: JSON.stringify({country: movie.country, 
                            director: movie.director, 
                            duration: movie.duration,
                            year: movie.year, 
                            description: movie.description, 
                            image: MOVIE_SERVER_URL + movie.image.url, 
                            trailerLink: movie.trailerLink, 
                            thumbnail: MOVIE_SERVER_URL + movie.image.formats.thumbnail.url, 
                            nameRU: movie.nameRU, 
                            nameEN: movie.nameEN,
                            movieId: movie.id
                          }),
    })
    .then (res => {return this._checkRes(res)})
  }


// метод, который реализует удаление лайка с карточки
  unsaveMovie (moviedId){
    return fetch (`${this.baseUrl}/movies/${moviedId}`, {
      headers: {...this.headers, ...this._getHeaders()},
      method: 'DELETE',
    })
    .then (res => {return this._checkRes(res)})
  }
 }

/*создаем и экспортируем экземпляр класса api для использования в App*/ 
const api = new mainApi (SERVER_URL, {
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:3000'
  }
})

export default api;