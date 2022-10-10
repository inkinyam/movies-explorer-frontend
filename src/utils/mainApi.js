 //import { BASE_URL } from "./consts";
 const BASE_URL = 'https://api.movies.inkinyam.nomoredomains.sbs';
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
  postMovie (country, director, duration, year, description, image, trailerLink, thumbnail, nameRu, nameEn){
    return fetch (`${this.baseUrl}/cards`, {
      headers: {...this.headers, ...this._getHeaders()},
      method: 'POST',
      body: JSON.stringify({country: country, 
                            director: director, 
                            duration: duration,
                            year: year, 
                            description: description, 
                            image: image, 
                            trailerLink: trailerLink, 
                            thumbnail: thumbnail, 
                            nameRu: nameRu, 
                            nameEn: nameEn
                          }),
    })
    .then (res => {return this._checkRes(res)})
  }

// метод, который реализует установку лайка на карточку
  saveMovie(movie){
    return fetch (`${this.baseUrl}/movies`, {
      headers: {...this.headers, ...this._getHeaders()},
      method: 'POST',
      body: JSON.stringify(movie)
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
const api = new mainApi (BASE_URL, {
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:3000' // !!!!!!!!!!!!!!!!!!!!!! поменять потом
  }
})

export default api;